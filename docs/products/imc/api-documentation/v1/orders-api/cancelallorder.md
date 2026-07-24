# CancelAllOrder

## Endpoint URL

```
Hosted URL   :  POST https://imc.layr0.org/api/v1/cancelallorder
```



## Sample API Request

```json
{
"apikey":"<your_app_apikey>",
"strategy":"Test Strategy"
}
```



## Sample API Response

```json
{
  "canceled_orders": [
    "24120600373935",
    "24120600373918",
    "24120600373901",
    "24120600373890"
  ],
  "failed_cancellations": [],
  "message": "Canceled 4 orders. Failed to cancel 0 orders.",
  "status": "success"
}
```

###

## Parameters Description

| Parameters | Description   | Mandatory/Optional | Default Value |
| ---------- | ------------- | ------------------ | ------------- |
| apikey     | App API key   | Mandatory          | -             |
| strategy   | Strategy name | Mandatory          | -             |
