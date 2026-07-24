# NodeJS

To install the Layr0 IMC Node.js library, use npm:

```bash
npm install Layr0 IMC
```

## Layr0 IMC Node.js Library Documentation

### Get the Layr0 IMC API Key

Make sure that your Layr0 IMC Application is running. Login to the Layr0 IMC Application with valid credentials and get the Layr0 IMC API key.

\
For detailed function parameters, refer to the [IMC API Documentation](../api-documentation/v1/).

### Getting Started with Layr0 IMC

First, import the Layr0 IMC class from the library and initialize it with your API key:

```javascript
import Layr0 IMC from 'Layr0 IMC';

// Replace 'YOUR_API_KEY' with your actual API key
// Specify the host URL with your hosted domain or ngrok domain.
// If running locally in Windows then use the default host value.
const Layr0 IMC = new Layr0 IMC('YOUR_API_KEY', 'https://imc.layr0.org');
```

### Check Layr0 IMC Version

```javascript
import { version } from 'Layr0 IMC';
console.log(version);
```

### PlaceOrder Example

To place a new order:

```javascript
const response = await Layr0 IMC.placeOrder({
    strategy: "NodeJS",
    symbol: "RELIANCE", 
    action: "BUY",
    exchange: "NSE",
    pricetype: "MARKET",
    product: "MIS",
    quantity: 1
});
console.log(response);
```

### PlaceSmartOrder Example

To place a smart order considering the current position size:

```javascript
const response = await Layr0 IMC.placeSmartOrder({
    strategy: "NodeJS",
    symbol: "TATAMOTORS",
    action: "SELL",
    exchange: "NSE",
    pricetype: "MARKET",
    product: "MIS",
    quantity: 1,
    positionSize: 5
});
console.log(response);
```

### BasketOrder Example

To place a new basket order:

```javascript
const basketOrders = [
    {
        symbol: "RELIANCE",
        exchange: "NSE",
        action: "BUY",
        quantity: 1,
        pricetype: "MARKET",
        product: "MIS"
    },
    {
        symbol: "INFY",
        exchange: "NSE",
        action: "SELL",
        quantity: 1,
        pricetype: "MARKET",
        product: "MIS"
    }
];

const response = await Layr0 IMC.basketOrder({
    strategy: "NodeJS",
    orders: basketOrders
});
console.log(response);
```

### SplitOrder Example

To place a new split order:

```javascript
const response = await Layr0 IMC.splitOrder({
    symbol: "YESBANK",
    exchange: "NSE",
    action: "SELL",
    quantity: 105,
    splitSize: 20,
    pricetype: "MARKET",
    product: "MIS",
    strategy: "NodeJS"
});
console.log(response);
```

### ModifyOrder Example

To modify an existing order:

```javascript
const response = await Layr0 IMC.modifyOrder({
    orderId: "123456789",
    strategy: "NodeJS",
    symbol: "INFY",
    action: "SELL",
    exchange: "NSE",
    pricetype: "LIMIT",
    product: "CNC",
    quantity: 2,
    price: 1900
});
console.log(response);
```

### CancelOrder Example

To cancel an existing order:

```javascript
const response = await Layr0 IMC.cancelOrder({
    orderId: "123456789",
    strategy: "NodeJS"
});
console.log(response);
```

### CancelAllOrder Example

To cancel all open orders and trigger pending orders:

```javascript
const response = await Layr0 IMC.cancelAllOrder({
    strategy: "NodeJS"
});
console.log(response);
```

### ClosePosition Example

To close all open positions across various exchanges:

```javascript
const response = await Layr0 IMC.closePosition({
    strategy: "NodeJS"
});
console.log(response);
```

### OrderStatus Example

To get the current order status:

```javascript
const response = await Layr0 IMC.orderStatus({
    orderId: "123456789",
    strategy: "NodeJS"
});
console.log(response);
```

### positionsopen Example

To get the current open position:

```javascript
const response = await Layr0 IMC.positionsopen({
    strategy: "NodeJS",
    symbol: "YESBANK",
    exchange: "NSE",
    product: "CNC"
});
console.log(response);
```

### Quotes Example

To get real-time quotes:

```javascript
const response = await Layr0 IMC.quotes({
    symbol: "RELIANCE", 
    exchange: "NSE"
});
console.log(response);
```

### Depth Example

To get market depth data:

```javascript
const response = await Layr0 IMC.depth({
    symbol: "SBIN", 
    exchange: "NSE"
});
console.log(response);
```

### History Example

To get historical data:

```javascript
const response = await Layr0 IMC.history({
    symbol: "SBIN",
    exchange: "NSE",
    interval: "5m",
    startDate: "2025-01-01",
    endDate: "2025-01-05"
});
console.log(response);
```

### Intervals Example

To get supported time intervals:

```javascript
const response = await Layr0 IMC.intervals();
console.log(response);
```

### Symbol Example

To get symbol information:

```javascript
const response = await Layr0 IMC.symbol({
    symbol: "RELIANCE",
    exchange: "NSE"
});
console.log(response);
```

### Funds Example

To get account funds information:

```javascript
const response = await Layr0 IMC.funds();
console.log(response);
```

### OrderBook Example

To get the order book:

```javascript
const response = await Layr0 IMC.orderbook();
console.log(response);
```

### TradeBook Example

To get the trade book:

```javascript
const response = await Layr0 IMC.tradebook();
console.log(response);
```

### PositionBook Example

To get the position book:

```javascript
const response = await Layr0 IMC.positionbook();
console.log(response);
```

### Holdings Example

To get holdings:

```javascript
const response = await Layr0 IMC.holdings();
console.log(response);
```

Please refer to the documentation and consult the API reference for details on optional parameters:

* [IMC API Documentation](../api-documentation/v1/)
* [Order Constants](../api-documentation/v1/order-constants.md)
