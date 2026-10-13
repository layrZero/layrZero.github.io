# Complete endpoint reference

Offline source audit: IMC baseline `ec9832a7bd461e07115315f990374e9c2450a0f1` with the endpoint-wiring working-tree corrections. This reference is not a claim of deployed broker verification.

Base URL: `https://imc.layr0.org`. Trading and mode-sensitive operations require current mode metadata. All JSON requests reject documentation fields recursively. See [request validation](request-json-validation.md) and [mode requirements](authentication-and-mode-preconditions.md).

## Methods, authentication and request fields

| Method / URL | Authentication | Required request fields | Optional fields and defaults |
| --- | --- | --- | --- |
| POST `/api/v1/analyzer` | apikey JSON; identity checked in route/service | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/analyzer/toggle` | apikey JSON; identity checked in route/service | `apikey` (String), `mode` (Boolean) | None in declared schema; query options may apply |
| POST `/api/v1/basketorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `orders` (List) | None in declared schema; query options may apply |
| POST `/api/v1/brokers/active` | application Authorization header (AUTH_MAGIC_KEY) plus apikey JSON | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/cancelallorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String) | `strategy` (String = null) |
| POST `/api/v1/cancelgttorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `trigger_id` (String) | None in declared schema; query options may apply |
| POST `/api/v1/cancelorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `orderid` (String) | None in declared schema; query options may apply |
| POST `/api/v1/cancelprotectedorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `protected_order_id` (String) | None in declared schema; query options may apply |
| GET `/api/v1/chart` | apikey query | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/chart` | apikey JSON; identity checked in route/service | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/closeposition` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String) | `strategy` (String = null) |
| POST `/api/v1/ddpistatus` | apikey JSON; identity checked in route/service | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/depth` | apikey JSON; identity checked in route/service | `apikey` (String), `symbol` (String), `exchange` (String) | None in declared schema; query options may apply |
| POST `/api/v1/expiry` | apikey JSON; identity checked in route/service | `apikey` (String), `symbol` (String), `exchange` (String), `instrumenttype` (String) | None in declared schema; query options may apply |
| POST `/api/v1/funds` | apikey JSON; identity checked in route/service | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/gttorderbook` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/history` | apikey JSON; identity checked in route/service | `apikey` (String), `symbol` (String), `exchange` (String), `interval` (String), `start_date` (Date), `end_date` (Date) | None in declared schema; query options may apply |
| POST `/api/v1/holdings` | apikey JSON; identity checked in route/service | `apikey` (String) | `strategy` (String) |
| GET `/api/v1/instruments` | apikey query | `apikey` (String) | `exchange` (String), `format` (String) |
| POST `/api/v1/intervals` | apikey JSON; identity checked in route/service | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/margin` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `positions` (List) | None in declared schema; query options may apply |
| POST `/api/v1/market/holidays` | apikey schema-required; calendar service does not verify identity | `apikey` (String) | `year` (Integer) |
| POST `/api/v1/market/timings` | apikey schema-required; calendar service does not verify identity | `apikey` (String), `date` (String) | None in declared schema; query options may apply |
| POST `/api/v1/modifygttorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `trigger_type` (String), `exchange` (String), `symbol` (String), `action` (String), `product` (String), `quantity` (Float), `price` (Float), `trigger_id` (String) | `pricetype` (String = "LIMIT"), `triggerprice_sl` (Float = 0.0), `triggerprice_tg` (Float = 0.0), `stoploss` (Float = null), `target` (Float = null) |
| POST `/api/v1/modifyorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `exchange` (String), `symbol` (String), `orderid` (String), `action` (String), `product` (String), `pricetype` (String), `price` (Float), `quantity` (Integer), `disclosed_quantity` (Integer), `trigger_price` (Float) | None in declared schema; query options may apply |
| POST `/api/v1/modifyprotectedorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `protected_order_id` (String), `target_trigger` (Float), `target_limit` (Float), `stoploss_trigger` (Float), `stoploss_limit` (Float) | `trailing_jump` (Float) |
| POST `/api/v1/multiquotes` | apikey JSON; identity checked in route/service | `apikey` (String), `symbols` (List) | None in declared schema; query options may apply |
| POST `/api/v1/optionchain` | apikey JSON; identity checked in route/service | `apikey` (String), `underlying` (String), `exchange` (String), `expiry_date` (String) | `strike_count` (Integer) |
| POST `/api/v1/optiongreeks` | apikey JSON; identity checked in route/service | `apikey` (String), `symbol` (String), `exchange` (String) | `interest_rate` (Float), `forward_price` (Float), `underlying_symbol` (String), `underlying_exchange` (String), `expiry_time` (String) |
| POST `/api/v1/optionsmultiorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `underlying` (String), `exchange` (String), `legs` (List) | `expiry_date` (String), `strike_int` (Integer) |
| POST `/api/v1/optionsorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `underlying` (String), `exchange` (String), `offset` (String), `option_type` (String), `action` (String), `quantity` (Integer), `position_size` (Integer) | `expiry_date` (String), `strike_int` (Integer), `splitsize` (Integer = 0), `pricetype` (String = "MARKET"), `product` (String = "MIS"), `price` (Float = 0.0), `trigger_price` (Float = 0.0), `disclosed_quantity` (Integer = 0) |
| POST `/api/v1/optionsymbol` | apikey JSON; identity checked in route/service | `apikey` (String), `underlying` (String), `exchange` (String), `offset` (String), `option_type` (String) | `strategy` (String), `expiry_date` (String), `strike_int` (Integer) |
| POST `/api/v1/orderbook` | apikey JSON; identity checked in route/service | `apikey` (String) | `strategy` (String) |
| POST `/api/v1/orderstatus` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `orderid` (String) | None in declared schema; query options may apply |
| POST `/api/v1/ping` | apikey JSON; identity checked in route/service | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/placegttorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `trigger_type` (String), `exchange` (String), `symbol` (String), `action` (String), `product` (String), `quantity` (Float), `price` (Float) | `pricetype` (String = "LIMIT"), `triggerprice_sl` (Float = 0.0), `triggerprice_tg` (Float = 0.0), `stoploss` (Float = null), `target` (Float = null), `expires_at` (String = null) |
| POST `/api/v1/placeorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `exchange` (String), `symbol` (String), `action` (String), `quantity` (Integer) | `pricetype` (String = "MARKET"), `product` (String = "MIS"), `price` (Float = 0.0), `trigger_price` (Float = 0.0), `disclosed_quantity` (Integer = 0), `underlying_ltp` (Float = null) |
| POST `/api/v1/placeprotectedorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `exchange` (String), `symbol` (String), `action` (String), `quantity` (Integer), `product` (String), `entry_pricetype` (String), `entry_price` (Float), `target_trigger` (Float), `target_limit` (Float), `stoploss_trigger` (Float), `stoploss_limit` (Float) | `order_system` (String = null), `trailing_jump` (Float = 0) |
| POST `/api/v1/placesmartorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `exchange` (String), `symbol` (String), `action` (String), `quantity` (Integer), `position_size` (Integer) | `pricetype` (String = "MARKET"), `product` (String = "MIS"), `price` (Float = 0.0), `trigger_price` (Float = 0.0), `disclosed_quantity` (Integer = 0) |
| POST `/api/v1/pnl/symbols` | apikey JSON; identity checked in route/service | `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/positionbook` | apikey JSON; identity checked in route/service | `apikey` (String) | `strategy` (String) |
| POST `/api/v1/positionsopen` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `symbol` (String), `exchange` (String), `product` (String) | None in declared schema; query options may apply |
| POST `/api/v1/protectedorderbook` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String) | None in declared schema; query options may apply |
| POST `/api/v1/quotes` | apikey JSON; identity checked in route/service | `apikey` (String), `symbol` (String), `exchange` (String) | None in declared schema; query options may apply |
| POST `/api/v1/recoverprotectedorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `protected_order_id` (String) | None in declared schema; query options may apply |
| POST `/api/v1/search` | apikey JSON; identity checked in route/service | `apikey` (String), `query` (String) | `exchange` (String) |
| POST `/api/v1/splitorder` | apikey JSON; identity checked in route/service | `expected_mode` (String), `expected_balance_type` (String), `expected_mode_version` (Integer), `request_id` (String), `apikey` (String), `strategy` (String), `exchange` (String), `symbol` (String), `action` (String), `quantity` (Integer), `splitsize` (Integer) | `pricetype` (String = "MARKET"), `product` (String = "MIS"), `price` (Float = 0.0), `trigger_price` (Float = 0.0), `disclosed_quantity` (Integer = 0) |
| GET `/api/v1/strategy/strategies` | X-Layr0-Api-Key or apikey header | Handler-specific filters; see details below | None in declared schema; query options may apply |
| POST `/api/v1/symbol` | apikey JSON; identity checked in route/service | `apikey` (String), `symbol` (String), `exchange` (String) | None in declared schema; query options may apply |
| POST `/api/v1/syntheticfuture` | apikey JSON; identity checked in route/service | `apikey` (String), `underlying` (String), `exchange` (String), `expiry_date` (String) | None in declared schema; query options may apply |
| GET `/api/v1/ticker/<string:symbol>` | X-API-KEY header or apikey query | `apikey` (String), `interval` (String), `from` (Date), `to` (Date) | None in declared schema; query options may apply |
| POST `/api/v1/tradebook` | apikey JSON; identity checked in route/service | `apikey` (String) | `strategy` (String) |

