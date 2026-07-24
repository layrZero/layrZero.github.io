# Broker Setup

Connect a broker account to the hosted Router-IMC product and prepare it for licensed API, webhook, and dashboard workflows.

## Product Access

1. Open Layr0 Console and enable access for the Router-IMC product.
2. Generate or select the required `IndianDomestic` license.
3. Open Router-IMC at `https://imc.layr0.org`.
4. Sign in with the licensed email, complete OTP verification, and select the active license.
5. Register broker credentials for the selected license.
6. Copy the static IP and callback URL shown by Router-IMC into the broker developer portal when the broker requires them.
7. Connect the broker session through the broker login, OAuth, or TOTP flow.
8. Generate or copy the broker-specific API key for API, webhook, SDK, or integration usage.

## Broker Session Notes

- Keep broker credentials and API keys out of source control.
- Use analyzer mode before live trading.
- Confirm the active broker and mode before running automated strategies.
- Keep the WebSocket proxy reachable if your strategy needs streaming data.
