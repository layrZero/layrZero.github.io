# API Analyzer

API Analyzer is the Router-IMC diagnostic surface for reviewing incoming API
and webhook requests before enabling live execution.

Use it with Analyze mode to inspect request payloads, validation failures,
symbol/parameter issues, and the resulting response. Analyzer output is for
diagnostics; it does not represent a live broker fill.

## Recommended workflow

1. Select Analyze mode and connect the intended broker context.
2. Send a test request from TradingView, ChartInk, GoCharting, Python, or an API
   client.
3. Review the request and response in API Analyzer.
4. Correct authentication, symbol, exchange, quantity, product, or mode fields.
5. Switch to live Auto or Semi-Auto execution only after the test is valid.
