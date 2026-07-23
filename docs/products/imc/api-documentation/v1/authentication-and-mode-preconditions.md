# Authentication And Mode Preconditions

IMC API calls authenticate with the `apikey` field in the JSON request body. The API key identifies the user, license, broker, and broker-specific analyzer/live mode context.

## Mode Metadata

Mode-aware responses include fields such as:

```json
{
  "status": "success",
  "mode": "live",
  "balance_type": "live",
  "mode_version": 7
}
```

Clients must keep this snapshot and send it with trading-sensitive calls.

## Required Fields

Trading/write endpoints and the `positionsopen` reconciliation read require:

| Field | Meaning |
| --- | --- |
| `expected_mode` | Client's last known server mode, such as `live` or `analyze`. |
| `expected_balance_type` | Client's last known balance type, such as `live` or `sandbox`. |
| `expected_mode_version` | Client's last known mode version. |
| `request_id` | Caller-generated request id for tracing and lease/precondition correlation. |

Example:

```json
{
  "expected_mode": "live",
  "expected_balance_type": "live",
  "expected_mode_version": 7,
  "request_id": "order-20260713-001"
}
```

## Error Codes

`MODE_PRECONDITION_REQUIRED` means the request did not include the required mode precondition fields.

`SERVER_MODE_SWITCH_DETECTED` means the submitted snapshot is stale. The client must refresh mode context and decide whether to continue.

`NO_STRATEGY_EXPOSURE` means the submitted strategy has no current broker-side exposure. For close reconciliation, this is zero-exposure proof.

## Read Versus Write

Trading/write endpoints acquire protected mode leases before broker or analyzer side effects.

`positionsopen` is different: it is a read-only reconciliation endpoint. It validates API key identity and mode preconditions, but it does not create an `ApiKeyModeLease`.
