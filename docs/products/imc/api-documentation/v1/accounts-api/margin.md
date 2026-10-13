# Margin calculator

Estimate margin for a basket of positions without placing orders. Analyze uses sandbox calculations; Live uses the selected broker adapter.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/margin`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `expected_mode` | String | Yes | required | Current server mode: live or analyze. |
| `expected_balance_type` | String | Yes | required | Current balance type: live or sandbox. |
| `expected_mode_version` | Integer | Yes | required | Current integer version returned by Funds/Analyzer; refresh after a mode switch. |
| `request_id` | String | Yes | required | Save before submission. For protected placement retain the same ID and payload for an intentional retry; do not replay an ambiguous submission automatically. |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `positions` | List | Yes | required | 1–50 positions; see nested fields below. |
| `positions[].symbol` | String | Yes | required | Current IMC trading symbol from master contracts. |
| `positions[].exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |
| `positions[].action` | String | Yes | required | BUY or SELL. |
| `positions[].quantity` | String | Yes | required | Positive quantity; use the current lot size for derivatives. |
| `positions[].product` | String | Yes | required | Broker-supported product; see constraints below. |
| `positions[].pricetype` | String | Yes | required | Execution price type; supported values depend on the operation. |
| `positions[].price` | String | No | "0" | Non-negative price; LIMIT requires a usable positive price. |
| `positions[].trigger_price` | String | No | "0" | Stop-order trigger price. |

### Request example

```json
{
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-business-request-001",
  "apikey": "YOUR_BROKER_IMC_KEY",
  "positions": [
    {
      "symbol": "RELIANCE",
      "exchange": "NSE",
      "action": "BUY",
      "quantity": "1",
      "product": "MIS",
      "pricetype": "MARKET"
    }
  ]
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
# Copy the current snapshot from Funds/Analyzer for this same key.
client.set_mode_context(expected_mode="analyze", expected_balance_type="sandbox", expected_mode_version=7)

result = client.margin(request_id='saved-business-request-001', positions=[{'symbol': 'RELIANCE', 'exchange': 'NSE', 'action': 'BUY', 'quantity': '1', 'product': 'MIS', 'pricetype': 'MARKET'}])
print(result)
```

### Response and errors

Illustrative 200 success from the Zerodha margin adapter; fields can differ by adapter; values are examples, not broker evidence:

```json
{
  "status": "success",
  "data": {
    "total_margin_required": 1000,
    "span_margin": 800,
    "exposure_margin": 200
  },
  "mode": "live",
  "balance_type": "live",
  "mode_version": 7
}
```

Successful responses retain the selected broker adapter’s fields. The envelope uses status with broker margin data; do not assume a common margin-field set across adapters. See the workflow contract below for broker-specific examples.

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

Nested positions require symbol, exchange, action, quantity, product and pricetype. Quantity/price/trigger_price are strings in this schema. MARKET price may be "0"; LIMIT needs positive price; SL needs positive price and trigger; SL-M needs positive trigger. Current mode preconditions are required even though this is a calculation. Live requires a usable broker session and a margin-capable adapter; missing capability returns 501. Broker margin responses are retained, so data fields depend on the adapter. Analyze uses sandbox calculations. No route usage-recording decorator is attached; service logging is not proof of billing.

Source handler: `restx_api.margin.MarginCalculator.post`. Source services: `services.margin_service.calculate_margin`.

