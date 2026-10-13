# Broker discovery

List all registered broker bindings under the supplied key’s user/license, including whether each completed today’s login in IST.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/brokers/active`

Authentication: application Authorization header (AUTH_MAGIC_KEY) plus apikey JSON. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |

### Request example

Required additional header:

```http
Authorization: YOUR_APPLICATION_AUTHORIZATION
```

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.brokers_active(auth_magic_key='YOUR_APPLICATION_AUTHORIZATION')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "brokers": [
    {
      "broker": "upstox",
      "apikey": "YOUR_UPSTOX_IMC_KEY",
      "order_mode": "auto",
      "authenticated_today": true,
      "disabled_reason": null
    }
  ],
  "count": 1
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

The Authorization header must equal the configured AUTH_MAGIC_KEY exactly (no Bearer prefix). This is trusted application authorization, not the user API key. Returns all bindings, including disabled ones, with per-broker apikey, order_mode, authenticated_today and disabled_reason; unauthenticated bindings also include daily_login_url. count includes disabled bindings. Select only a binding with authenticated_today=true and use its own key/mode context. No mode lease or usage-recording decorator is attached to this route. Missing application authorization returns 401; server configuration missing AUTH_MAGIC_KEY returns 500; an invalid binding key returns 403.

Source handler: `restx_api.brokers.ActiveBrokers.post`. Source services: `services.brokers_service.get_active_brokers`.

