# Google Spreadsheets

### Quick Start Guide

<img
  src={require('@site/static/img/assets/Screenshot 2024-12-19 at 12.05.18 AM.png').default}
/>

#### Step 1: Clone the Template Spreadsheet

1. Open the [OpenAlgo Trading Template](https://docs.google.com/spreadsheets/d/1DyTIgucTDzBQaBMGOolT4mbS2Mlv45b2gbzU8aisvpw/edit?usp=sharing)
2. Click "File" > "Make a copy" to create a duplicate of the spreadsheet.
3. In the "Make a copy" dialog, enter a name for your copy of the spreadsheet, such as "My OpenAlgo Trading Sheet".
4. Ensure the "Folder" is set to your desired location, such as "My Drive".
5. Click the "Make a copy" button to create the new spreadsheet.

<img
  src={require('@site/static/img/assets/Screenshot 2024-12-19 at 12.01.10 AM.png').default}
/>

#### Step 2: Configure API Settings

1. Open the cloned spreadsheet
2. Go to Extensions > AppScript editor
3. Locate these lines in the script:
4.

    ```javascript
    var apikey = "<your-openalgo-apikey>";
    var hostServer = "https://your-ngrok-domain.ngrok-free.app"; 
    ```
5. Replace with your OpenAlgo credentials:
   * `apikey`: Your unique OpenAlgo API key
   * HostSefver: Your Custom Domain or Free Ngrok Domain where OpenAlgo is hosted

#### Spreadsheet Structure

The template contains two main sheets:

* **PlaceOrder**: For entering trade details
* **Logs**: Automatic logging of trade orders

**PlaceOrder Sheet Columns**

| Column | Description     | Example                                                                                  |
| ------ | --------------- | ---------------------------------------------------------------------------------------- |
| C3     | Exchange        | NSE, BSE, NFO, MCX, CDS                                                                  |
| D3     | OpenAlgo Symbol | INFY, RELIANCE                                                                           |
| E3     | Action          | BUY/SELL                                                                                 |
| F3     | Price Type      | MARKET/LIMIT/SL/SL-M                                                                     |
| G3     | Total Quantity  | 100                                                                                      |
| H3     | Price           | 1500.50 (for LIMIT/STOP)                                                                 |
| I3     | Trigger Price   | 1480.00 (for STOP)                                                                       |
| J3     | Split Size      | <p>0 - No SplitOrder<br/>Specific Number - Send Split order  with split size quantity</p> |
| K3     | Product Type    | INTRADAY/DELIVERY                                                                        |

#### Split Order Functionality

* **Split Size 0**: Entire quantity in one order
* **Split Size > 0**: Multiple orders of specified size

#### Execution

1. Fill in trade details in the PlaceOrder sheet
2. Press the PlaceOrder function
3. Check response in cell C9
4. View detailed logs in the Logs sheet

```javascript
function openalgo() {
  var apikey = "<your-openalgo-apikey>"; // Replace with your OpenAlgo API key
  var hostServer = "https://your-ngrok-domain.ngrok-free.app"; // REPLACE WITH YOUR HOST SERVER
  
  var baseUrl = hostServer + "/api/v1/splitorder"; // Constructed base URL

  
  // Fetching parameters from the active sheet
  var strategy = "Google Sheet";
  var exchange = SpreadsheetApp.getActiveSheet().getRange('C3').getValue();
  var symbol = SpreadsheetApp.getActiveSheet().getRange('D3').getValue();
  var action = SpreadsheetApp.getActiveSheet().getRange('E3').getValue();
  var pricetype = SpreadsheetApp.getActiveSheet().getRange('F3').getValue();
  var quantity = SpreadsheetApp.getActiveSheet().getRange('G3').getValue().toString();
  var price = SpreadsheetApp.getActiveSheet().getRange('H3').getValue().toString();
  var trigger_price = SpreadsheetApp.getActiveSheet().getRange('I3').getValue().toString();
  var splitsize = SpreadsheetApp.getActiveSheet().getRange('J3').getValue().toString();
  var product = SpreadsheetApp.getActiveSheet().getRange('K3').getValue();

  // Modify payload based on splitsize
  var payload = {
    "apikey": apikey,
    "strategy": strategy,
    "exchange": exchange,
    "symbol": symbol,
    "action": action,
    "quantity": splitsize === "0" ? quantity : quantity,
    "splitsize": splitsize === "0" ? quantity : splitsize,
    "pricetype": pricetype,
    "product": product,
    "price": price,
    "trigger_price": trigger_price
  };

  Logger.log("Request Payload: " + JSON.stringify(payload)); // Log request payload

  // Sending the split order request
  var response = sendSplitOrder(baseUrl, payload);

  // Format the response for frontend
  var formattedResponse = formatResponse(response);

  Logger.log("Formatted Response: " + formattedResponse); // Log formatted response

  // Update the response in the sheet with formatted response
  SpreadsheetApp.getActiveSpreadsheet().getSheetByName("PlaceOrder").getRange('C9').setValue(formattedResponse);
  
  // Log order details
  logSplitOrder(response, strategy, exchange, symbol, action, pricetype, quantity, product, price, trigger_price);

  return formattedResponse;
}

function formatResponse(response) {
  try {
    var parsedResponse = JSON.parse(response);
    
    // If response is successful
    if (parsedResponse.status === "success") {
      var results = parsedResponse.results;
      
      // Format the response for frontend display
      var formattedLines = [
        "Order Placement Status: " + parsedResponse.status.toUpperCase(),
        "Total Orders: " + results.length
      ];
      
      // Add details for each order
      results.forEach(function(order, index) {
        formattedLines.push(
          "Order " + (index + 1) + ":",
          "  Order ID: " + order.orderid,
          "  Quantity: " + order.quantity,
          "  Status: " + order.status
        );
      });
      
      return formattedLines.join("\n");
    } else {
      // Handle error response
      return "Order Placement Failed:\n" + 
             "Error Status: " + parsedResponse.status + "\n" +
             "Error Message: " + (parsedResponse.message || "Unknown error");
    }
  } catch (e) {
    // Handle parsing error
    return "Error Formatting Response:\n" + e.message;
  }
}

function sendSplitOrder(url, payload) {
  try {
    var options = {
      'method': 'post',
      'contentType': 'application/json',
      'payload': JSON.stringify(payload)
    };

    var result = UrlFetchApp.fetch(url, options);
    return result.getContentText();
  } catch (e) {
    Logger.log("Error sending split order: " + e.message);
    return JSON.stringify({
      status: "error",
      message: e.message
    });
  }
}

function logSplitOrder(response, strategy, exchange, symbol, action, pricetype, quantity, product, price, trigger_price) {
  try {
    var parsedResponse = JSON.parse(response);
    if (parsedResponse.status === "success") {
      var results = parsedResponse.results;
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs");

      results.forEach(function(order) {
        var row = [
          strategy,
          exchange,
          symbol,
          action,
          pricetype,
          quantity,
          product,
          order.orderid,
          order.quantity,
          order.status,
          price,
          trigger_price,
          new Date()
        ];
        sheet.appendRow(row);
      });
    } else {
      Logger.log("Error in response: " + response);
    }
  } catch (e) {
    Logger.log("Error logging split order: " + e.message);
  }
}

function clearLogs() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Logs");
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
  }
}
```

### Troubleshooting

#### Common Issues

1. **API Key Invalid**
   * Verify key in OpenAlgo dashboard
   * Check network connectivity
   * Ensure API key has trading permissions
2. **Host URL Incorrect**
   * Confirm exact URL from OpenAlgo platform
   * Check for any trailing slashes
   * Verify ngrok or custom endpoint
3. **Permissions**
   * Accept Google Sheets script permissions
   * Verify API key authorization

### Security Notes

* Keep API key confidential
* Use secure, unique API keys
* Regularly rotate credentials
* Monitor trading activities
