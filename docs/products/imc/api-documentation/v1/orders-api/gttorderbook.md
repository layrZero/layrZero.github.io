# GTT order book

Read broker-hosted triggers for the selected binding. Trigger records are distinct from executed order fills.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/gttorderbook`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `expected_mode` | String | Yes | required | Current server mode: live or analyze. |
| `expected_balance_type` | String | Yes | required | Current balance type: live or sandbox. |
| `expected_mode_version` | Integer | Yes | required | Current integer version returned by Funds/Analyzer; refresh after a mode switch. |
| `request_id` | String | Yes | required | Save before submission. For protected placement retain the same ID and payload for an intentional retry; do not replay an ambiguous submission automatically. |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |

### Request example

```json
{
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-business-request-001",
  "apikey": "YOUR_BROKER_IMC_KEY"
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
# Copy the current snapshot from Funds/Analyzer for this same key.
client.set_mode_context(expected_mode="analyze", expected_balance_type="sandbox", expected_mode_version=7)

result = client.gttorderbook(request_id='saved-business-request-001')
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "data": [],
  "mode": "analyze",
  "balance_type": "sandbox",
  "mode_version": 7
}
```

Successful responses retain the selected broker adapter’s fields. Placement/modification/cancellation return legacy trigger identifiers and broker details; the book returns trigger records. See the workflow contract below for broker-specific examples.

All incoming JSON objects and arrays follow [recursive forbidden-field validation](../request-json-validation.md). A prohibited documentation key returns 400 before execution:

```json
{
  "status": "error",
  "error_code": "FORBIDDEN_JSON_FIELD",
  "message": "Documentation fields are not allowed in request JSON."
}
```

Schema errors use 400. Authentication and broker-session failures retain endpoint-specific errors. Missing mode preconditions use 428 in services (the REST schema can reject missing fields with 400); stale mode snapshots use 409. See [HTTP errors](../http-status-codes.md) and [authentication/mode requirements](../authentication-and-mode-preconditions.md). No error response authorizes an automatic order retry.

### Modes, capabilities and usage

Requires current mode metadata and request_id, including for the book read. GTT retains scoped lease reuse. SINGLE/OCO products are CNC or NRML; MIS is rejected. SINGLE needs a positive triggerprice_sl or triggerprice_tg; OCO needs positive stop/target triggers and leg limits, with stop trigger below target trigger. Broker restrictions remain explicit: Upstox protective-only OCO is unsupported (use protected entry for its native MULTIPLE workflow), Dhan new Super placements require explicit SUPER intent and its extra fields, and other support depends on the current adapter. Existing legacy trigger envelopes are retained; an accepted trigger is not a fill. The service applies track_api_usage; the read retains its existing usage policy. See [options/GTT workflow](./options-and-gtt.md) and [Dhan Super contract](./dhan-super-orders.md).

Source handler: `restx_api.gtt_orderbook.GTTOrderBook.post`. Source services: `services.gtt_orderbook_service.get_gtt_orderbook`.

