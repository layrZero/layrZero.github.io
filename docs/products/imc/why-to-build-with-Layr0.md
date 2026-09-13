---
sidebar_position: 4
---

# Why to Build with Layr0?

_“Why should I use Layr0 IMC when I can just build my strategy directly on top of the broker’s SDK or API?”_

If you’ve been asking this, you're not alone. Many developers and traders start with direct broker APIs, thinking it’s the fastest way to automate trades. And sure—it works. But then the real issues show up:

How do you monitor trades live?\
Where do you store logs?\
How do you test webhooks before going live?\
How do you fetch and store historical candles?\
What if you want to migrate your strategy from Broker A to Broker B?

That’s when most realize the broker SDK is just the starting point—not the solution.

**Layr0 IMC is built to handle all that overhead for you.** It’s a hosted Layr0 product for broker-connected automation workflows, not just an API wrapper. It gives licensed users a managed product surface for broker sessions, API keys, execution controls, logs, and monitoring without making each team operate its own connector stack.

<img
  src={require('@site/static/img/assets/image (110).png').default}
  alt="Example banner"
/>

***

### What Makes Layr0 IMC Different?

#### Strategy Management Engine

Define, activate, pause, and monitor workflows from Python, TradingView,
ChartInk, and GoCharting. Requests run through the licensed IMC execution
surface with analyzer diagnostics, logs, and approval controls.

#### Real-Time Quote Layer (Common WebSockets)

Instead of rewriting code for each broker’s WebSocket implementation, Layr0 IMC offers a **Common WebSocket layer**. One interface, multiple brokers—streaming normalized market data, ready for use by your strategies.

#### Unified Symbol System

Layr0 IMC maintains a **Common Symbol Format**, so a strategy written using one broker’s symbol conventions will continue to work with others—no tedious renaming or mapping required. Whether it's NSE, BSE, or MCX, symbol translation is handled internally.

#### Broker-Agnostic API Layer

The public REST APIs use one Layr0 contract across the four production brokers:
Angel One, Fyers, Upstox, and Zerodha. Broker-specific capabilities and symbol
rules still apply.



***

### Speed, Stability, and Control

* **API Analyzer** validates requests and webhook payloads in Analyze mode before live execution.
* **Monitoring** exposes broker state, account reads, logs, traffic, latency, and reconciliation views.
* **Master-contract tools** help confirm symbol readiness before requests are sent.

***

### Hosted Product Controls Come Secure by Default

Router-IMC is hosted by Layr0 with strong product controls:

* Cross-Origin Resource Sharing (CORS) rules
* Content Security Policy (CSP) headers
* CSRF protection on state-changing routes
* Endpoint rate limiting
* Session management and audit trail logs

Users work through the hosted Router-IMC product instead of hosting a separate connector instance.

***

### Why Not Just Use Broker APIs Directly?

You certainly can. But here’s what you’d likely need to build on your own:

* Symbol mapping and contract management
* Connection pooling logic
* Live logs and execution dashboards
* Quote stream normalization
* Strategy lifecycle control
* Reusable REST and WebSocket abstractions
* Testing tools for signal simulation
* Historical data download and storage
* Monitoring, recon, and logging infrastructure

Layr0 IMC gives you all of this—**pre-wired, tested, documented**, and ready to use.

***

### Hosted Product Access

Router-IMC access is managed through Layr0 Console licensing, which means:

* Product access is tied to the licensed email and selected license.
* Broker credentials and sessions are configured per license.
* API keys are broker-specific and generated inside Router-IMC.
* Live, Analyze/Sandbox, Auto, and Semi-Auto controls remain visible in the product workflow.

You’re not just calling a broker API directly. You’re using a hosted Router-IMC workflow designed to scale with your trading ideas.

***

### Final Thoughts

If you're building your own trading system, don't just look at what a broker's API _can_ do. Look at what it _doesn’t_ do.

Layr0 IMC doesn’t replace your strategy logic—it **amplifies it** with the tools needed to operate, monitor, test, and deploy with confidence.

And when the day comes that you want to switch brokers or scale across multiple ones, you’ll be glad your system was built on **Layr0 IMC’s broker-agnostic foundation**.

***

