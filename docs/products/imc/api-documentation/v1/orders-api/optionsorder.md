# Options order

Resolve an option contract and submit a smart order, optionally split into smaller orders. This is a trading operation.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/optionsorder`

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
| `offset` | String | Yes | required | ATM, ITM1–ITM50 or OTM1–OTM50. |
| `option_type` | String | Yes | required | CE or PE (lowercase accepted by schema). |
| `action` | String | Yes | required | BUY or SELL. |
| `quantity` | Integer | Yes | required | Positive quantity; use the current lot size for derivatives. |
| `position_size` | Integer | Yes | required | Target position size for smart-order execution. |
| `splitsize` | Integer | No | 0 | 0 disables splitting; positive size divides the requested quantity. |
| `pricetype` | String | No | "MARKET" | Execution price type; supported values depend on the operation. |
| `product` | String | No | "MIS" | Broker-supported product; see constraints below. |
| `price` | Float | No | 0.0 | Non-negative price; LIMIT requires a usable positive price. |
| `trigger_price` | Float | No | 0.0 | Stop-order trigger price. |
| `disclosed_quantity` | Integer | No | 0 | Disclosed quantity, subject to broker rules. |

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
  "offset": "ATM",
  "option_type": "CE",
  "action": "BUY",
  "quantity": 65,
  "position_size": 65,
  "expiry_date": "31DEC26",
  "product": "MIS"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
# Copy the current snapshot from Funds/Analyzer for this same key.
client.set_mode_context(expected_mode="analyze", expected_balance_type="sandbox", expected_mode_version=7)

result = client.optionsorder(request_id='saved-business-request-001', strategy='Python', underlying='NIFTY', exchange='NSE_INDEX', offset='ATM', option_type='CE', action='BUY', quantity=65, position_size=65, expiry_date='31DEC26', product='MIS')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "orderid": "EXAMPLE_ORDER_ID",
  "symbol": "NIFTY31DEC2625000CE",
  "exchange": "NFO",
  "underlying": "NIFTY",
  "underlying_ltp": 25000,
  "offset": "ATM",
  "option_type": "CE",
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

Requires current mode metadata and one service-owned parent lease, which remains active through child execution and splitting. Child requests retain broker identity and mode preconditions. Non-split results contain orderid and resolved symbol details; split results contain results with individual statuses. Semi-auto approval and smart position sizing remain applicable. Preserve partial failures and reconcile unknown outcomes before further orders. Usage is recorded through the established child order execution policy; this route has no additional usage-recording decorator.

Source handler: `restx_api.options_order.OptionsOrder.post`. Source services: `services.place_options_order_service.place_options_order`.

