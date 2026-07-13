# Broker Setup And Local Deployment

Run IMC on a machine you control, connect a broker, and expose only the interfaces you need.

## Local Development

1. Clone the India-marketConnector project.
2. Install backend and frontend dependencies from that repo.
3. Configure broker credentials.
4. Start the Flask server.
5. Open the IMC UI at `http://127.0.0.1:5000`.
6. Generate or copy the API key for your active broker.

## Production Notes

- Prefer HTTPS when exposing IMC outside localhost.
- Keep broker credentials and API keys out of source control.
- Use analyzer mode before live trading.
- Confirm the active broker and mode before running automated strategies.
- Keep the WebSocket proxy reachable if your strategy needs streaming data.
