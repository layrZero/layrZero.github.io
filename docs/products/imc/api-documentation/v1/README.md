---
slug: /products/imc/api-documentation/v1
---

# IMC API v1

Layr0 India Market Connector exposes REST APIs under `/api/v1`.

```http
Hosted URL   : https://imc.layr0.org/api/v1
```

Account authentication normally uses `apikey` in POST JSON. GET endpoints use the documented query or header location; broker discovery also requires application Authorization. See each dedicated page for exceptions. Trading and write endpoints also require mode precondition fields so clients cannot trade against stale live/analyze state.

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

## Protected-order availability and SDK compatibility

SDK baseline 1.1.5; protected APIs in SDK 1.2.0, verified against IMC `a995f3e` (contract v2 originated at `364acaf`). Production registration for this release: Dhan, Upstox, Zerodha and FYERS. Angel One is blocked in development and production. See [release and migration details](../../releases/protected-order-release.md). The protected-order APIs are available in IMC. SDK 1.2.0 is the compatibility version that includes the corresponding Python client methods; SDK 1.1.5 is the prior package baseline.

## Complete offline contract reference

See [all endpoint contracts](complete-endpoint-reference.md) and [request validation](request-json-validation.md). Contract corrections are verified offline on the endpoint-wiring branch; deployed behavior requires separate verification.

## Independent endpoint pages

One page per public URL path; the Chart page documents both GET and POST.

| Method / URL | Dedicated page |
| --- | --- |
| POST `/api/v1/analyzer` | [accounts-api/analyzer-status.md](accounts-api/analyzer-status.md) |
| POST `/api/v1/analyzer/toggle` | [accounts-api/analyzer-toggle.md](accounts-api/analyzer-toggle.md) |
| POST `/api/v1/basketorder` | [orders-api/basketorder.md](orders-api/basketorder.md) |
| POST `/api/v1/brokers/active` | [brokers-active.md](./accounts-api/brokers-active.md) |
| POST `/api/v1/cancelallorder` | [orders-api/cancelallorder.md](orders-api/cancelallorder.md) |
| POST `/api/v1/cancelgttorder` | [cancelgttorder.md](./orders-api/cancelgttorder.md) |
| POST `/api/v1/cancelorder` | [orders-api/cancelorder.md](orders-api/cancelorder.md) |
| POST `/api/v1/cancelprotectedorder` | [cancelprotectedorder.md](./orders-api/cancelprotectedorder.md) |
| GET `/api/v1/chart` | [chart.md](chart.md) |
| POST `/api/v1/chart` | [chart.md](chart.md) |
| POST `/api/v1/closeposition` | [orders-api/closeposition.md](orders-api/closeposition.md) |
| POST `/api/v1/ddpistatus` | [ddpi-status.md](./accounts-api/ddpi-status.md) |
| POST `/api/v1/depth` | [data-api/depth.md](data-api/depth.md) |
| POST `/api/v1/expiry` | [data-api/expiry.md](data-api/expiry.md) |
| POST `/api/v1/funds` | [accounts-api/funds.md](accounts-api/funds.md) |
| POST `/api/v1/gttorderbook` | [gttorderbook.md](./orders-api/gttorderbook.md) |
| POST `/api/v1/history` | [data-api/history.md](data-api/history.md) |
| POST `/api/v1/holdings` | [accounts-api/holdings.md](accounts-api/holdings.md) |
| GET `/api/v1/instruments` | [instruments.md](./data-api/instruments.md) |
| POST `/api/v1/intervals` | [data-api/intervals.md](data-api/intervals.md) |
| POST `/api/v1/margin` | [margin.md](./accounts-api/margin.md) |
| POST `/api/v1/market/holidays` | [market-holidays.md](./data-api/market-holidays.md) |
| POST `/api/v1/market/timings` | [market-timings.md](./data-api/market-timings.md) |
| POST `/api/v1/modifygttorder` | [modifygttorder.md](./orders-api/modifygttorder.md) |
| POST `/api/v1/modifyorder` | [orders-api/modifyorder.md](orders-api/modifyorder.md) |
| POST `/api/v1/modifyprotectedorder` | [modifyprotectedorder.md](./orders-api/modifyprotectedorder.md) |
| POST `/api/v1/multiquotes` | [multiquotes.md](./data-api/multiquotes.md) |
| POST `/api/v1/optionchain` | [optionchain.md](./data-api/optionchain.md) |
| POST `/api/v1/optiongreeks` | [optiongreeks.md](./data-api/optiongreeks.md) |
| POST `/api/v1/optionsmultiorder` | [optionsmultiorder.md](./orders-api/optionsmultiorder.md) |
| POST `/api/v1/optionsorder` | [optionsorder.md](./orders-api/optionsorder.md) |
| POST `/api/v1/optionsymbol` | [optionsymbol.md](./data-api/optionsymbol.md) |
| POST `/api/v1/orderbook` | [accounts-api/orderbook.md](accounts-api/orderbook.md) |
| POST `/api/v1/orderstatus` | [orders-api/orderstatus.md](orders-api/orderstatus.md) |
| POST `/api/v1/ping` | [ping.md](./accounts-api/ping.md) |
| POST `/api/v1/placegttorder` | [placegttorder.md](./orders-api/placegttorder.md) |
| POST `/api/v1/placeorder` | [orders-api/placeorder.md](orders-api/placeorder.md) |
| POST `/api/v1/placeprotectedorder` | [placeprotectedorder.md](./orders-api/placeprotectedorder.md) |
| POST `/api/v1/placesmartorder` | [orders-api/placesmartorder.md](orders-api/placesmartorder.md) |
| POST `/api/v1/pnl/symbols` | [pnl-symbols.md](./accounts-api/pnl-symbols.md) |
| POST `/api/v1/positionbook` | [accounts-api/positionbook.md](accounts-api/positionbook.md) |
| POST `/api/v1/positionsopen` | [orders-api/positionsopen.md](orders-api/positionsopen.md) |
| POST `/api/v1/protectedorderbook` | [protectedorderbook.md](./orders-api/protectedorderbook.md) |
| POST `/api/v1/quotes` | [data-api/quotes.md](data-api/quotes.md) |
| POST `/api/v1/recoverprotectedorder` | [recoverprotectedorder.md](./orders-api/recoverprotectedorder.md) |
| POST `/api/v1/search` | [data-api/search.md](data-api/search.md) |
| POST `/api/v1/splitorder` | [orders-api/splitorder.md](orders-api/splitorder.md) |
| GET `/api/v1/strategy/strategies` | [strategy-analytics.md](./accounts-api/strategy-analytics.md) |
| POST `/api/v1/symbol` | [data-api/symbol.md](data-api/symbol.md) |
| POST `/api/v1/syntheticfuture` | [syntheticfuture.md](./accounts-api/syntheticfuture.md) |
| GET `/api/v1/ticker/<string:symbol>` | [data-api/ticker.md](data-api/ticker.md) |
| POST `/api/v1/tradebook` | [accounts-api/tradebook.md](accounts-api/tradebook.md) |
