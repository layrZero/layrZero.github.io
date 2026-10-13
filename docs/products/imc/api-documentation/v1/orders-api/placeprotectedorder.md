# Place protected order

Submit an entry and establish linked broker-hosted exit protection using a durable business request identity.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/placeprotectedorder`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `expected_mode` | String | Yes | required | Current server mode: live or analyze. |
| `expected_balance_type` | String | Yes | required | Current balance type: live or sandbox. |
| `expected_mode_version` | Integer | Yes | required | Current integer version returned by Funds/Analyzer; refresh after a mode switch. |
| `request_id` | String | Yes | required | Save before submission. For protected placement retain the same ID and payload for an intentional retry; do not replay an ambiguous submission automatically. |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `strategy` | String | Yes | required | Strategy name. |
| `exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |
| `symbol` | String | Yes | required | Current IMC trading symbol from master contracts. |
| `action` | String | Yes | required | BUY or SELL. |
| `quantity` | Integer | Yes | required | Positive quantity; use the current lot size for derivatives. |
| `product` | String | Yes | required | Broker-supported product; see constraints below. |
| `entry_pricetype` | String | Yes | required | MARKET or LIMIT. |
| `entry_price` | Float | Yes | required | Non-negative; LIMIT entry must lie between exit triggers. |
| `target_trigger` | Float | Yes | required | Positive target trigger. |
| `target_limit` | Float | Yes | required | Positive target exit limit. |
| `stoploss_trigger` | Float | Yes | required | Positive stop-loss trigger. |
| `stoploss_limit` | Float | Yes | required | Positive stop-loss exit limit. |
| `order_system` | String | No | null | Explicit SUPER intent for Dhan; otherwise use the broker workflow described below. |
| `trailing_jump` | Float | No | 0 | Non-negative trailing increment; supported by eligible broker workflows. |

### Request example

```json
{
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-business-request-001",
  "apikey": "YOUR_BROKER_IMC_KEY",
  "strategy": "Python",
  "exchange": "NSE",
  "symbol": "RELIANCE",
  "action": "BUY",
  "quantity": 1,
  "product": "CNC",
  "entry_pricetype": "LIMIT",
  "entry_price": 100,
  "target_trigger": 110,
  "target_limit": 110,
  "stoploss_trigger": 90,
  "stoploss_limit": 89
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
# Copy the current snapshot from Funds/Analyzer for this same key.
client.set_mode_context(expected_mode="analyze", expected_balance_type="sandbox", expected_mode_version=7)

result = client.placeprotectedorder(request_id='saved-business-request-001', strategy='Python', exchange='NSE', symbol='RELIANCE', action='BUY', quantity=1, product='CNC', entry_pricetype='LIMIT', entry_price=100, target_trigger=110, target_limit=110, stoploss_trigger=90, stoploss_limit=89)
print(result)
```

### Response and errors

Illustrative 202 pending acknowledgement; values are examples, not broker evidence:

```json
{
  "status": "pending",
  "protected_order_id": "EXAMPLE_WORKFLOW_ID",
  "request_id": "saved-business-request-001",
  "message": "Submission is running or interrupted; use protected-order book/recovery. No duplicate was submitted.",
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

Requires current mode metadata and a saved request_id. One top-level mode lease fences the operation; placement separately persists durable business identity. Do not replace a saved placement ID or change its payload to retry an unknown submission. Acknowledgement, trigger acceptance, a missing order, or zero exposure is not fill evidence. Production registration in source is limited to Dhan, Upstox, Zerodha and FYERS; eligible workflows depend on broker capabilities and account authorization. Dhan uses explicit SUPER intent; Upstox uses its native composite workflow; unsupported capabilities remain errors. See [protected-order workflow](./protected-orders.md), [Dhan Super](./dhan-super-orders.md), and [DDPI authorization](../accounts-api/ddpi-status.md). This route applies track_api_usage; reconcile ambiguous outcomes before any further trading action.

Source handler: `restx_api.protected_orders.PlaceProtectedOrder.post`. Source services: `services.protected_order_service.place_protected_order`.

