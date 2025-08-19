# AmiQuotes

**This tool helps you to fetch live data ( 1minute / Daily) data directly from the broker and seamlessly update Amibroker using the Amiquotes tool every minute.**



### Prerequisites

OpenAlgo  and OpenAlgo API Key

Amibroker 6.0 or higher

Amiquotes 4.10 or higher (mostly preinstalled with Amibroker) if not download from [Amibroker Download section](https://amibroker.com/download.html)

OpenAlgo supported Brokers providing Historical Data / Intraday Data API

Note :  As of now kotak not supporting intraday/historical data API



### Step 1 : Download OpenAlgo - Amiquotes (Plugin)



[Get the Amiquotes Plugin Here](@site/static/img/assets/OpenAlgo.ads)

Download the file and save under **Amibroker -> Amiquotes -> DataSource Folder**

<img
  src={require('@site/static/img/assets/image (64).png').default}
/>



### Step 2 : Create the Amibroker Database

Open Amibroker Goto File Menu -> New -> Database

<img
  src={require('@site/static/img/assets/image (65).png').default}
/>

Create a New Database

Enter the Database Name, Base Time Interval and Click Create

<img
  src={require('@site/static/img/assets/image (66).png').default}
/>

Enter the Database Source as (local database) and Number of Bars as 75000

<img
  src={require('@site/static/img/assets/image (67).png').default}
/>

Now click on Intraday Settings and Enable Allow Mixed EOD/Interval data and press ok

<img
  src={require('@site/static/img/assets/image (68).png').default}
/>



### Step 3 : Add OpenAlgo Ticker Symbols

Add Ticker Symbols from the Symbols menu -> New

<img
  src={require('@site/static/img/assets/Split Order - Options.png').default}
/>

You can Also add the ticker symbol with comma separated

<img
  src={require('@site/static/img/assets/Split Order - Options.png').default}
/>

If you want to import bulk symbols consider using Watchlist import method (Supports .txt or .csv or .tls format)

<img
  src={require('@site/static/img/assets/image (71).png').default}
/>



### Step 4 : Amiquote Realtime Update

Open Amiquote from Tools Menu -> Auto-update quotes (AmiQuote)

<img
  src={require('@site/static/img/assets/image (72).png').default}
/>

From the dropdown of Amiquote Select OpenAlgo

<img
  src={require('@site/static/img/assets/image (73).png').default}
/>

Alternatively, you can also import the openalgo template using the import method. Goto **Data Source Menu -> Import**

<img
  src={require('@site/static/img/assets/image (76).png').default}
/>



configure the OpenAlgo API key

Get the OpenAlgo API Key by visiting **openalgo -> Dashboard -> Click on Profile Icon -> APIKey**

Create one if you installed openalgo for the first time. Copy the API key and paste in the User-definable data source -> API Key Section as shown below and press ok

<img
  src={require('@site/static/img/assets/image (78).png').default}
/>

Now Select the desired interval and set Run every 1min  and press the play button

<img
  src={require('@site/static/img/assets/image (79).png').default}
/>

Now the Data Download from the Broker via OpenAlgo Starts

<img
  src={require('@site/static/img/assets/image (80).png').default}
/>

Now you can see that openalgo is Auto updating the Amibroker Database every 1 minute

<img
  src={require('@site/static/img/assets/image (81).png').default}
/>

Make sure that Charts are loaded properly.

<img
  src={require('@site/static/img/assets/Amibroker Chart.png').default}
/>

Start using your brokers data for your analysis purpose.\


For more details and troubleshooting refer the [Ticker API](../../api-documentation/v1/data-api/ticker.md)

Make sure to login to openalgo every day to fetch the live intraday/EOD quotes
