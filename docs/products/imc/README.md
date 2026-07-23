---
slug: /products/imc
---

import ProductFlowExplainer from '@site/src/components/ProductFlowExplainer';

# Router-IMC: Layr0 India Market Connector

Router-IMC is the Layr0 India Market Connector product. It connects a Layr0 Console product license, a licensed email login, one or more configured Indian broker accounts, and routed trade requests from supported automation sources.

Router-IMC is one product inside the Layr0 company ecosystem. Layr0 Console controls product access and license generation; Router-IMC handles broker registration, broker session connection, API keys, routed execution, sandbox/analyzer workflows, semi-auto approvals, and account monitoring.

<ProductFlowExplainer />

## Availability

The planned product host is `https://imc.layr0.org`; it is not yet hosted. Current documented operation is local, self-hosted, or deployment-host based. API examples commonly use a local host such as `http://127.0.0.1:5000`, or the configured deployment host for webhook access.

## What Router-IMC Does

Router-IMC is a broker connectivity and routed trade execution layer for Indian market workflows:

- It links a Layr0 Console license to a Router-IMC login session.
- It stores broker credentials per license and lets the user connect a broker session through the broker's required login, OAuth, or TOTP flow.
- It generates broker-specific API keys for API, webhook, and API Playground requests.
- It routes supported order requests to the currently selected connected broker session.
- It exposes visible workflows for TradingView, GoCharting, Chartink, Python/API usage, webhook payloads, and browser-based API testing.
- It provides account, order, market-data, sandbox/analyzer, logging, latency, security, and reconciliation tools around that broker connection.

## End-to-End User Flow

1. Open Layr0 Console at `https://layr0.org/console/` and enable access for the Router IMC product.
2. Generate or select a license for the `IndianDomestic` market.
3. Open Router-IMC and sign in with the licensed email.
4. Complete OTP verification and choose the license to use for the session.
5. Register broker credentials for that license. When required by the broker setup, copy the shown static IP and callback URL into the broker developer portal.
6. Connect the broker through the broker login, OAuth, or TOTP flow.
7. Review the dashboard to confirm the active broker context, funds, positions, master contract state, and account status.
8. Open API Keys to copy the broker-specific API key and choose Auto or Semi-Auto order mode.
9. Configure TradingView, GoCharting, Chartink, Python/API clients, or webhook callers with the generated endpoint URL and payload.
10. Monitor execution through the dashboard, orderbook, tradebook, positions, logs, security, latency monitor, P&L tracker, sandbox request monitor, WebSocket test tools, and Action Center.

## Trading And Automation Modes

Router-IMC separates execution behavior from testing and approval behavior:

- Live mode routes accepted trading requests to the selected connected broker session.
- Analyze/Sandbox mode lets users test request shape and broker-key scoped execution logic without treating the flow as live broker execution.
- Auto mode sends accepted orders for immediate broker execution.
- Semi-Auto mode queues incoming orders in the Router-IMC Action Center, where the user can approve or reject them before broker execution.
- API Playground lets a logged-in user test Router-IMC REST APIs in the browser with the active API key injected into requests.

## Monitoring And Control

Router-IMC is not only an endpoint surface. The UI gives the user operational control over the broker-connected workflow:

- Dashboard for funds, collateral, margin usage, P&L, positions, broker state, and quick access.
- Orderbook, tradebook, holdings, positions, and search views for broker/account reads.
- Master Contract tools for symbol readiness and exchange contract data.
- Logs, security, latency monitor, and traffic views for operational visibility.
- Sandbox Request Monitor for reviewing sandbox/analyzer API requests before going live.
- WebSocket test tools for LTP, quote, and depth stream checks.
- Action Center for manual approval and rejection when Semi-Auto mode is enabled.

## Safety Model

Router-IMC keeps read paths and trading/write paths distinct:

- Trading/write endpoints use protected mode preconditions so a client cannot unknowingly trade after the server mode changes.
- Protected requests must include the current `expected_mode`, `expected_balance_type`, `expected_mode_version`, and `request_id` values when those endpoints require mode safety metadata.
- If the server mode changed after the client's last snapshot, Router-IMC returns `SERVER_MODE_SWITCH_DETECTED`.
- If required mode fields are missing, Router-IMC returns `MODE_PRECONDITION_REQUIRED`.
- Reconciliation reads such as `positionsopen` are mode-checked but do not create a protected mode lease.
- `positionsopen` verifies strategy exposure during reconciliation; `NO_STRATEGY_EXPOSURE` is the zero-exposure response when there is no current broker-side strategy exposure.

## Where To Go Next

- [Broker Setup And Local Deployment](/docs/products/imc/broker-setup-and-local-deployment)
- [IMC API v1](/docs/products/imc/api-documentation/v1)
- [Authentication And Mode Preconditions](/docs/products/imc/api-documentation/v1/authentication-and-mode-preconditions)
- [Order Lifecycle And Reconciliation](/docs/products/imc/api-documentation/v1/order-lifecycle-and-reconciliation)
- [Integrations](/docs/products/imc/trading-platform)
