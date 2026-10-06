# Protected orders â€” upcoming SDK 1.2.0 release

This feature is verified against IMC commit `a995f3e` (contract v2 originated at `364acaf`) on `codex/broker-gtt-endpoints`. It is not a published package or deployed-server announcement. Version **1.1.5** is the committed package-migration baseline; **1.2.0** adds these APIs. Distribution: `layr0-IMC`; import: `layr0_imc`. Until publication, install the SDK feature checkout with `pip install .`.

Production brokers for this release: **Dhan, Upstox, Zerodha, FYERS**. Angel One is blocked in development and production, including existing API bindings; manage existing Angel positions directly with Angel One. Development adapters are not production registration options.

## Client and mode context

```python
from layr0_imc import api

client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST",
             expected_mode="analyze", expected_balance_type="sandbox",
             expected_mode_version=7, protected_timeout=180)
```

Obtain the current mode/version from IMC; `7` is an example, not a valid universal version. Live uses `expected_mode="live"`, `expected_balance_type="live"`. Every protected and GTT operation sends all mode fields and a request ID. DDPI requires only the broker-specific IMC API key. A client context is not proof of fresh broker authentication.

## Protected placement

Save this request ID and exact arguments durably before submitting. Do not generate a replacement ID after a timeout. IMC persists idempotency by API key/request ID; the SDK does not maintain a durable local ledger.

```python
entry = dict(strategy="btst-demo", symbol="TCS", exchange="NSE", action="BUY",
             quantity=1, product="CNC", entry_pricetype="LIMIT", entry_price=3500,
             target_trigger=3600, target_limit=3600,
             stoploss_trigger=3400, stoploss_limit=3400)
result = client.placeprotectedorder(request_id="saved-entry-001", **entry)
# Dhan: use its IMC API key and add order_system="SUPER", trailing_jump=0.
```

`POST /api/v1/placeprotectedorder` accepts the example fields plus `apikey`, the four mode/request fields, optional `order_system` and `trailing_jump`. Quantity is an integer; prices are numbers. A MARKET entry uses `entry_price=0` only where the broker supports it. The SDK never converts MARKET to LIMIT automatically.

| Broker | Protected-entry restrictions |
| --- | --- |
| Dhan | Explicit SUPER; native entry and TP/SL; one price per exit requires equal trigger/limit values. CNC/MTF BUY equity; NRML derivatives; MIS subject to segment/account support. |
| Upstox | CNC BUY equity, LIMIT only; equal exit trigger/limit prices. One MULTIPLE GTT includes ENTRY, TARGET and STOPLOSS. |
| Zerodha / FYERS | CNC/NRML under adapter restrictions. IMC submits entry, verifies fills, cancels unfilled remainder and protects confirmed quantity. |

For BUY, stop < LIMIT entry < target; SELL reverses that ordering. SELL exit limits must be at/below their triggers; BUY exit limits at/above. Delivery/MTF placement requires fresh broker-confirmed unattended delivery authorization. IMC validates broker capabilities, product/account permissions and mode; the SDK does not bypass those checks.

A protected ID or HTTP acknowledgement is not a fill. The response can be pending, partial, protected, unprotected or uncertain. Placement waits for a bounded server poll (default 20 seconds, configured maximum 120), plus broker/network overhead. SDK protected placement defaults to 180 seconds; `protected_timeout` on the client or placement overrides it without changing the ordinary 120-second timeout. No retry, price worker or automatic closing trade is added.

Structured non-2xx responses retain original entry/protection IDs and state, with SDK `code`/`error_type` added only when absent. Transport/invalid-JSON failures on new mutations return `status="unknown"`, the original `request_id` and `submission_state="unknown"`. Reconcile by the original ID; do not infer rejection or submit a replacement entry. Successful and failed placement responses are immutable server snapshots, not current order state.

## Reconciliation and lifecycle

```python
book = client.protectedorderbook(request_id="read-001")
modified = client.modifyprotectedorder(request_id="modify-001", protected_order_id="P1",
    target_trigger=3650, target_limit=3650, stoploss_trigger=3420, stoploss_limit=3420)
# Explicit actions, never executed by book reads:
cancelled = client.cancelprotectedorder(request_id="cancel-001", protected_order_id="P1")
recovered = client.recoverprotectedorder(request_id="recover-001", protected_order_id="P1")
```

All are POST routes: `/api/v1/protectedorderbook`, `/api/v1/modifyprotectedorder`, `/api/v1/cancelprotectedorder`, `/api/v1/recoverprotectedorder`. Modify requires all four exit prices, protected ID and mode fields; optional Dhan `trailing_jump`. Cancel/recover require the ID and mode fields. Cancellation removes protection; it does not sell the position. Recovery can finish saved lifecycle work and must be explicitly requested.

Book contract v2 includes `contract_version: 2` and `data` items with `protected_order_id`, `request_id`, state, entry/protection IDs and `verification`: `verified`, `checked_at`, `account_id`, `simulated`, `entry`, `exits`, `protection_status`. Entry/exit evidence carries IDs, status, cumulative `filled_quantity`, `pending_quantity` and actual `average_price` when available. Never substitute signal/limit/trigger prices or infer an exit from matching symbols. Missing prices, linkage or history remain unverified. Dhan reused parent IDs and FYERS missing exit linkage can leave reconciliation unresolved. An older book contract is returned with `reconciliation_supported=False` and `PROTECTED_BOOK_CONTRACT_UNSUPPORTED`; do not use it to apply verified fills.

**Only protected-book reads are non-billable** here, for scheduled and manual refreshes. Authentication, bound-license validity, mode/version checks and rate limits still apply; usage exhaustion alone does not block a valid licensed read. DDPI, GTT, placement, modifications, cancellation, closes and explicit recovery retain server usage policies. The SDK adds no automatic polling.

