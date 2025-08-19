# Firstock

Firstock is an Indian discount brokerage firm offering seamless trading services across various segments such as equities, commodities, currencies, and derivatives. Known for its user-friendly interface, Firstock provides mobile, web, and desktop platforms equipped with essential features like real-time market data, advanced charting tools, and order execution capabilities. Its competitive pricing structure and support for algorithmic trading make it an attractive option for both retail and professional traders.

## Getting API Credentials

To integrate Firstock with OpenAlgo, follow these steps to obtain your API key and secret:

1\. Log in to Firstock Connect

• Visit [https://connect.thefirstock.com/login?ref=wikiconnect.thefirstock.com](https://connect.thefirstock.com/login?ref=wikiconnect.thefirstock.com).

• Enter your Firstock login credentials.

2\. Generate API Credentials:

<img
  src={require('@site/static/img/assets/Screenshot 2024-12-24 at 2.49.27 PM.png').default}
/>

• After logging in, navigate to the API Key section in your profile settings.

• Click on Generate API Key.

• Your Vendor Code and API Key will be displayed.

<img
  src={require('@site/static/img/assets/Screenshot 2024-12-24 at 2.49.44 PM.png').default}
/>

3\. Configure OpenAlgo:

• In your OpenAlgo .env file, set the following variables:

```bash
BROKER_API_KEY = 'Your Vendor Code'
BROKER_API_SECRET = 'Your API Key'
REDIRECT_URL = 'http://127.0.0.1:5000/firstock/callback'
```
