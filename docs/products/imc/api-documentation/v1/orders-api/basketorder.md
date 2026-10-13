# BasketOrder

## POST `/api/v1/basketorder`


## Endpoint URL

This API Function Place Basket Orders to the Broker

```http
Hosted URL   :  POST https://imc.layr0.org/api/v1/basketorder
```



## Sample API Request

```json
{
  "apikey": "<your_app_apikey>",
  "strategy": "your-strategy",
  "orders": [
    {
      "symbol": "RELIANCE",
      "exchange": "NSE",
      "action": "BUY",
      "quantity": "1",
      "pricetype": "MARKET",
      "product": "MIS"
    },
    {
      "symbol": "INFY",
      "exchange": "NSE",
      "action": "SELL",
      "quantity": "1",
      "pricetype": "MARKET",
      "product": "MIS"
    }
  ],
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-example-001"
}
```

###

## Sample API Response

```json
{
  "results": [
    {
      "orderid": "24120900343250",
      "status": "success",
      "symbol": "INFY"
    },
    {
      "orderid": "24120900343249",
      "status": "success",
      "symbol": "RELIANCE"
    }
  ],
  "status": "success"
}
```

###

## Parameter Description



| Parameters          | Description        | Mandatory/Optional | Default Value |
| ------------------- | ------------------ | ------------------ | ------------- |
| apikey              | App API key        | Mandatory          | -             |
| strategy            | Strategy name      | Mandatory          | -             |
| exchange            | Exchange code      | Mandatory          | -             |
| symbol              | Trading symbol     | Mandatory          | -             |
| action              | Action (BUY/SELL)  | Mandatory          | -             |
| product             | Product type       | Optional           | MIS           |
| pricetype           | Price type         | Optional           | MARKET        |
| quantity            | Quantity           | Mandatory          | -             |
| price               | Price              | Optional           | 0             |
| trigger\_price      | Trigger price      | Optional           | 0             |
| disclosed\_quantity | Disclosed quantity | Optional           | 0             |

## Required mode metadata

Copy the current mode, balance type and version from Funds or Analyzer; the values above are illustrative. A fresh request ID identifies each ordinary operation.

| Field | Required | Meaning |
| --- | --- | --- |
| expected_mode | Yes | Current `live` or `analyze` state |
| expected_balance_type | Yes | Current `live` or `sandbox` balance |
| expected_mode_version | Yes | Current API-key mode version |
| request_id | Yes | Caller-generated operation identifier |

Documentation metadata is prohibited in executable requests. See [request validation](../request-json-validation.md).
