# Market timings

Read exchange trading-session timings for a date. An empty data list means no returned sessions for that day.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/market/timings`

Authentication: apikey schema-required; calendar service does not verify identity. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `date` | String | Yes | required | YYYY-MM-DD date. |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "date": "2026-10-12"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.timings(date='2026-10-12')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "data": [
    {
      "exchange": "NSE",
      "start_time": 1791776700000,
      "end_time": 1791799200000
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

The REST schema requires date; the SDK timings() supplies the machine’s current date when omitted. Pass an explicit Indian-market date to avoid timezone ambiguity. Calendar apikey is syntactically required but not identity-verified by this service. No broker capability, order-mode lease or usage-recording decorator is involved. Session start_time/end_time values are epoch milliseconds.

Source handler: `restx_api.market_timings.MarketTimings.post`. Source services: `services.market_calendar_service.get_timings`.

