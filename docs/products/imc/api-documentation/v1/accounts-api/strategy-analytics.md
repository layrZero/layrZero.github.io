# Strategy analytics

Read order records grouped by strategy, using the license binding and current Live/Analyze context.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## GET `/api/v1/strategy/strategies`

Authentication: X-Layr0-Api-Key or apikey header. Send parameters in the query string; do not send a JSON body.

### Parameters

| Query field | Type | Default | Effective behavior |
| --- | --- | --- | --- |
| orderType | string | auto | auto, semi_auto, all |
| status | string | optional; pending for Live semi_auto | Status filtering; unified view supports comma-separated statuses. |
| start_date, end_date | string | omitted | YYYY-MM-DD date bounds; malformed dates return 400. |
| strategy, symbol | string | omitted | Applied by Live all and sandbox branches; ignored by Live auto/semi_auto. |
| api_type | string | omitted | Applied by Live all and sandbox pending records; ignored by sandbox executed records and Live auto/semi_auto. |
| broker | string | omitted | Applied by Live all executed records; ignored by sandbox and Live auto/semi_auto. |
| page | integer | 1 | Sandbox applies offsets; Live all reports metadata without slicing records; Live auto/semi_auto ignore it. |
| per_page | integer | 100; capped at 1000 | Sandbox limits each selected source; Live all reports metadata without slicing; Live auto/semi_auto ignore it. |

### Request example

```http
GET /api/v1/strategy/strategies?orderType=auto&status=FILLED&start_date=2026-10-01&end_date=2026-10-12
X-Layr0-Api-Key: YOUR_BROKER_IMC_KEY
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")

result = client.strategy_analytics(status='FILLED', start_date='2026-10-01', end_date='2026-10-12', order_type='auto')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "strategies": {}
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



Analyze uses the sandbox binding and returns mode=sandbox. Live auto and semi_auto return strategies grouped by name without pagination; only status/date filters affect those branches. Live all uses the unified service for richer filtering, but its pagination metadata does not limit the returned records. Sandbox all merges independently paginated pending and executed sources, so it may return up to twice per_page records; api_type filters only pending sandbox records. Status matching also differs: unified Live all splits comma-separated values, while sandbox uses a single exact status. Authentication failures return 401 for missing header key and 403 for an invalid binding/license. The route applies track_api_usage. Numeric pagination parsing currently lacks a controlled validation wrapper: pass positive integers; malformed values can produce a server error. This is a runtime limitation, not a supported input contract.

Source handler: `restx_api.strategy_analytics_api.StrategyAnalytics.get`. Source services: `services.mode_context.get_mode_context`.

