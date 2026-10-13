# Place GTT order

Create a broker-hosted trigger using the flat SINGLE/OCO request contract. Trigger acceptance is not an execution fill.

Offline source contract; this page is not a production deployment announcement. Replace symbols, expiries, quantities and mode snapshots with current account evidence before use.

## POST `/api/v1/placegttorder`

Authentication: apikey JSON; identity checked in route/service. Send a JSON object with Content-Type: application/json.

### Parameters

The following table/example is the legacy SINGLE/OCO contract for eligible non-Dhan bindings. Dhan uses the separate SUPER variant documented on this same page below.

| Field | Type | Required | Default / omission | Meaning |
| --- | --- | --- | --- | --- |
| `expected_mode` | String | Yes | required | Current server mode: live or analyze. |
| `expected_balance_type` | String | Yes | required | Current balance type: live or sandbox. |
| `expected_mode_version` | Integer | Yes | required | Current integer version returned by Funds/Analyzer; refresh after a mode switch. |
| `request_id` | String | Yes | required | Save before submission. For protected placement retain the same ID and payload for an intentional retry; do not replay an ambiguous submission automatically. |
| `apikey` | String | Yes | required | Per-broker IMC key; never use the broker access token. |
| `strategy` | String | Yes | required | Strategy name. |
| `trigger_type` | String | Yes | required | SINGLE or OCO; Dhan Super intent has additional fields described in its guide. |
| `exchange` | String | Yes | required | Exchange identifier supported by the selected instrument and broker. |
| `symbol` | String | Yes | required | Current IMC trading symbol from master contracts. |
| `action` | String | Yes | required | BUY or SELL. |
| `product` | String | Yes | required | Broker-supported product; see constraints below. |
| `quantity` | Float | Yes | required | Positive quantity; use the current lot size for derivatives. |
| `pricetype` | String | No | "LIMIT" | Execution price type; supported values depend on the operation. |
| `price` | Float | Yes | required | Non-negative price; LIMIT requires a usable positive price. |
| `triggerprice_sl` | Float | No | 0.0 | Stop-loss trigger; SINGLE requires a positive stop or target trigger. |
| `triggerprice_tg` | Float | No | 0.0 | Target trigger; SINGLE requires a positive stop or target trigger. |
| `stoploss` | Float | No | null | OCO stop-loss leg limit. |
| `target` | Float | No | null | OCO target leg limit. |
| `expires_at` | String | No | null | Optional broker-supported trigger expiry. |

### Request example

```json
{
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-business-request-001",
  "apikey": "YOUR_BROKER_IMC_KEY",
  "strategy": "Python",
  "trigger_type": "SINGLE",
  "exchange": "NSE",
  "symbol": "RELIANCE",
  "action": "BUY",
  "product": "CNC",
  "quantity": 1,
  "price": 100,
  "triggerprice_tg": 110
}
```

### Python SDK

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
# Copy the current snapshot from Funds/Analyzer for this same key.
client.set_mode_context(expected_mode="analyze", expected_balance_type="sandbox", expected_mode_version=7)

result = client.placegttorder(request_id='saved-business-request-001', strategy='Python', trigger_type='SINGLE', exchange='NSE', symbol='RELIANCE', action='BUY', product='CNC', quantity=1, price=100, triggerprice_tg=110)
print(result)
```

### Response and errors

Illustrative 200 success; values are examples, not broker evidence:

```json
{
  "status": "success",
  "trigger_id": "EXAMPLE_TRIGGER_ID",
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

Requires current mode metadata and request_id, including for the book read. GTT retains scoped lease reuse. SINGLE/OCO products are CNC or NRML; MIS is rejected. SINGLE needs a positive triggerprice_sl or triggerprice_tg; OCO needs positive stop/target triggers and leg limits, with stop trigger below target trigger. Broker restrictions remain explicit: Upstox protective-only OCO is unsupported (use protected entry for its native MULTIPLE workflow), Dhan new Super placements require explicit SUPER intent and its extra fields, and other support depends on the current adapter. Existing legacy trigger envelopes are retained; an accepted trigger is not a fill. Both the route and public service participate in the established track_api_usage policy, with existing scoped usage handling retained. See [options/GTT workflow](./options-and-gtt.md) and [Dhan Super contract](./dhan-super-orders.md).

Source handler: `restx_api.place_gtt_order.PlaceGTTOrder.post`. Source services: `services.place_gtt_order_service.place_gtt_order`.

### Dhan SUPER request variant

Dhan uses explicit order_system=SUPER. New Forever placements are disabled; existing Forever modifications/cancellations require order_system=FOREVER and the legacy fields. The saved request_id and complete mode snapshot are required in both variants.

| Field | Type | SUPER requirement / default |
| --- | --- | --- |
| apikey, strategy, request_id | string | Required; Dhan-bound key and saved identity. |
| expected_mode, expected_balance_type | string | Required current mode/balance snapshot. |
| expected_mode_version | integer | Required current mode version. |
| order_system | string | Required: SUPER. |
| symbol, exchange, action, product | string | Required; BUY/SELL, supported segment/product. |
| quantity | integer | Required, positive; current lot size for derivatives. |
| entry_pricetype | string | Required: MARKET or LIMIT. |
| entry_price | number | Required; MARKET may use 0. |
| target_trigger, target_limit | number | Required, positive and equal for Dhan. |
| stoploss_trigger, stoploss_limit | number | Required, positive and equal for Dhan. |
| trailing_jump | number | Optional non-negative; placement defaults to 0, modification omission preserves its existing value. |
| trigger_type | string | Optional OCO only, default OCO; not needed in SDK example. |

CNC/MTF requires BUY equity; NRML requires derivatives; MIS is segment/account-dependent. BUY stop trigger must be below target; SELL target must be below stop. LIMIT entry must lie between triggers. Dhan has one price per exit, so trigger and limit must match. Modification after entry fills cannot resize the filled entry; ENTRY_LEG requires an eligible pending/partial entry. ALL/ENTRY_LEG cancellation is refused after any entry fill; EXITS removes pending exits without selling the position. Analyze supports ALL/EXITS/ENTRY_LEG cancellation, not individual simulated exit cancellation. Broker permissions and static-IP requirements apply.

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-super-request-001",
  "strategy": "Python",
  "order_system": "SUPER",
  "symbol": "RELIANCE",
  "exchange": "NSE",
  "action": "BUY",
  "quantity": 1,
  "product": "CNC",
  "entry_pricetype": "LIMIT",
  "entry_price": 100,
  "target_trigger": 110,
  "target_limit": 110,
  "stoploss_trigger": 90,
  "stoploss_limit": 90,
  "trailing_jump": 0
}
```

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
# This key must be bound to Dhan; copy its current mode snapshot.
client.set_mode_context(expected_mode="analyze", expected_balance_type="sandbox", expected_mode_version=7)

result = client.placesuperorder(request_id='saved-super-request-001', strategy='Python', symbol='RELIANCE', exchange='NSE', action='BUY', quantity=1, product='CNC', entry_pricetype='LIMIT', entry_price=100, target_trigger=110, target_limit=110, stoploss_trigger=90, stoploss_limit=90, trailing_jump=0)
print(result)
```

