# Zebu

Zebu, a leading stock trading platform, offers robust API services for traders and developers looking to integrate algorithmic trading solutions into their platforms. The Zebu MYNT API enables access to real-time market data, portfolio management, and trade execution for stocks, commodities, and mutual funds.\


To integrate Zebu’s API, follow the steps below:

### API Key Registration



Before using the API, you need to generate an API key and API secret.



1\. Login to Zebu MYNT

Go to the [MYNT Web Application](https://mynt.in/#/) and log in with your Zebu credentials.

<img
  src={require('@site/static/img/assets/image (55).png').default}
/>

2\. Access API Key Generation

Navigate to Profile and click on the Client Code at the top right corner.

<img
  src={require('@site/static/img/assets/image (56).png').default}
/>

Press the API Key button next to the logout option.

<img
  src={require('@site/static/img/assets/image (57).png').default}
/>

3\. Generate API Key and API Secret

Select the validity period for the API key (choose a duration).

<img
  src={require('@site/static/img/assets/image (58).png').default}
/>

Click the Generate API Key button to generate both the API Key (Vendor Code) and the API Secret (App Key).

<img
  src={require('@site/static/img/assets/image (59).png').default}
/>

### Generating API Key and Secret

<img
  src={require('@site/static/img/assets/image (60).png').default}
/>

Once generated, the Vendor Code and APP Key will be provided for the app. These keys are essential for authenticating API requests. Here’s how your .env file might look:

```
BROKER_API_KEY = 'your_vendor_code_here'
BROKER_API_SECRET = 'your_appkey_here'
REDIRECT_URL = 'http://127.0.0.1:5000/zebu/callback'
```

Make sure to store your API credentials securely and handle them with care to prevent unauthorized access.

### Zebu API Integration

Integrating OpenAlgo with Zebu’s MYNT API opens opportunities for algorithmic trading and portfolio management. By using the Zebu API, developers can automate trading strategies and enhance trading experiences for users. Be sure to implement best practices for API rate limits, security, and error handling.

\


For further assistance or troubleshooting, refer to [Zebu API Documentation](https://zebumyntapi.web.app).
