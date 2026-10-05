# Options and GTT

Options helpers retain their current contracts. All four GTT routes—placegttorder, modifygttorder, cancelgttorder, gttorderbook—require apikey plus mode/version/request fields, including the book read.

Upcoming production scope: Dhan, Upstox, Zerodha and FYERS. Dhan requires explicit [Super entry intent](dhan-super-orders.md). Zerodha/FYERS support SINGLE/OCO. Upstox SINGLE uses the legacy contract; protective-only OCO returns 501. Use [protected entry](protected-orders.md) for Upstox MULTIPLE with ENTRY/TARGET/STOPLOSS. Angel One is production-disabled.

Existing non-Dhan legacy GTT and ordinary order responses are preserved. New protected routes provide isolated entry/OCO lifecycle and contract-v2 fill evidence. Analyze is persistent CRUD only, without simulated price events or fills. Broker authentication is needed for later lifecycle queries. OCO trigger cancellation is not a guaranteed execution fill.

Options endpoints: optionchain, optiongreeks, optionsymbol, optionsorder, optionsmultiorder, syntheticfuture. Trading options endpoints still require mode preconditions.

## Centralized routes and broker request examples

Playground shows one action per endpoint with a neutral body. Use the examples below in that action; the supplied key selects the broker. There is no broker URL segment. All examples are upcoming-release contracts, not live orders. Replace mode version and identifiers with current values.

### Zerodha

POST `/api/v1/placegttorder` with a Zerodha-bound key:

```json
{
  "apikey": "YOUR_IMC_API_KEY",
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-gtt-001",
  "strategy": "gtt-demo",
  "exchange": "NSE",
  "symbol": "TCS",
  "action": "SELL",
  "quantity": 1,
  "product": "CNC",
  "pricetype": "LIMIT",
  "price": 3600,
  "trigger_type": "OCO",
  "triggerprice_sl": 3400,
  "stoploss": 3395,
  "triggerprice_tg": 3600,
  "target": 3595
}
```

This is exit-only OCO for an existing holding; it does not submit an entry. A triggered limit order may remain unfilled.

### FYERS

POST `/api/v1/placegttorder` with a FYERS-bound key:

```json
{
  "apikey": "YOUR_IMC_API_KEY",
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-gtt-001",
  "strategy": "gtt-demo",
  "exchange": "NSE",
  "symbol": "TCS",
  "action": "SELL",
  "quantity": 1,
  "product": "CNC",
  "pricetype": "LIMIT",
  "price": 3600,
  "trigger_type": "OCO",
  "triggerprice_sl": 3400,
  "stoploss": 3395,
  "triggerprice_tg": 3600,
  "target": 3595
}
```

This is exit-only OCO for an existing holding; it does not submit an entry. A triggered limit order may remain unfilled.

### Upstox

POST `/api/v1/placegttorder` with a Upstox-bound key:

```json
{
  "apikey": "YOUR_IMC_API_KEY",
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-gtt-001",
  "strategy": "gtt-demo",
  "exchange": "NSE",
  "symbol": "TCS",
  "action": "SELL",
  "quantity": 1,
  "product": "CNC",
  "pricetype": "LIMIT",
  "price": 3600,
  "trigger_type": "SINGLE",
  "triggerprice_tg": 3600
}
```

SINGLE uses one trigger. Protective-only OCO is unsupported; use [protected entry](protected-orders.md) for the native ENTRY/TARGET/STOPLOSS workflow.

### Dhan

Use the centralized routes with explicit Super intent and entry details. See [Dhan Super placement, modification and cancellation examples](dhan-super-orders.md). New Forever placements are unavailable.

### Lifecycle requests

For Zerodha, FYERS and Upstox, modification uses `/api/v1/modifygttorder` with the complete placement payload above, the existing `trigger_id`, and a new lifecycle `request_id`. Upstox remains SINGLE-only on these legacy routes. Dhan additionally requires explicit Super leg/scope fields shown in its guide.

POST `/api/v1/cancelgttorder` for non-Dhan GTTs:

```json
{
  "apikey": "YOUR_IMC_API_KEY",
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "strategy": "gtt-demo",
  "request_id": "saved-cancel-001",
  "trigger_id": "BROKER_TRIGGER_ID"
}
```

POST `/api/v1/gttorderbook` for any supported broker:

```json
{
  "apikey": "YOUR_IMC_API_KEY",
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-book-001"
}
```
