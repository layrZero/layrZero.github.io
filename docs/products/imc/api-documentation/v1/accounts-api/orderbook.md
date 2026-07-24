# Orderbook

## Endpoint URL

This API Function fetches the Orderbook details from the broker with basic orderbook statistics

```http
Hosted URL   :  POST https://imc.layr0.org/api/v1/orderbook
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
  "data": {
    "orders": [
      {
        "action": "SELL",
        "exchange": "NSE",
        "order_status": "complete",
        "orderid": "24120900000213",
        "price": 1500,
        "pricetype": "LIMIT",
        "product": "MIS",
        "quantity": 5,
        "symbol": "INFY",
        "timestamp": "09-Dec-2024 09:44:09",
        "trigger_price": 0
      },
      {
        "action": "BUY",
        "exchange": "NSE",
        "order_status": "complete",
        "orderid": "24120900000212",
        "price": 0,
        "pricetype": "MARKET",
        "product": "MIS",
        "quantity": 10,
        "symbol": "RELIANCE",
        "timestamp": "09-Dec-2024 09:44:09",
        "trigger_price": 0
      }
    
     
    ],
    "statistics": {
      "total_buy_orders": 1,
      "total_completed_orders": 2,
      "total_open_orders": 0,
      "total_rejected_orders": 0,
      "total_sell_orders": 1
    }
  },
  "status": "success"
}
```



## Request Body



| Parameters | Description | Mandatory/Optional | Default Value |
| ---------- | ----------- | ------------------ | ------------- |
| apikey     | App API key | Mandatory          | -             |



