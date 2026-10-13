# Ping

Check that IMC can resolve the API key to stored broker authentication. A pong does not perform a live broker health check.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/ping`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |

### Request example

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.ping()
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "data": {
    "message": "pong",
    "broker": "upstox"
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

The service checks stored broker authentication and returns data.message=pong and data.broker. It does not contact the broker, so success does not prove a current session or trading capability. No mode preconditions, lease or usage-recording decorator are attached.

Source handler: `restx_api.ping.Ping.post`. Source services: `services.ping_service.get_ping`.

