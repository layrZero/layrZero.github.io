# ClosePosition

`POST /api/v1/closeposition` closes broker-side exposure for a submitted strategy.

After a successful close request, callers should verify exposure with `POST /api/v1/positionsopen`. A `positionsopen` response with `quantity = 0` is zero-exposure proof. A `closeposition` response with `NO_STRATEGY_EXPOSURE` is also zero-exposure proof.

## Endpoint URL

```
Local Host   :  POST http://127.0.0.1:5000/api/v1/closeposition
Ngrok Domain :  POST https://<your-ngrok-domain>.ngrok-free.app/api/v1/closeposition
Custom Domain:  POST https://<your-custom-domain>/api/v1/closeposition
```



## Sample API Request

```json
{
  "apikey": "<your_app_apikey>",
  "strategy": "Test Strategy",
  "expected_mode": "live",
  "expected_balance_type": "live",
  "expected_mode_version": 7,
  "request_id": "close-001"
}
```



## Sample API Response

```json
{
  "message": "All Open Positions SquaredOff",
  "status": "success"
}
```

###

## Parameters Description

| Parameters | Description   | Mandatory/Optional | Default Value |
| ---------- | ------------- | ------------------ | ------------- |
| apikey     | App API key   | Mandatory          | -             |
| strategy   | Strategy name | Mandatory          | -             |
| expected_mode | Client mode snapshot | Mandatory | - |
| expected_balance_type | Client balance type snapshot | Mandatory | - |
| expected_mode_version | Client mode version snapshot | Mandatory | - |
| request_id | Unique request id | Mandatory | - |
