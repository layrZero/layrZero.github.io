# Upcoming protected-order release and broker transition

These changes target IMC feature commit `364acaf` and SDK **1.2.0**. SDK **1.1.5** is the package-migration baseline. Feature branches are not yet a published package or production deployment.

## Production registration

The release allows **Dhan, Upstox, Zerodha and FYERS**: `VALID_BROKERS=dhan,upstox,zerodha,fyers`.

**Angel One is decommissioned for production**, including existing API-key bindings. Stored records and development adapters are preserved. Manage existing Angel positions directly with Angel One; this release does not transfer or close them. Historical Angel setup instructions are archived outside published production docs. Old Angel documentation URLs redirect here.

Dhan uses native Super Orders for new protected entries. Upstox uses MULTIPLE GTT with ENTRY/TARGET/STOPLOSS. Zerodha/FYERS attach OCO after confirmed entry fills. Existing ordinary order and non-Dhan legacy GTT contracts remain available; ordinary OPEN orders do not automatically gain protection.

- [Dhan setup](../connect-brokers/brokers/dhan.md)
- [Protected orders and Python SDK](../api-documentation/v1/protected-orders.md)
- [DDPI status](../api-documentation/v1/ddpi-status.md)
- [Dhan Super lifecycle](../api-documentation/v1/dhan-super-orders.md)

Protected-book reads are non-billable; trading/recovery and DDPI retain server usage policies. No automatic price polling, close execution, live trades or deployment is performed by the SDK update.
