# 5paisa (XTS)

## 5Paisa (XTS) Broker Integration

Layr0 IMC makes algorithmic trading accessible and straightforward by providing seamless integration with various brokers, including 5Paisa(XTS API). This documentation will guide you through the process of configuring your 5Paisa account to work with Layr0 IMC

***



***

### Step 1: Create API Applications

Login to [XTS Developer Portal](https://xtsmum.5paisa.com/dashboard#!/app).

Once logged in:

1. Go to `My App` > `Create New Application`

<img
  src={require('@site/static/img/assets/image (103).png').default}
/>

1. Create two separate apps:
   * **Interactive Order API**
   * **Market Data API**

<img
  src={require('@site/static/img/assets/image (104).png').default}
/>

#### Details to Fill:

* **App Name**: Layr0 IMC
* **App Description**: Layr0 IMC
* **Redirect URL: (leave it empty)**
* **Company Name**: Layr0 IMC (or your own)
* Choose the correct **API Package** depending on the app (Order or Market Data).

<img
  src={require('@site/static/img/assets/image (105).png').default}
/>

Once submitted, wait for approval from the broker. After approval, the status will turn **Active**.

***

### Step 2: Setup Environment Variables

Refer to the `.sample.env` file in your Layr0 IMC folder and prepare your `.env` as follows:

```bash
# Broker Configuration
BROKER_API_KEY = 'YOUR_BROKER_ORDER_API_KEY'
BROKER_API_SECRET = 'YOUR_ORDER_API_SECRET'

BROKER_API_KEY_MARKET = 'YOUR_BROKER_MARKET_API_KEY'
BROKER_API_SECRET_MARKET = 'YOUR_BROKER_MARKET_API_SECRET'

REDIRECT_URL = 'https://imc.layr0.org/fivepaisaxts/callback'
```

Replace the values with actual credentials shown on your developer dashboard once approved.

***

### Step 3: Start Layr0 IMC

Once all environment variables are set and your apps are **Active**, you can now start Layr0 IMC.

> Ensure you have installed dependencies and set up the broker configuration properly. Layr0 IMC will now be able to place orders and fetch market data through 5paisa's XTS API.

***



This completes the integration process for 5paisa (XTS API)  with Layr0 IMC.

By following the steps outlined in this guide, you have successfully configured your 5Paisa (XTS API) account for use with Layr0 IMC. You can now leverage the power of algorithmic trading to enhance your trading strategies and make data-driven decisions. Should you encounter any issues or need further assistance, please refer to the Layr0 IMC community or support resources. Happy trading!
