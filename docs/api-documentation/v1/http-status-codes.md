# HTTP Status Codes

The status codes contain the following

| Status Code | Meaning                                                                     |
| ----------- | --------------------------------------------------------------------------- |
| 200         | Request was successful                                                      |
| 400         | Bad request. The request is invalid or has malformed parameters             |
| 401         | Unauthorized. Invalid/expired broker session/token or unauthorized access   |
| 403         | Forbidden. Invalid OpenAlgo API key or insufficient permissions             |
| 429         | Too Many Requests. Rate limit exceeded (where detectable)                   |
| 500         | Internal server error. Unclassified internal failure                        |
