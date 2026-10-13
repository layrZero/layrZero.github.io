# Recover protected order

Request explicit broker-backed recovery/reconciliation for an existing protected workflow. This may attach missing protection.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/recoverprotectedorder`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `expected_mode` | String | Yes | required | Current server mode: live or analyze. |
| `expected_balance_type` | String | Yes | required | Current balance type: live or sandbox. |
| `expected_mode_version` | Integer | Yes | required | Current integer version returned by Funds/Analyzer; refresh after a mode switch. |
| `request_id` | String | Yes | required | Save before submission. For protected placement retain the same ID and payload for an intentional retry; do not replay an ambiguous submission automatically. |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `protected_order_id` | String | Yes | required | ID returned by protected placement/book; not a broker order ID. |

### Request example

```json
{
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-business-request-001",
  "apikey": "YOUR_BROKER_IMC_KEY",
  "protected_order_id": "YOUR_PROTECTED_ORDER_ID"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
# Copy the current snapshot from Funds/Analyzer for this same key.
client.set_mode_context(expected_mode="analyze", expected_balance_type="sandbox", expected_mode_version=7)

result = client.recoverprotectedorder(request_id='saved-business-request-001', protected_order_id='YOUR_PROTECTED_ORDER_ID')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "protected_order_id": "EXAMPLE_WORKFLOW_ID",
  "simulated": true,
  "mode": "analyze",
  "balance_type": "sandbox",
  "mode_version": 7
}
```

All incoming JSON objects and arrays follow [recursive forbidden-field validation](../request-json-validation.md). A prohibited documentation key returns 400 before execution:

```json
{
  "status": "error",
  "error_code": "FORBIDDEN_JSON_FIELD",
  "message": "Documentation fields are not allowed in request JSON."
}
```

Schema errors use 400. Authentication and broker-session failures retain endpoint-specific errors. Missing mode preconditions use 428 in services (the REST schema can reject missing fields with 400); stale mode snapshots use 409. See [HTTP errors](../http-status-codes.md) and [authentication/mode requirements](../authentication-and-mode-preconditions.md). No error response authorizes an automatic order retry.

### Modes, capabilities and usage

Requires current mode metadata and a saved request_id. One top-level mode lease fences the operation; placement separately persists durable business identity. Do not replace a saved placement ID or change its payload to retry an unknown submission. Acknowledgement, trigger acceptance, a missing order, or zero exposure is not fill evidence. Production registration in source is limited to Dhan, Upstox, Zerodha and FYERS; eligible workflows depend on broker capabilities and account authorization. Dhan uses explicit SUPER intent; Upstox uses its native composite workflow; unsupported capabilities remain errors. See [protected-order workflow](./protected-orders.md), [Dhan Super](./dhan-super-orders.md), and [DDPI authorization](../accounts-api/ddpi-status.md). This route applies track_api_usage; reconcile ambiguous outcomes before any further trading action. Recovery is explicit and state-dependent; unresolved submission stages are rejected rather than blindly replayed.

Source handler: `restx_api.protected_orders.RecoverProtectedOrder.post`. Source services: `services.protected_order_service.recover_protected_order`.

