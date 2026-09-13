# TradingView Webhooks

Router-IMC accepts TradingView alert webhooks and routes valid requests to the
currently connected production broker.

## Setup

1. Activate Router-IMC in Layr0 Console and sign in at
   `https://imc.layr0.org`.
2. Connect Angel One, Fyers, Upstox, or Zerodha and generate an IMC API key.
3. Open the TradingView integration in IMC and generate the webhook URL and
   JSON payload for the required symbol, exchange, quantity, product, and
   action.
4. Create a TradingView alert, enable its webhook URL, and paste the generated
   JSON message.
5. Send a test alert and verify it in API Analyzer.

Use Analyze mode to validate an alert before live execution. Auto mode executes
accepted requests immediately; Semi-Auto mode sends them to Action Center for
manual approval. TradingView is an alert/webhook source; it does not replace
the broker session or the IMC API key.
