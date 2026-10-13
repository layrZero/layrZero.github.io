# Option Greeks

Calculate implied volatility and Black-76 Greeks using an option quote and an underlying/forward price.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/optiongreeks`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `symbol` | String | Yes | required | Current IMC trading symbol from master contracts. |
| `exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |
| `interest_rate` | Float | No | omitted; see behavior below | Annualized percent, 0–100; omission uses exchange defaults. |
| `forward_price` | Float | No | omitted; see behavior below | Non-negative custom forward price; skips underlying quote lookup. |
| `underlying_symbol` | String | No | omitted; see behavior below | Optional explicit underlying symbol for Greeks. |
| `underlying_exchange` | String | No | omitted; see behavior below | Optional explicit underlying exchange for Greeks. |
| `expiry_time` | String | No | omitted; see behavior below | Optional HH:MM expiry-time override; omission uses exchange defaults. |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "symbol": "NIFTY31DEC2625000CE",
  "exchange": "NFO"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.optiongreeks(symbol='NIFTY31DEC2625000CE', exchange='NFO')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "symbol": "NIFTY31DEC2625000CE",
  "exchange": "NFO",
  "underlying": "NIFTY",
  "strike": 25000,
  "option_type": "CE",
  "expiry_date": "31-Dec-2026",
  "days_to_expiry": 80,
  "spot_price": 25000,
  "option_price": 500,
  "interest_rate": 7,
  "implied_volatility": 15,
  "greeks": {
    "delta": 0.5,
    "gamma": 0.0001,
    "theta": -2,
    "vega": 10,
    "rho": 1
  }
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

Supported option exchanges: NFO, BFO, CDS and MCX. Requires a usable option quote and underlying price or supplied forward_price. Greeks are calculated, not broker execution evidence. Returns symbol metadata, days_to_expiry, spot_price, option_price, implied_volatility and greeks (delta, gamma, theta, vega, rho). No mode preconditions or route usage-recording decorator are attached.

Source handler: `restx_api.option_greeks.OptionGreeks.post`. Source services: `services.option_greeks_service.get_option_greeks`.

