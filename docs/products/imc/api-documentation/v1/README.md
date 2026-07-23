---
slug: /products/imc/api-documentation/v1
---

# IMC API v1

Layr0 India Market Connector exposes REST APIs under `/api/v1`.

```http
Local Host   : http://127.0.0.1:5000/api/v1
Ngrok Domain : https://<your-ngrok-domain>.ngrok-free.app/api/v1
Custom Domain: https://<your-custom-domain>/api/v1
```

Every endpoint that acts on a broker account requires an `apikey` in the JSON request body. Trading and write endpoints also require mode precondition fields so clients cannot trade against stale live/analyze state.

## Response Shape

Successful responses use:

```json
{
  "status": "success"
}
```

Errors preserve IMC-specific fields:

```json
{
  "status": "error",
  "error_code": "SERVER_MODE_SWITCH_DETECTED",
  "message": "Server mode switch detected",
  "mode": "analyze",
  "balance_type": "sandbox",
  "mode_version": 8
}
```

Clients should not discard fields they do not immediately use. Mode metadata and `error_code` values are part of the public contract.
