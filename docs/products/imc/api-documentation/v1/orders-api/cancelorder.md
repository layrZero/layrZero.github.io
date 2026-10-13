# CancelOrder

## POST `/api/v1/cancelorder`


## Endpoint URL

```http
Hosted URL   :  POST https://imc.layr0.org/api/v1/cancelorder
```



## Sample API Request

```json
{
  "apikey": "<your_app_apikey>",
  "strategy": "Test Strategy",
  "orderid": "1000000123665912",
  "expected_mode": "analyze",
  "expected_balance_type": "sandbox",
  "expected_mode_version": 7,
  "request_id": "saved-example-001"
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

## Required mode metadata

Copy the current mode, balance type and version from Funds or Analyzer; the values above are illustrative. A fresh request ID identifies each ordinary operation.

| Field | Required | Meaning |
| --- | --- | --- |
| expected_mode | Yes | Current `live` or `analyze` state |
| expected_balance_type | Yes | Current `live` or `sandbox` balance |
| expected_mode_version | Yes | Current API-key mode version |
| request_id | Yes | Caller-generated operation identifier |

Documentation metadata is prohibited in executable requests. See [request validation](../request-json-validation.md).
