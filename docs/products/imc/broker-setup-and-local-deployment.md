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

## Upcoming protected-order release

SDK baseline 1.1.5; protected APIs in SDK 1.2.0, verified against IMC `a995f3e` (contract v2 originated at `364acaf`). Production registration for this release: Dhan, Upstox, Zerodha and FYERS. Angel One is blocked in development and production. See [release and migration details](releases/protected-order-release.md). These feature branches are not yet published or deployed.

## Development release roster

Development Compose and `toggle_config.py --dev` use `VALID_BROKERS=dhan,upstox,zerodha,fyers`. Backend policy enforces the same roster in development and production, including existing bindings. Recreate affected development containers after environment/Compose changes; changing a source checkout alone is not proof of the running configuration. Preserve credentials and manage existing Angel positions directly with Angel One.

## Development release roster

Development Compose and `toggle_config.py --dev` use `VALID_BROKERS=dhan,upstox,zerodha,fyers`. Backend policy enforces the same roster in development and production, including existing bindings. Recreate affected development containers after environment/Compose changes; changing a source checkout alone is not proof of the running configuration. Preserve credentials and manage existing Angel positions directly with Angel One.
