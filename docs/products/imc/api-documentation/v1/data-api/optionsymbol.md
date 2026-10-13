# Option symbol

Resolve ATM/ITM/OTM selection into an actual option symbol and instrument metadata without submitting an order.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/optionsymbol`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `strategy` | String | No | omitted; see behavior below | Strategy name. |
| `underlying` | String | Yes | required | Underlying index/equity/future symbol. |
| `exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |
| `expiry_date` | String | No | omitted; see behavior below | Expiry in DDMMMYY format; use an available master-contract expiry. |
| `strike_int` | Integer | No | omitted; see behavior below | Positive strike interval override; omit to use actual strikes. |
| `offset` | String | Yes | required | ATM, ITM1–ITM50 or OTM1–OTM50. |
| `option_type` | String | Yes | required | CE or PE (lowercase accepted by schema). |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "underlying": "NIFTY",
  "exchange": "NSE_INDEX",
  "offset": "ATM",
  "option_type": "CE",
  "expiry_date": "31DEC26"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.optionsymbol(underlying='NIFTY', exchange='NSE_INDEX', offset='ATM', option_type='CE', expiry_date='31DEC26')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "symbol": "NIFTY31DEC2625000CE",
  "exchange": "NFO",
  "lotsize": 65,
  "tick_size": 0.05,
  "freeze_qty": 1800,
  "underlying_ltp": 25000
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

No order is placed. Resolution needs master contracts and quote access. expiry_date can be omitted when the underlying identifies its expiry; otherwise provide it. The optional strategy field is deprecated. Returns symbol, exchange, lotsize, tick_size, freeze_qty and underlying_ltp. No mode preconditions or route usage-recording decorator are attached.

Source handler: `restx_api.option_symbol.OptionSymbol.post`. Source services: `services.option_symbol_service.get_option_symbol`.

