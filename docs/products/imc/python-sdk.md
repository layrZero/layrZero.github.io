# Python SDK

The public Python SDK package is `layr0-IMC` and the import package is `layr0_imc`.

```bash
pip install layr0-IMC
```

```python
import layr0_imc

client = layr0_imc.api(
    api_key="YOUR_API_KEY",
    host="https://imc.layr0.org",
)
```

## PositionsOpen

Use `positionsopen` for strategy exposure reconciliation.

```python
result = client.positionsopen(
    strategy="Test Strategy",
    symbol="SBIN",
    exchange="NSE",
    product="CNC",
    expected_mode="live",
    expected_balance_type="live",
    expected_mode_version=7,
    request_id="positionsopen-001",
)
```

There is no legacy open-position method in the IMC SDK.

## Close Reconciliation

```python
close_result = client.closeposition(
    strategy="Test Strategy",
    expected_mode="live",
    expected_balance_type="live",
    expected_mode_version=7,
    request_id="close-001",
)

verify = client.positionsopen(
    strategy="Test Strategy",
    symbol="SBIN",
    exchange="NSE",
    product="CNC",
    expected_mode="live",
    expected_balance_type="live",
    expected_mode_version=7,
    request_id="close-verify-001",
)
```

`verify["quantity"] == 0` means the strategy is flat for the submitted symbol/product.

## WebSocket connection

The REST protected-order update does not change WebSocket behavior. Configure the feed URL and call the existing explicit connect method:

```python
client = layr0_imc.api(api_key="YOUR_API_KEY", ws_url="wss://YOUR_IMC_WEBSOCKET_HOST")
connected = client.connect()
```

The client constructor has no `auto_reconnect` parameter; automatic reconnect is not introduced by this release.

## Upcoming protected-order release

SDK baseline 1.1.5; protected APIs in SDK 1.2.0, verified against IMC `a995f3e` (contract v2 originated at `364acaf`). Production registration for this release: Dhan, Upstox, Zerodha and FYERS. Angel One is blocked in development and production. See [release and migration details](releases/protected-order-release.md). These feature branches are not yet published or deployed.

See [protected API method signatures and examples](api-documentation/v1/protected-orders.md), [DDPI status](api-documentation/v1/ddpi-status.md), and [Dhan Super Orders](api-documentation/v1/dhan-super-orders.md).