Analyze persists CRUD state without broker calls, simulated fills, price triggers or invented P&L. Live broker state is authoritative. OCO cancels the other exit when one triggers; a triggered limit order can remain unfilled. Valid authentication is needed for later modification/cancellation/book queries.

An explicit Live `closeposition(strategy=..., ...)` uses IMC's linked-protection checks and cancellation safeguard. Uncertain or working generated exits block closure. No-exposure alone is not evidence of a fill or realized P&L. Incoming app CLOSE payloads require user Verify; the SDK adds no notifications or automatic CLOSE execution.

## DDPI evidence

```python
central = client.ddpistatus()
```

POST `/api/v1/ddpistatus` with `{"apikey":"YOUR_BROKER_IMC_KEY"}`. The key alone selects the broker and mode; there are no broker-specific DDPI routes. Unsupported brokers are rejected. Responses retain status, account identity, `ddpi_status`, `poa_status`, `unattended_delivery_authorization`, evidence source, checked timestamp and explanation. Missing/failed evidence stays unknown. Analyze does not check broker authorization.

Dhan uses profile `ddpi`; Upstox DDPI/POA flags; FYERS `ddpi_enabled`; Zerodha demat consent confirms unattended authorization without identifying DDPI separately from POA. Login and transaction EDIS authorization must not be presented as DDPI activation.

## Dhan Super wrappers through centralized GTT

```python
super_result = client.placesuperorder(request_id="saved-super-001", **entry)
super_modified = client.modifysuperorder(request_id="super-modify-001", trigger_id="D1",
    leg_name="TARGET_LEG", **{**entry, "target_trigger": 3650, "target_limit": 3650})
super_cancelled = client.cancelsuperorder(request_id="super-cancel-001", trigger_id="D1",
    strategy="btst-demo", cancel_scope="EXITS")
```

These wrappers explicitly send `order_system="SUPER"` to `/placegttorder`, `/modifygttorder`, `/cancelgttorder`. They require a Dhan-bound IMC key and do not call Dhan directly. The Super parent ID remains `trigger_id`. Modify includes the full entry/exit fields and `leg_name`: ENTRY_LEG, TARGET_LEG or STOP_LOSS_LEG. ENTRY changes require appropriate pending state; quantity cannot drop below confirmed fills; filled-entry quantity cannot be resized through exit modification.

Cancellation scopes: ALL, EXITS, ENTRY_LEG, TARGET_LEG, STOP_LOSS_LEG. ALL/ENTRY_LEG are refused after any entry fill; manage remaining entry directly with Dhan. EXITS cancels both pending exits without placing a close. Working/triggered/uncertain exits block unsafe cancellation. Broker acknowledgement alone is not verified cancellation. Analyze permits ALL/EXITS/ENTRY_LEG, not individual simulated exit-leg cancellation.

Super and Forever IDs are distinct systems. New Forever placements are disabled. Existing Forever records can use legacy modify/cancel methods with explicit `order_system="FOREVER"` and the original legacy fields. Never send their IDs to Super wrappers. The legacy centralized GTT book remains available; use protected book v2 for verified execution evidence. Dhan's day-scoped history and missing overnight records remain unknown and can block a mode switch. Static IP whitelisting, account/product permissions and delivery authorization still apply.

## REST example: protected placement

POST `/api/v1/placeprotectedorder`:

```json
{
  "apikey": "YOUR_BROKER_IMC_KEY",
  "expected_mode": "analyze", "expected_balance_type": "sandbox", "expected_mode_version": 7,
  "request_id": "saved-entry-001", "strategy": "btst-demo",
  "symbol": "TCS", "exchange": "NSE", "action": "BUY", "quantity": 1, "product": "CNC",
  "entry_pricetype": "LIMIT", "entry_price": 3500,
  "target_trigger": 3600, "target_limit": 3600,
  "stoploss_trigger": 3400, "stoploss_limit": 3400
}
```

For Dhan add `"order_system": "SUPER"` and optional `"trailing_jump": 0`. Book uses only apikey and the four mode/request fields. Modify adds protected_order_id and all four exit price fields; cancel/recover add protected_order_id. All lifecycle paths share the `/api/v1/` prefix.

## Playground request templates

Playground lists one action per HTTP method and endpoint, with neutral GTT and protected-entry bodies. Populate common fields and copy the additional broker-required fields from this page or [Dhan Super Orders](dhan-super-orders.md). The key chooses the adapter, but does not make incompatible payloads interchangeable. Broker-specific examples belong in this documentation, not separate Playground menu entries.

## Failed placement replay and current verification

Verified against IMC `a995f3e`; protected book contract v2 originated at `364acaf`.
Development and production both allow only Dhan, Upstox, Zerodha and FYERS. Angel One adapters and historical records are retained, but runtime access is blocked.

Placement results are immutable for both success and failure. For example, replaying `zerodha-tcs-protected-001` after a Zerodha authentication repair returns its original saved identity-verification failure; it does not perform a fresh profile check or submit an entry. The corrected combined `api_key:access_token` authentication is internal to IMC. Clients send their IMC key, never a broker token.

Use centralized `POST /api/v1/ddpistatus` with only `{"apikey":"YOUR_IMC_API_KEY"}` to check current account/authorization evidence. Reconcile the original operation through protected book v2 and check broker state before intentionally creating a new placement with a new ID. A successful DDPI check alone does not establish that an earlier order has no exposure. Gateway 502, malformed responses and timeouts leave outcomes uncertain; never automatically replace a request ID, resubmit, recover or fall back to ordinary placement. Book reads remain non-billable; DDPI and explicit lifecycle actions retain their server usage policies.
