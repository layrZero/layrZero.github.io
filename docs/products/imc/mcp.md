---
description: Layr0 IMC - Model Context Protocol
---

# MCP

## Layr0 IMC MCP - AI Trading Assistant



An AI-powered trading assistant platform for Layr0 IMC, leveraging Model Context Protocol (MCP) and Large Language Models to provide intelligent trading capabilities.

### Overview

Layr0 IMC MCP integrates the powerful Layr0 IMC trading platform with advanced AI capabilities through:

1. An MCP server that exposes Layr0 IMC API functions as tools for AI interaction
2. An intelligent client application providing a conversational interface for trading

This bridge between Layr0 IMC's trading capabilities and AI allows for a natural language interface to complex trading operations, making algorithmic trading more accessible to users of all technical backgrounds.

<img
  src={require('@site/static/img/assets/Screenshot 2025-01-04 at 6.01.17 PM.png').default}
/>

## Layr0 IMC MCP Server

This is a Model Context Protocol (MCP) server that provides trading and market data functionality through the Layr0 IMC platform. It enables AI assistants to execute trades, manage positions, and retrieve market data directly from supported brokers.

### Prerequisites

#### 1. Router-IMC Product Access

Ensure your hosted Router-IMC product access is ready:

1. **Open Router-IMC**: Use the hosted product at `https://imc.layr0.org`
2. **Nodejs** : Ensure NodeJS is installed
3. **Broker Authentication**: Ensure your broker credentials and broker session are properly configured in Router-IMC.

import YouTube from '@site/src/components/YouTube';

<YouTube id="oczs8KOrxIo" title="MCP Node.JS" />

#### 2. API Key

To get your Layr0 IMC API key:

1. Open your Layr0 IMC web interface (e.g., `https://imc.layr0.org`)
2. Navigate to **Settings → API Keys**.
3. Generate or copy your existing API key.

### MCP Client Configuration

Add the following configuration to your MCP client, replacing the placeholder paths with your actual file paths. The server now takes the API key and host URL as command-line arguments for better security and flexibility.

#### Windows

**Example Configuration:**

```json
{
  "mcpServers": {
    "Layr0 IMC": {
      "command": "docker",
      "args": [
        "exec",
        "-i",
        "Layr0 IMC-web",
        "/app/.venv/bin/python",
        "/app/mcp/mcpserver.pyc"
      ]
    }
  }
}

```

**Configuration File Locations:**

* **Claude Desktop**: `%APPDATA%\Claude\claude_desktop_config.json`
* **Windsurf**: `%APPDATA%\Windsurf\mcp_config.json`
* **Cursor**: `%APPDATA%\Cursor\User\settings.json`

####


<YouTube id="YTvcWxsRvPc" title="MCP Configuration" />

#### macOS

**Example Configuration:**

```json
{
  "mcpServers": {
    "Layr0 IMC": {
      "command": "/Users/your_username/Layr0 IMC/.venv/bin/python3",
      "args": [
        "/Users/your_username/Layr0 IMC/mcp/mcpserver.py",
        "YOUR_API_KEY_HERE",
        "https://imc.layr0.org"
      ]
    }
  }
}
```

**Configuration File Locations:**

* **Claude Desktop**: `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windsurf**: `~/.config/windsurf/mcp_config.json`
* **Cursor**: `~/Library/Application Support/Cursor/User/settings.json`

#### Linux

**Example Configuration:**

```json
{
  "mcpServers": {
    "Layr0 IMC": {
      "command": "/home/your_username/Layr0 IMC/.venv/bin/python3",
      "args": [
        "/home/your_username/Layr0 IMC/mcp/mcpserver.py",
        "YOUR_API_KEY_HERE",
        "https://imc.layr0.org"
      ]
    }
  }
}
```

**Configuration File Locations:**

* **Claude Desktop**: `~/.config/Claude/claude_desktop_config.json`
* **Windsurf**: `~/.config/windsurf/mcp_config.json`
* **Cursor**: `~/.config/Cursor/User/settings.json`

#### Path Configuration Notes

**Important**: Replace the paths in the examples above with the path to your MCP adapter runtime:

* **Windows**: Replace placeholder paths with your actual MCP adapter path
* **macOS/Linux**: Replace `/Users/your_username` or `/home/your_username` with your actual home directory path

To find your Python virtual environment path:

* **Windows**: Usually in `venv\Scripts\python.exe`
* **macOS/Linux**: Usually in `.venv/bin/python3`

#### ChatGPT Configuration (Platform Independent)

If your ChatGPT client supports MCP, use the appropriate path format for your operating system from the examples above.

### Available Tools

The MCP integration provides the following categories of tools:

#### Order Management

* `place_order` - Place market or limit orders
* `place_smart_order` - Place orders considering position size
* `place_basket_order` - Place multiple orders at once
* `place_split_order` - Split large orders into smaller chunks
* `modify_order` - Modify existing orders
* `cancel_order` - Cancel specific orders
* `cancel_all_orders` - Cancel all orders for a strategy

#### Position Management

* `close_all_positions` - Close all positions for a strategy
* `get_open_position` - Get current position for an instrument

#### Order Status & Tracking

* `get_order_status` - Check status of specific orders
* `get_order_book` - View all orders
* `get_trade_book` - View executed trades
* `get_position_book` - View current positions
* `get_holdings` - View long-term holdings
* `get_funds` - Check account funds and margins

#### Market Data

* `get_quote` - Get current price quotes
* `get_market_depth` - Get order book depth
* `get_historical_data` - Retrieve historical price data

#### Instrument Search

* `search_instruments` - Search for trading instruments
* `get_symbol_info` - Get detailed symbol information
* `get_expiry_dates` - Get derivative expiry dates
* `get_available_intervals` - List available time intervals

#### Utilities

* `get_Layr0 IMC_version` - Check Layr0 IMC version
* `validate_order_constants` - Display valid order parameters

### Usage Examples

Once configured, you can ask your AI assistant to:

* "Place a buy order for 100 shares of RELIANCE at market price"
* "Show me my current positions"
* "Get the latest quote for NIFTY"
* "Cancel all my pending orders"
* "What are my account funds?"

### Supported Exchanges

* **NSE** - National Stock Exchange (Equity)
* **NFO** - NSE Futures & Options
* **CDS** - NSE Currency Derivatives
* **BSE** - Bombay Stock Exchange
* **BFO** - BSE Futures & Options
* **BCD** - BSE Currency Derivatives
* **MCX** - Multi Commodity Exchange
* **NCDEX** - National Commodity & Derivatives Exchange

### Security Note

⚠️ **Important**: Keep API keys and broker credentials private. Use the hosted Router-IMC product URL and a broker-specific API key when configuring MCP clients.

### Troubleshooting

1. **Connection Issues**: Verify Router-IMC is reachable at `https://imc.layr0.org`
2. **Authentication Errors**: Check your API key is correct and valid
3. **Permission Errors**: Ensure the Python virtual environment has proper permissions
4. **Order Failures**: Verify your broker connection and trading permissions
5. **Order Failures**: Verify broker credentials in Layr0 IMC are valid and active

### Support

For issues related to:

* **Layr0 IMC Platform**: Visit the Layr0 IMC documentation
* **MCP Protocol**: Check the Model Context Protocol specifications
* **Trading Errors**: Verify your broker connection and trading permissions
