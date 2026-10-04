# Options and GTT

Options helpers retain their current contracts. All four GTT routes—placegttorder, modifygttorder, cancelgttorder, gttorderbook—require apikey plus mode/version/request fields, including the book read.

Upcoming production scope: Dhan, Upstox, Zerodha and FYERS. Dhan requires explicit [Super entry intent](dhan-super-orders.md). Zerodha/FYERS support SINGLE/OCO. Upstox SINGLE uses the legacy contract; protective-only OCO returns 501. Use [protected entry](protected-orders.md) for Upstox MULTIPLE with ENTRY/TARGET/STOPLOSS. Angel One is production-disabled.

Existing non-Dhan legacy GTT and ordinary order responses are preserved. New protected routes provide isolated entry/OCO lifecycle and contract-v2 fill evidence. Analyze is persistent CRUD only, without simulated price events or fills. Broker authentication is needed for later lifecycle queries. OCO trigger cancellation is not a guaranteed execution fill.

Options endpoints: optionchain, optiongreeks, optionsymbol, optionsorder, optionsmultiorder, syntheticfuture. Trading options endpoints still require mode preconditions.
