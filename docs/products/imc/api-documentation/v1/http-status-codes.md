# HTTP Status Codes

The status codes contain the following

| Status Code | Meaning                                                                     |
| ----------- | --------------------------------------------------------------------------- |
| 200         | Request was successful                                                      |
| 400         | Bad request. The request is invalid or has malformed parameters             |
| 401         | Unauthorized. Invalid/expired broker session/token or unauthorized access   |
| 403         | Forbidden. Invalid IMC API key or insufficient permissions             |
| 429         | Too Many Requests. Rate limit exceeded (where detectable)                   |
| 500         | Internal server error. Unclassified internal failure                        |

Additional errors: `409` for stale/conflicting modes, `428` for missing service mode preconditions, and `503` for temporary authentication unavailability. `400/FORBIDDEN_JSON_FIELD` rejects documentation fields before execution. See [request validation](request-json-validation.md).
