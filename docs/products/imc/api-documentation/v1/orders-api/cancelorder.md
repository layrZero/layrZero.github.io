# CancelOrder

## Endpoint URL

```http
Hosted URL   :  POST https://imc.layr0.org/api/v1/cancelorder
```



## Sample API Request

```json

{
    "apikey": "<your_app_apikey>",
    "strategy": "Test Strategy",
    "orderid": "1000000123665912"
}
```



## Sample API Response

```json

{
        "orderid": "1000000123665912",
        "status": "success"
}

```

###

## Parameters Description

| Parameters | Description   | Mandatory/Optional | Default Value |
| ---------- | ------------- | ------------------ | ------------- |
| apikey     | App API key   | Mandatory          | -             |
| strategy   | Strategy name | Mandatory          | -             |
| orderid    | Order Id      | Mandatory          | -             |
