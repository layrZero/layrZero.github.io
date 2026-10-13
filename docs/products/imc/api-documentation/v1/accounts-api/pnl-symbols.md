# P&L by symbol

Read today’s sandbox P&L breakdown from the position manager. This endpoint is available only in Analyze mode.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/pnl/symbols`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.pnl_symbols()
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "data": [],
  "total_pnl": 0,
  "total_unrealized_pnl": 0,
  "total_today_realized_pnl": 0,
  "total_pnl_today": 0,
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

Schema errors use 400. Authentication and broker-session failures retain endpoint-specific errors. See [HTTP errors](../http-status-codes.md) and [authentication/mode requirements](../authentication-and-mode-preconditions.md). No error response authorizes an automatic order retry.

### Modes, capabilities and usage

Analyze only: Live returns 400 with the current mode metadata. Each data row contains symbol, exchange, product, quantity, pnl, unrealized_pnl, today_realized_pnl and total_pnl_today. Top-level totals aggregate those measures. Reads sandbox position-manager state; it does not report live broker P&L. No mode-precondition fields, trading lease or usage-recording decorator are attached.

Source handler: `restx_api.pnl_symbols.PnLSymbols.post`. Source services: `services.mode_context.apply_mode_metadata`, `services.mode_context.get_mode_context`, `services.mode_context.invalid_api_key_response`, `services.sandbox_service.sandbox_get_pnl_symbols`.

