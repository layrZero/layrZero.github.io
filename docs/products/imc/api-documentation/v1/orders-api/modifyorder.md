# ModifyOrder

## POST `/api/v1/modifyorder`


## Endpoint URL

```http
Hosted URL   :  POST https://imc.layr0.org/api/v1/modifyorder
```



## Sample API Request

```json
{
  "apikey": "<your_app_apikey",
  "strategy": "Test Message",
  "symbol": "USDINR15MAR2483CE",
  "action": "BUY",
  "exchange": "CDS",
  "orderid": "240307000562466",
  "product": "NRML",
  "pricetype": "LIMIT",
  "price": "0.0050",
  "quantity": "1",
  "disclosed_quantity": "0",
  "trigger_price": "0",
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-example-001"
}
```



## Sample API Response

```json
{
        "orderid": "240307000562466",
        "status": "success"
}

```



## Parameter Description



| Parameters          | Description        | Mandatory/Optional | Default Value |
| ------------------- | ------------------ | ------------------ | ------------- |
| apikey              | App API key        | Mandatory          | -             |
| strategy            | Strategy name      | Mandatory          | -             |
| symbol              | Trading Symbol     | Mandatory          | -             |
| action              | Action (BUY/SELL)  | Mandatory          | -             |
| exchange            | Exchange           | Mandatory          | -             |
| orderid             | Order ID           | Mandatory          | -             |
| product             | Product type       | Mandatory          | -             |
| pricetype           | Price type         | Mandatory          | -             |
| quantity            | Quantity           | Mandatory          | -             |
| price               | Price              | Mandatory          | 0             |
| trigger\_price      | Trigger price      | Mandatory          | 0             |
| disclosed\_quantity | Disclosed quantity | Mandatory          | 0             |

## Required mode metadata

Copy the current mode, balance type and version from Funds or Analyzer; the values above are illustrative. A fresh request ID identifies each ordinary operation.

| Field | Required | Meaning |
| --- | --- | --- |
| expected_mode | Yes | Current `live` or `analyze` state |
| expected_balance_type | Yes | Current `live` or `sandbox` balance |
| expected_mode_version | Yes | Current API-key mode version |
| request_id | Yes | Caller-generated operation identifier |

Documentation metadata is prohibited in executable requests. See [request validation](../request-json-validation.md).
