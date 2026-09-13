# GoCharting Webhooks

Router-IMC accepts GoCharting webhook alerts for Indian-market workflows.

## Requirements

- An active Layr0 Console license for Router-IMC.
- A connected production broker: Angel One, Fyers, Upstox, or Zerodha.
- GoCharting webhook access on the applicable GoCharting plan.
- A Router-IMC API key and a strategy/webhook configuration created in IMC.

## Setup

1. Sign in to Router-IMC at `https://imc.layr0.org` through Layr0 Console.
2. Connect one of the four production brokers and copy the generated API key.
3. Open the GoCharting integration in IMC and generate the webhook payload.
4. In GoCharting, create an alert and paste the IMC webhook URL and generated
   JSON message.
5. Send a test alert and confirm the request in IMC API Analyzer before using
   live execution.

Analyze mode should be used to validate symbol, exchange, quantity, product,
and order parameters before switching to live execution. Auto mode executes
accepted requests immediately; Semi-Auto mode places them in Action Center for
approval.
