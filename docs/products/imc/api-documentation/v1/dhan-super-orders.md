# Dhan Super Orders through IMC

Upcoming production release: Dhan replaces Angel One. IMC uses Dhan Super Orders for new composite entries; new Forever placements are disabled.

Use a Dhan-bound IMC API key. The SDK helpers `placesuperorder`, `modifysuperorder`, `cancelsuperorder` send explicit `order_system: SUPER` to the centralized `/api/v1/placegttorder`, `/api/v1/modifygttorder`, `/api/v1/cancelgttorder` routes. The Super parent ID is returned as `trigger_id`.

## Placement request

```json
{
  "apikey": "YOUR_DHAN_IMC_KEY",
  "expected_mode": "analyze", "expected_balance_type": "sandbox", "expected_mode_version": 7,
  "request_id": "saved-super-001", "order_system": "SUPER",
  "strategy": "btst-demo", "symbol": "TCS", "exchange": "NSE", "action": "BUY",
  "quantity": 1, "product": "CNC", "entry_pricetype": "LIMIT", "entry_price": 3500,
  "target_trigger": 3600, "target_limit": 3600,
  "stoploss_trigger": 3400, "stoploss_limit": 3400, "trailing_jump": 0
}
```

Use current mode metadata; version 7 is only an example. MARKET uses entry_price 0. Trigger/limit prices must match because Super has one price per exit. CNC/MTF requires BUY equity; NRML requires derivatives; MIS depends on supported segment/account. Broker permissions and static-IP requirements apply. SDK protected placement can alternatively use `/placeprotectedorder` with the same Super intent and fields.

## Modify and cancel

Modify sends the full placement fields plus `trigger_id` and `leg_name`: ENTRY_LEG, TARGET_LEG or STOP_LOSS_LEG. Entry changes require a pending/partial state; quantity cannot be below cumulative fills. After a filled entry, exit modification cannot resize the entry quantity.

Cancel sends apikey, strategy, trigger_id, order_system SUPER, all mode fields, request_id and explicit `cancel_scope`: ALL, EXITS, ENTRY_LEG, TARGET_LEG or STOP_LOSS_LEG. ALL/ENTRY_LEG is refused after any entry fill; manage remaining entry directly with Dhan. EXITS removes both pending exits without placing a sell. Generated working/uncertain exits block unsafe cancellation. A broker acknowledgement is not verified cancellation. Analyze supports ALL/EXITS/ENTRY_LEG but not individual simulated exit cancellations.

Existing Forever records retain explicit `order_system: FOREVER` for legacy modify/cancel requests. Never use Super helpers for their IDs. The legacy GTT book checks both systems; protected book v2 provides execution evidence for protected operations. A day-scoped Dhan book or reused parent/exit IDs can leave overnight or exit state unknown; do not infer cancellation or invent a fill. Such uncertainty can block mode switching.

See [protected-order Python examples](protected-orders.md) and [DDPI evidence](ddpi-status.md).
