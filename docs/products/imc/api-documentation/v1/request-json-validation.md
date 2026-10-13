# Request JSON validation

Executable request objects and arrays must not contain a field named `docs`, including nested fields and case/whitespace variants. IMC rejects the request before authentication/usage hooks, mode leases, execution or persistence. Clients must correct the input; the server does not silently strip fields.

HTTP rejection is `400`:

```json
{
  "status": "error",
  "error_code": "FORBIDDEN_JSON_FIELD",
  "message": "Documentation fields are not allowed in request JSON."
}
```

Malformed JSON receives `400/INVALID_JSON`. WebSocket commands use the existing error envelope with `FORBIDDEN_JSON_FIELD`. The Python SDK raises `ValueError` before transport. Ordinary text values are not interpreted as JSON. Other field validation remains endpoint-specific.

Bruno documentation blocks are prohibited in executable collections. Store explanations in Markdown; request bodies contain only API fields. Malformed or prohibited collections are omitted with an explicit diagnostic instead of an empty-body fallback.

Schema validation can return `400` for missing fields. Service mode guards return `428/MODE_PRECONDITION_REQUIRED` for missing mode requirements and `409/SERVER_MODE_SWITCH_DETECTED` for stale snapshots. Obtain current metadata from Funds/Analyzer.

Offline checks are not proof of deployed broker execution. No production orders or mode changes were performed for this fix.
