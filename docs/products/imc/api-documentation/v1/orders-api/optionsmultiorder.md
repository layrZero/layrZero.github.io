# Options multi-order

Resolve and submit multiple option legs. Partial execution is possible; inspect each leg and split result.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/optionsmultiorder`

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
| `underlying` | String | Yes | required | Underlying index/equity/future symbol. |
| `exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |
| `expiry_date` | String | No | omitted; see behavior below | Expiry in DDMMMYY format; use an available master-contract expiry. |
| `strike_int` | Integer | No | omitted; see behavior below | Positive strike interval override; omit to use actual strikes. |
| `legs` | List | Yes | required | Nonempty option-leg array; see nested fields below. |
| `legs[].offset` | String | Yes | required | ATM, ITM1–ITM50 or OTM1–OTM50. |
| `legs[].option_type` | String | Yes | required | CE or PE (lowercase accepted by schema). |
| `legs[].action` | String | Yes | required | BUY or SELL. |
| `legs[].quantity` | Integer | Yes | required | Positive quantity; use the current lot size for derivatives. |
| `legs[].splitsize` | Integer | No | 0 | 0 disables splitting; positive size divides the requested quantity. |
| `legs[].expiry_date` | String | No | omitted; see behavior below | Expiry in DDMMMYY format; use an available master-contract expiry. |
| `legs[].pricetype` | String | No | "MARKET" | Execution price type; supported values depend on the operation. |
| `legs[].product` | String | No | "MIS" | Broker-supported product; see constraints below. |
| `legs[].price` | Float | No | 0.0 | Non-negative price; LIMIT requires a usable positive price. |
| `legs[].trigger_price` | Float | No | 0.0 | Stop-order trigger price. |
| `legs[].disclosed_quantity` | Integer | No | 0 | Disclosed quantity, subject to broker rules. |

### Request example

```json
{
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-business-request-001",
  "apikey": "YOUR_BROKER_IMC_KEY",
  "strategy": "Python",
  "underlying": "NIFTY",
  "exchange": "NSE_INDEX",
  "legs": [
    {
      "offset": "ATM",
      "option_type": "CE",
      "action": "BUY",
      "quantity": 65
    }
  ],
  "expiry_date": "31DEC26"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
# Copy the current snapshot from Funds/Analyzer for this same key.
client.set_mode_context(expected_mode="analyze", expected_balance_type="sandbox", expected_mode_version=7)

result = client.optionsmultiorder(request_id='saved-business-request-001', strategy='Python', underlying='NIFTY', exchange='NSE_INDEX', legs=[{'offset': 'ATM', 'option_type': 'CE', 'action': 'BUY', 'quantity': 65}], expiry_date='31DEC26')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "underlying": "NIFTY",
  "underlying_ltp": 25000,
  "results": [
    {
      "leg": 1,
      "symbol": "NIFTY31DEC2625000CE",
      "exchange": "NFO",
      "offset": "ATM",
      "option_type": "CE",
      "action": "BUY",
      "status": "success",
      "orderid": "EXAMPLE_ORDER_ID",
      "mode": "analyze"
    }
  ],
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

The service owns one parent lease through all legs, including parallel leg work. Legs require offset, option_type, action and quantity; optional expiry_date overrides the top-level expiry. Each leg may split and has independent results. A top-level success can contain failed legs; it is not an atomic basket or proof of fills. Semi-auto handling and established child-order usage policies remain in effect; the route adds no separate usage-recording decorator.

Source handler: `restx_api.options_multiorder.OptionsMultiOrder.post`. Source services: `services.options_multiorder_service.place_options_multiorder`.

