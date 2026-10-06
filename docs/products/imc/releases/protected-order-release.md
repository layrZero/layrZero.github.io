# Upcoming protected-order release and broker transition

These changes are verified against IMC feature commit `a995f3e` (contract v2 originated at `364acaf`) and SDK **1.2.0**. SDK **1.1.5** is the package-migration baseline. Feature branches are not yet a published package or production deployment.

## Production registration

The release allows **Dhan, Upstox, Zerodha and FYERS**: `VALID_BROKERS=dhan,upstox,zerodha,fyers`.

**Angel One is blocked in development and production**, including existing API-key bindings. Stored records and development adapters are preserved. Manage existing Angel positions directly with Angel One; this release does not transfer or close them. Historical Angel setup instructions are archived outside published production docs. Old Angel documentation URLs redirect here.

Dhan uses native Super Orders for new protected entries. Upstox uses MULTIPLE GTT with ENTRY/TARGET/STOPLOSS. Zerodha/FYERS attach OCO after confirmed entry fills. Existing ordinary order and non-Dhan legacy GTT contracts remain available; ordinary OPEN orders do not automatically gain protection.

- [Dhan setup](../connect-brokers/brokers/dhan.md)
- [Protected orders and Python SDK](../api-documentation/v1/protected-orders.md)
- [DDPI status](../api-documentation/v1/ddpi-status.md)
- [Dhan Super lifecycle](../api-documentation/v1/dhan-super-orders.md)

Protected-book reads are non-billable; trading/recovery and DDPI retain server usage policies. No automatic price polling, close execution, live trades or deployment is performed by the SDK update.

## Failed placement replay and current verification

Verified against IMC `a995f3e`; protected book contract v2 originated at `364acaf`.
Development and production both allow only Dhan, Upstox, Zerodha and FYERS. Angel One adapters and historical records are retained, but runtime access is blocked.

Placement results are immutable for both success and failure. For example, replaying `zerodha-tcs-protected-001` after a Zerodha authentication repair returns its original saved identity-verification failure; it does not perform a fresh profile check or submit an entry. The corrected combined `api_key:access_token` authentication is internal to IMC. Clients send their IMC key, never a broker token.

Use centralized `POST /api/v1/ddpistatus` with only `{"apikey":"YOUR_IMC_API_KEY"}` to check current account/authorization evidence. Reconcile the original operation through protected book v2 and check broker state before intentionally creating a new placement with a new ID. A successful DDPI check alone does not establish that an earlier order has no exposure. Gateway 502, malformed responses and timeouts leave outcomes uncertain; never automatically replace a request ID, resubmit, recover or fall back to ordinary placement. Book reads remain non-billable; DDPI and explicit lifecycle actions retain their server usage policies.
