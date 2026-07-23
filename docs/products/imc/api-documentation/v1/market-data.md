# Market Data

IMC provides REST and WebSocket market data.

## REST Endpoints

- `quotes`
- `multiquotes`
- `depth`
- `history`
- `intervals`
- `symbol`
- `search`
- `expiry`
- `ticker`
- `instruments`
- `chart`
- `market/holidays`
- `market/timings`

REST market data calls use the same `apikey` request field as trading calls.

## WebSocket Data

Use the IMC WebSocket proxy for streaming:

- mode `1`: LTP
- mode `2`: quote
- mode `3`: depth

The Python SDK can reconnect and replay active subscriptions after transient WebSocket disconnects.
