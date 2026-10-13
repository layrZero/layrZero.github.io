# Market holidays

Read the Indian exchange holiday calendar for a year. Calendar data is independent of broker execution.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/market/holidays`

Authentication: apikey schema-required; calendar service does not verify identity. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `year` | Integer | No | omitted; see behavior below | 2020–2050; omitted year uses the current year. |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "year": 2026
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.holidays(year=2026)
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "year": 2026,
  "timezone": "Asia/Kolkata",
  "data": []
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

The schema requires apikey, but the current calendar service does not verify its identity. This is a documented limitation, not account authentication evidence. No broker capability, order-mode lease or usage-recording decorator is involved. The response contains year, timezone=Asia/Kolkata and data with holiday/exchange-session records.

Source handler: `restx_api.market_holidays.MarketHolidays.post`. Source services: `services.market_calendar_service.get_holidays`.

