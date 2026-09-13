# ChartInk Webhooks

Router-IMC supports ChartInk scanner alerts for Indian-market strategies.

## Requirements

- A valid Layr0 Console license for Router-IMC.
- A connected production broker: Angel One, Fyers, Upstox, or Zerodha.
- ChartInk webhook access and an IMC API key.

## Setup

1. Sign in to `https://imc.layr0.org` through Layr0 Console.
2. Connect a production broker and create a ChartInk strategy in IMC.
3. Configure the strategy’s symbol, exchange, quantity, product, and trading
   window in the IMC UI.
4. Copy the generated webhook URL into the ChartInk scanner alert.
5. Send a test alert and inspect the request in API Analyzer.

ChartInk requests support NSE and BSE symbols. Use Analyze mode to validate the
payload before enabling live execution. Auto mode executes accepted orders;
Semi-Auto mode queues them in Action Center for approval.
