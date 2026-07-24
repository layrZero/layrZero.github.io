# Excel

## Layr0 IMC Excel Documentation

### Introduction

Layr0 IMC provides seamless integration with Excel for executing trading strategies, fetching market data, and managing orders. This documentation covers the available Excel functions, their usage, and examples.



## Install the Layr0 IMC - Excel Addins

Before installing Layr0 IMC Excel Add-In, **ensure you are selecting the correct version** based on your Excel installation.

#### **📌 Steps to Check Your Excel Version**

1. **Open Microsoft Excel**
2. Click **File** → **Account**
3. Click **About Excel**
4. Look for **"32-bit"** or **"64-bit"** in the version details.

#### **🔹 Which Version Should You Install?**

* **If your Excel version is 64-bit → Install the 64-bit add-in** ✅ _(Recommended)_
* **If your Excel version is 32-bit → Install the 32-bit add-in** ✅

**Download the Layr0 IMC Excel Addin**



[Get the Layr0 Excel plugin installer](https://github.com/layr0/Layr0 IMC-Excel/releases)

### **⚠ .NET 6 Desktop Runtime is Required**

Layr0 IMC Excel Add-In is built using **Excel-DNA**, which requires the **.NET 6 Desktop Runtime** to run add-ins.

🔹 **If the add-in is not working or Excel does not recognize it, install the .NET 6 Desktop Runtime** from the link below:

➡ [**Download .NET 6 Desktop Runtime**](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)

✅ **After installing the runtime, restart your system and try loading the add-in again.**

***



### Configuration

#### Setting API Key, Version, and Host URL

**Function:** `oa_api(api_key, [version], [host_url])`

**Example Usage:**

```excel
=oa_api("your_api_key")
=oa_api("your_api_key", "v1", "https://imc.layr0.org")
```

**Parameters:**

* `api_key` (Mandatory): API Key for authentication
* `version` (Optional, default: "v1"): API version
* `host_url` (Optional, default: "[https://imc.layr0.org](https://imc.layr0.org/)"): API host URL

***

### Account Functions

#### Retrieve Funds

**Function:** `oa_funds()`

**Example Usage:**

```excel
=oa_funds()
```

**Returns:** A table with available funds and collateral details.

***

#### Retrieve Order Book

**Function:** `oa_orderbook()`

**Example Usage:**

```excel
=oa_orderbook()
```

**Returns:** A table with all open orders.

***

#### Retrieve Trade Book

**Function:** `oa_tradebook()`

**Example Usage:**

```excel
=oa_tradebook()
```

**Returns:** A table with executed trades.

***

### Market Data Functions

#### Get Market Quotes

**Function:** `oa_quotes(symbol, exchange)`

**Example Usage:**

```excel
=oa_quotes("RELIANCE", "NSE")
```

**Returns:** Market price details for the given symbol.

***

#### Get Market Depth

**Function:** `oa_depth(symbol, exchange)`

**Example Usage:**

```excel
=oa_depth("RELIANCE", "NSE")
```

**Returns:** Order book depth for buy/sell levels.

***

#### Fetch Historical Data

**Function:** `oa_history(symbol, exchange, interval, start_date, end_date)`

**Example Usage:**

```excel
=oa_history("RELIANCE", "NSE", "1m", "2024-12-01", "2024-12-31")
```

**Returns:** Historical market data in a table format.

***

### Order Functions

#### Place an Order

**Function:** `oa_placeorder(strategy, symbol, action, exchange, pricetype, product, [quantity], [price], [trigger_price], [disclosed_quantity])`

**Example Usage:**

```excel
=oa_placeorder("MyStrategy", "INFY", "BUY", "NSE", "LIMIT", "MIS", 10, 1500, 0, 0)
```

**Parameters:**

* Mandatory: `strategy`, `symbol`, `action`, `exchange`, `pricetype`, `product`
* Optional: `quantity`, `price`, `trigger_price`, `disclosed_quantity`

***

#### Place a Smart Order

**Function:** `oa_placesmartorder(strategy, symbol, action, exchange, pricetype, product, [quantity], [position_size], [price], [trigger_price], [disclosed_quantity])`

**Example Usage:**

```excel
=oa_placesmartorder("SmartStrat", "INFY", "BUY", "NSE", "MARKET", "MIS", 10, "", 0, 0, 0)
```

***

#### Modify an Order

**Function:** `oa_modifyorder(orderid, strategy, symbol, action, exchange, [quantity], [pricetype], [product], [price], [trigger_price], [disclosed_quantity])`

**Example Usage:**

```excel
=oa_modifyorder("Strategy", "241700000023457", "RELIANCE", "BUY", "NSE", 1, "LIMIT", "MIS", 2500, 0, 0)
```

***

#### Cancel an Order

**Function:** `oa_cancelorder(orderid, strategy)`

**Example Usage:**

```excel
=oa_cancelorder("Strategy", "241700000023457")
```

***

#### Close All Open Positions

**Function:** `oa_closeposition(strategy)`

**Example Usage:**

```excel
=oa_closeposition("MyStrategy")
```

***

#### Get Order Status

**Function:** `oa_orderstatus(orderid, strategy)`

**Example Usage:**

```excel
=oa_orderstatus("MyStrategy", "241700000023457")
```

***

#### Open a Position

**Function:** `oa_positionsopen(strategy, symbol, exchange, product)`

**Example Usage:**

```excel
=oa_positionsopen("MyStrategy", "INFY", "NSE", "MIS")
```

***

### Notes

* Test in **Layr0 IMC Analyzer Mode** before using in live markets.

### Support

For more details, visit the [IMC product documentation](../).
