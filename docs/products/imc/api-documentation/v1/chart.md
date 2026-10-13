# Chart preferences

Read or update cloud chart preferences associated with the API key. This endpoint does not fetch candles or place trades.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## GET `/api/v1/chart`

Authentication: apikey query. Send parameters in the query string; do not send a JSON body.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |

### Request example

```http
GET /api/v1/chart?apikey=YOUR_BROKER_IMC_KEY
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.chart()
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "data": {
    "tv_theme": "dark"
  }
}
```

All incoming JSON objects and arrays follow [recursive forbidden-field validation](request-json-validation.md). A prohibited documentation key returns 400 before execution:

```json
{
  "status": "error",
  "error_code": "FORBIDDEN_JSON_FIELD",
  "message": "Documentation fields are not allowed in request JSON."
}
```

Schema errors use 400. Authentication and broker-session failures retain endpoint-specific errors. See [HTTP errors](http-status-codes.md) and [authentication/mode requirements](authentication-and-mode-preconditions.md). No error response authorizes an automatic order retry.

### Modes, capabilities and usage

GET authenticates with query apikey and returns saved preferences in data. POST authenticates with body apikey and merges all other JSON fields as preferences; at least one preference is required. Custom preferences remain supported without a restrictive allowlist. The recursive forbidden-field policy still applies to preference objects and arrays. No order mode preconditions or usage-recording decorator are attached. Missing query key/no preferences returns 400; invalid key returns 403.

Source handler: `restx_api.chart_api.ChartPreferencesResource.get`. Source services: `services.chart_service.get_chart_preferences`.

## POST `/api/v1/chart`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "tv_theme": "dark"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.chart(tv_theme='dark')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "message": "Preferences updated successfully"
}
```

All incoming JSON objects and arrays follow [recursive forbidden-field validation](request-json-validation.md). A prohibited documentation key returns 400 before execution:

```json
{
  "status": "error",
  "error_code": "FORBIDDEN_JSON_FIELD",
  "message": "Documentation fields are not allowed in request JSON."
}
```

Schema errors use 400. Authentication and broker-session failures retain endpoint-specific errors. See [HTTP errors](http-status-codes.md) and [authentication/mode requirements](authentication-and-mode-preconditions.md). No error response authorizes an automatic order retry.

### Modes, capabilities and usage

GET authenticates with query apikey and returns saved preferences in data. POST authenticates with body apikey and merges all other JSON fields as preferences; at least one preference is required. Custom preferences remain supported without a restrictive allowlist. The recursive forbidden-field policy still applies to preference objects and arrays. No order mode preconditions or usage-recording decorator are attached. Missing query key/no preferences returns 400; invalid key returns 403.

Source handler: `restx_api.chart_api.ChartPreferencesResource.post`. Source services: `services.chart_service.update_chart_preferences`.

