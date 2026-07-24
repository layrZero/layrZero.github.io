# PositionBook

## Endpoint URL

This API Function fetches the PositionBook details from the broker

```http
Hosted URL   :  POST https://imc.layr0.org/api/v1/positionbook
```



## Sample API Request

```json
{
    "apikey": "<your_app_apikey>"
}

```



## Sample API Response

```json
{
  "data": [
    {
      "average_price": "0.00",
      "exchange": "NSE",
      "product": "MIS",
      "quantity": 0,
      "symbol": "YESBANK"
    },
    {
      "average_price": "0.00",
      "exchange": "NSE",
      "product": "MIS",
      "quantity": -1,
      "symbol": "INFY"
    },
    {
      "average_price": "0.00",
      "exchange": "NSE",
      "product": "MIS",
      "quantity": 1,
      "symbol": "RELIANCE"
    }
  ],
  "status": "success"
}
```



## Request Body



| Parameters | Description | Mandatory/Optional | Default Value |
| ---------- | ----------- | ------------------ | ------------- |
| apikey     | App API key | Mandatory          | -             |



