# What is Layr0 India Market Connector?

Layr0 India Market Connector (IMC) is a self-hosted broker gateway for Indian market automation. It gives trading apps, scripts, and internal tools one local REST and WebSocket interface while the connector handles broker-specific order routing, analyzer mode, account reads, market data, and strategy reconciliation.

IMC is designed for local-first control. You run the connector, connect the broker account, generate an API key, and call `http://127.0.0.1:5000/api/v1/...` from your app or automation code.

## Core Capabilities

- REST APIs for order placement, modification, cancellation, close-by-strategy, order status, funds, holdings, position book, trade book, market data, options, GTT, and strategy analytics.
- WebSocket market data for LTP, quote, and depth streams through the IMC WebSocket proxy.
- Analyzer mode for broker-key scoped simulated execution, with live/analyze mode metadata returned to API clients.
- Protected mode preconditions for trading/write endpoints so a client cannot unknowingly trade after the server mode changes.
- Read-only reconciliation through `positionsopen`, which verifies strategy exposure without creating a protected mode lease.
- Python SDK support through the public `layr0-IMC` package.

## Typical Flow

1. Start the IMC server locally or on your own host.
2. Connect and authenticate the broker from the IMC UI.
3. Generate an API key for the selected broker account.
4. Read account/mode context from APIs such as `funds` or analyzer status.
5. Send trading requests with the returned mode precondition fields.
6. Verify orders using `orderstatus` and verify close lifecycle using `positionsopen`.

## Safety Model

IMC separates read paths from write paths:

- Trading/write endpoints use protected mode leases.
- Reconciliation reads such as `positionsopen` are mode-checked but do not create leases.
- If the server mode changed after the client's last snapshot, IMC returns `SERVER_MODE_SWITCH_DETECTED`.
- If required mode fields are missing, IMC returns `MODE_PRECONDITION_REQUIRED`.

## Public SDK

Install the SDK:

```bash
pip install layr0-IMC
```

Use the SDK:

```python
import layr0_imc

client = layr0_imc.api(
    api_key="YOUR_API_KEY",
    host="http://127.0.0.1:5000",
)

funds = client.funds()
print(funds)
```
