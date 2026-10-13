# Multiple quotes

Fetch quote snapshots for a nonempty list of symbol/exchange pairs. Inspect every result for individual symbol errors.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/multiquotes`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `symbols` | List | Yes | required | Nonempty array of symbol/exchange objects. |
| `symbols[].symbol` | String | Yes | required | Current IMC trading symbol from master contracts. |
| `symbols[].exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "symbols": [
    {
      "symbol": "RELIANCE",
      "exchange": "NSE"
    }
  ]
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.multiquotes(symbols=[{'symbol': 'RELIANCE', 'exchange': 'NSE'}])
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "results": [
    {
      "symbol": "RELIANCE",
      "exchange": "NSE",
      "data": {
        "ltp": 100
      }
    }
  ]
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

Uses native broker multi-quote support when present and individual quote reads otherwise. The top-level response uses results, with symbol/exchange/data or per-symbol errors. Top-level success does not imply every symbol succeeded. Requires a usable broker data session even in Analyze. No order-mode preconditions or route usage-recording decorator are attached.

Source handler: `restx_api.multiquotes.MultiQuotes.post`. Source services: `services.quotes_service.get_multiquotes`.

