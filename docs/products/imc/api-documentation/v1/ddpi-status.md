# DDPI and unattended delivery authorization

Upcoming release targeting IMC `364acaf`; not an announcement of production deployment.

POST `/api/v1/ddpistatus` resolves the broker from the IMC API key. Separate POST routes are `/api/v1/dhan/ddpistatus`, `/api/v1/upstox/ddpistatus`, `/api/v1/zerodha/ddpistatus`, `/api/v1/fyers/ddpistatus`. A broker-specific route rejects a key bound to a different broker. No Angel One production route is provided.

```json
{"apikey": "YOUR_BROKER_IMC_KEY"}
```

```python
from layr0_imc import api
client = api(api_key="YOUR_BROKER_IMC_KEY", host="https://YOUR_IMC_HOST")
evidence = client.ddpistatus()  # or client.ddpistatus("dhan")
```

The `data` response contains broker, account ID, `ddpi_status`, `poa_status`, `unattended_delivery_authorization`, `evidence_source`, `checked_at` and `explanation`. Unattended authorization is confirmed, required, or unknown. These requests retain their server usage policy; they are not the non-billable protected-book endpoint.

| Broker | API evidence | Interpretation |
| --- | --- | --- |
| Dhan | Profile `ddpi` | Boolean DDPI confirmation; POA remains unknown. |
| Upstox | Profile DDPI/POA flags | Confirmed if either authorization is enabled; missing/unrecognized evidence remains unknown. |
| Zerodha | Holdings `meta.demat_consent` | `physical` confirms no manual depository authorization requirement; `consent` requires it; this does not distinguish DDPI from POA. Empty/unrecognized evidence is unknown. |
| FYERS | Profile `ddpi_enabled` | Boolean DDPI evidence; POA remains unknown. |

A failed Live check returns 502 with unknown evidence. Analyze returns unknown with `analyze_no_broker_call` evidence and makes no broker calls. Login and transaction EDIS are not DDPI activation. Protected CNC/MTF placement obtains a fresh authorization check; an earlier SDK result is not permission to bypass that check. Authorization does not prove holdings availability, settlement, funds or guaranteed fills.

See [protected orders](protected-orders.md) for lifecycle and reconciliation.
