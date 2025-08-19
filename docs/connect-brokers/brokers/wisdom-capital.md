# Wisdom Capital

Wisdom Capital provides API access through the Symphony Fintech XTS platform. This guide helps you integrate Wisdom Capital with OpenAlgo for both order execution and market data streaming.

***

### Step 1: Create API Applications

Login to the [Wisdom Capital Developer Portal](https://trade.wisdomcapital.in/dashboard#!/login).

After logging in:

1. Go to `My App` > `Create New Application`
2. You need to create two applications:
   * One for **Interactive Order API**
   * One for **Market Data API**

<img
  src={require('@site/static/img/assets/image (10).png').default}
/>

#### Application Setup:

For each app, fill in the following:

* **App Name**: OpenAlgo
* **App Description**: OpenAlgo
* **Select API Package**: Choose `Interactive Order API` or `Market Data API` depending on the app.



<img
  src={require('@site/static/img/assets/image (11).png').default}
/>

Repeat the process for both API packages.

Once submitted, wait for the apps to be **approved**. The API status will show as **Active** once approved.

<img
  src={require('@site/static/img/assets/image (12).png').default}
/>

***

### Step 2: Setup Environment Variables

Refer to the `.sample.env` file in OpenAlgo and prepare your `.env` with the following structure:

```env
# Broker Configuration
BROKER_API_KEY = 'YOUR_WISDOM_ORDER_API_KEY'
BROKER_API_SECRET = 'YOUR_ORDER_API_SECRET'

BROKER_API_KEY_MARKET = 'YOUR_WISDOM_MARKET_API_KEY'
BROKER_API_SECRET_MARKET = 'YOUR_MARKET_API_SECRET'

REDIRECT_URL = 'http://127.0.0.1:5000/wisdom/callback'
```

Replace placeholder values with actual credentials obtained after app approval.

***

### Step 3: Start OpenAlgo

Ensure `.env` is correctly configured and that both APIs (order and market data) are active. Then, start OpenAlgo.

> You can now place live orders and get real-time market data via Wisdom Capital’s XTS API inside OpenAlgo.

***

### Final Note

Integrating OpenAlgo with Wisdom Capital's XTS API gives you access to real-time market data and order execution in a programmable environment. Follow best practices—keep your API keys secure, implement appropriate error handling, and regularly monitor your API usage to ensure a smooth trading experience.