## Response and capability contracts

- Ordinary order placement returns `status` and broker `orderid`; BasketOrder/SplitOrder/options multi-order retain per-order or per-leg results. Errors retain endpoint-specific fields. Composite operations execute under one parent mode lease.
- Account books return `status` with endpoint-specific `data`; Funds/Analyzer additionally provide current mode/balance/version metadata. Never substitute a default mode snapshot for missing server evidence.
- Market-data and options helper APIs retain their existing quote/history/chain/symbol/Greek structures. Ticker also supports text output; Instruments supports JSON/CSV. Consult the dedicated data pages and use current broker instrument identities.
- GTT retains existing legacy envelopes. Upstox protective-only OCO remains unsupported; its native MULTIPLE workflow uses protected entry. Dhan new placements use explicit Super intent. See [GTT/options contracts](./orders-api/options-and-gtt.md), [Dhan Super](./orders-api/dhan-super-orders.md), and [protected orders](./orders-api/protected-orders.md).
- Protected book remains non-billable; protected placement/recovery use durable identity and contract-v2 fill evidence. Acceptance, trigger IDs, missing orders or zero exposure must not be interpreted as completed fills.
- Analytics endpoints return account-scoped strategy/P&L data. Strategy analytics authenticates via `X-Layr0-Api-Key` or `apikey` headers. Effective filters vary by mode and orderType; Live unified pagination metadata does not slice results. See the [dedicated strategy analytics contract](./accounts-api/strategy-analytics.md).
- Calendar requests require an `apikey` field syntactically; the current calendar service does not validate its identity and does not access a broker account. This documented limitation must not be interpreted as authenticated account evidence.
- Source registration roster: Dhan, Upstox, Zerodha and FYERS. Adapter existence does not establish support for every operation or production broker eligibility. Unsupported capabilities must remain explicit errors.

## GET and dynamic preference details

`GET /api/v1/instruments` uses query `apikey`, optional `exchange`, and `format` (json/csv). `GET /api/v1/chart` uses query `apikey`; POST chart accepts authenticated preference fields and preserves existing custom preferences except forbidden documentation fields. `GET /api/v1/ticker/{symbol}` uses `exchange:symbol`, `X-API-KEY` or query `apikey`, date bounds `from`/`to`, and interval/format options documented in the [Ticker guide](data-api/ticker.md).

## Errors and verification limits

Schema errors are `400`; forbidden documentation fields are `400/FORBIDDEN_JSON_FIELD`; missing service mode requirements are `428`; stale/conflicting modes are `409`. Missing/invalid credentials, unavailable auth and broker failures retain endpoint-specific `401/403/503/5xx` semantics. See [HTTP status codes](http-status-codes.md). No automatic trading retry is implied.

The JSON contract snapshot is available as `/imc-endpoint-contract.json`. Source registration, mock dispatch and schema checks are offline evidence; live sessions, optional management subsystems and broker execution remain runtime pending.

Broker discovery also requires application Authorization supplied by the authorized caller. Playground never fetches this server secret; an authorized operator can enter it explicitly in the Headers tab. P&L symbols is Analyze-only.

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
