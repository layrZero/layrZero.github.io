# Synthetic future

Calculate an ATM synthetic futures price from the underlying and call/put quotes. It does not submit either option leg.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/syntheticfuture`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `underlying` | String | Yes | required | Underlying index/equity/future symbol. |
| `exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |
| `expiry_date` | String | Yes | required | Expiry in DDMMMYY format; use an available master-contract expiry. |

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

result = client.syntheticfuture(underlying='NIFTY', exchange='NSE_INDEX', expiry_date='31DEC26')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "underlying": "NIFTY",
  "underlying_ltp": 25000,
  "expiry": "31DEC26",
  "atm_strike": 25000,
  "synthetic_future_price": 25010
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

expiry_date is required in DDMMMYY format. The service resolves ATM contracts and computes strike + call LTP − put LTP. Quote permissions and current master contracts are required. Returns underlying, underlying_ltp, expiry, atm_strike and synthetic_future_price. No orders, mode-precondition fields or route usage-recording decorator are involved.

Source handler: `restx_api.synthetic_future.SyntheticFuture.post`. Source services: `services.synthetic_future_service.calculate_synthetic_future`.

