# Data API

## Standardized Error Handling

All market-data endpoints (Quotes, History, Depth, Ticker, Intervals, Symbol, Search, Expiry) follow consistent error semantics:

- 401 Unauthorized: Invalid/expired broker session or unauthorized.
- 403 Forbidden: Invalid OpenAlgo API key or permission error.
- 429 Too Many Requests: Rate limit exceeded (where detectable).
- 500 Internal Server Error: Unclassified internal failure.

Refer to `docs/api-documentation/v1/http-status-codes.md` for full meanings and usage.
