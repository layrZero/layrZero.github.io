# PositionsOpen

`POST /api/v1/positionsopen` is the read-only reconciliation endpoint for strategy exposure.

It is used after `closeposition` and during lifecycle checks to confirm whether a strategy still has broker-side exposure for a symbol/product. It does not place an order, does not close a position, and does not create a protected mode lease.

## Endpoint URL

```http
POST http://127.0.0.1:5000/api/v1/positionsopen
POST https://<your-ngrok-domain>.ngrok-free.app/api/v1/positionsopen
POST https://<your-custom-domain>/api/v1/positionsopen
```

## Request

```json
{
  "apikey": "<your_app_apikey>",
  "strategy": "Test Strategy",
  "symbol": "SBIN",
  "exchange": "NSE",
  "product": "CNC",
  "expected_mode": "live",
  "expected_balance_type": "live",
  "expected_mode_version": 7,
  "request_id": "close-check-001"
}
```

## Success Response

```json
{
  "status": "success",
  "quantity": 0
}
```

`quantity = 0` is zero-exposure proof for the submitted strategy, symbol, exchange, and product.

## Parameters

| Parameter | Required | Description |
| --- | --- | --- |
| `apikey` | Yes | IMC API key. |
| `strategy` | Yes | Strategy name used when the position was opened. |
| `symbol` | Yes | Trading symbol. |
| `exchange` | Yes | Exchange code such as `NSE`, `BSE`, `NFO`, or `MCX`. |
| `product` | Yes | Broker product such as `CNC`, `MIS`, or `NRML`. |
| `expected_mode` | Yes | Client's current mode snapshot, usually `live` or `analyze`. |
| `expected_balance_type` | Yes | Client's current balance type, usually `live` or `sandbox`. |
| `expected_mode_version` | Yes | Mode version returned by the latest mode-aware API response. |
| `request_id` | Yes | Caller-generated idempotency/correlation id for this reconciliation read. |

## Mode Safety

`positionsopen` validates API key identity and the mode precondition fields before reading exposure. If the submitted mode snapshot is missing or stale, IMC returns the same mode safety errors used by protected trading endpoints:

```json
{
  "status": "error",
  "error_code": "MODE_PRECONDITION_REQUIRED",
  "message": "Mode precondition required"
}
```

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

Unlike write endpoints, this endpoint does not acquire or release an `ApiKeyModeLease`.
