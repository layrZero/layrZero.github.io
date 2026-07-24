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

## WebSocket Reliability

The SDK uses a shared HTTP client for REST calls and can reconnect WebSocket feeds automatically:

```python
client = layr0_imc.api(
    api_key="YOUR_API_KEY",
    ws_url="wss://imc.layr0.org",
    auto_reconnect=True,
)
```

When reconnect succeeds, active LTP, quote, and depth subscriptions are replayed.
