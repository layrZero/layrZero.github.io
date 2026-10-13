# Option chain

Resolve an underlying and expiry into a chain around the ATM strike, using master contracts and quote data.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/optionchain`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `underlying` | String | Yes | required | Underlying index/equity/future symbol. |
| `exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |
| `expiry_date` | String | Yes | required | Expiry in DDMMMYY format; use an available master-contract expiry. |
| `strike_count` | Integer | No | omitted; see behavior below | 1–100 strikes on each side of ATM; omission returns the full chain. |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "underlying": "NIFTY",
  "exchange": "NSE_INDEX",
  "expiry_date": "31DEC26"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.optionchain(underlying='NIFTY', exchange='NSE_INDEX', expiry_date='31DEC26')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "underlying": "NIFTY",
  "underlying_ltp": 25000,
  "underlying_prev_close": 24900,
  "expiry_date": "31DEC26",
  "atm_strike": 25000,
  "chain": []
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

expiry_date is mandatory in the REST schema even though the SDK signature permits omission. Always supply it in working calls. Requires quote access and available master contracts. Returns underlying prices, expiry_date, atm_strike and chain entries. No order is placed, and no mode preconditions or route usage-recording decorator are attached.

Source handler: `restx_api.option_chain.OptionChain.post`. Source services: `services.option_chain_service.get_option_chain`.

