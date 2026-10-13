# Instruments

Download the selected broker’s locally stored master-contract instrument records, optionally filtered by exchange.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## GET `/api/v1/instruments`

Authentication: apikey query. Send parameters in the query string; do not send a JSON body.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `exchange` | String | No | omitted; see behavior below | Exchange identifier supported by the selected instrument and broker. |
| `format` | String | No | omitted; see behavior below | json (default) or csv. |

### Request example

```http
GET /api/v1/instruments?apikey=YOUR_BROKER_IMC_KEY&exchange=NSE
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.instruments(exchange='NSE')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "data": [
    {
      "symbol": "RELIANCE",
      "exchange": "NSE",
      "token": "EXAMPLE_TOKEN",
      "lotsize": 1
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

Supported exchange filters: NSE, BSE, NFO, BFO, BCD, CDS, MCX, NSE_INDEX, BSE_INDEX. Omit exchange for all local instruments. JSON returns status/data; format=csv returns a CSV download. Master-contract freshness controls available symbols; this read is not broker execution evidence. No mode preconditions or usage-recording decorator are attached. The SDK instruments(exchange="NSE") returns a pandas DataFrame on success; instruments() makes separate calls for its known exchanges and combines results, potentially omitting failed exchanges. For CSV use HTTP directly or client.request, not the DataFrame wrapper.

Source handler: `restx_api.instruments.Instruments.get`. Source services: `services.instruments_service.get_instruments`.

