# WebSockets

IMC exposes a WebSocket proxy for real-time market data.

```text
wss://imc.layr0.org
```

Use the hosted `wss://imc.layr0.org` endpoint for WebSocket clients.

## Authentication

Every WebSocket session must authenticate first:

```json
{
  "action": "authenticate",
  "api_key": "YOUR_IMC_API_KEY"
}
```

## Modes

| Mode | Stream | Description |
| --- | --- | --- |
| `1` | LTP | Last traded price and timestamp. |
| `2` | Quote | OHLC, LTP, volume, change, and related quote fields. |
| `3` | Depth | Buy/sell depth, subject to broker support. |

## Subscribe

Single-symbol form:

```json
{
  "action": "subscribe",
  "symbol": "RELIANCE",
  "exchange": "NSE",
  "mode": 1
}
```

Bulk form:

```json
{
  "action": "subscribe",
  "symbols": [
    {"symbol": "RELIANCE", "exchange": "NSE"},
    {"symbol": "SBIN", "exchange": "NSE"}
  ],
  "mode": 1,
  "depth": 5
}
```

## Unsubscribe

```json
{
  "action": "unsubscribe",
  "symbols": [
    {"symbol": "RELIANCE", "exchange": "NSE", "mode": 1}
  ]
}
```

## SDK Reconnect Behavior

The Python SDK stores active subscriptions by mode. If the WebSocket disconnects unexpectedly and `auto_reconnect=True`, the SDK reconnects, re-authenticates, and replays the active subscriptions.

Calling `disconnect()` is treated as intentional shutdown and does not trigger reconnect.
