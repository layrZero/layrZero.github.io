# Angel One

Angel One is one of the four brokers enabled for Router-IMC production
registration. Production uses the broker slug `angel`.

## Setup

1. Activate Router-IMC in Layr0 Console and sign in at `https://imc.layr0.org`.
2. Open Broker Setup and select Angel One.
3. Copy the static IP and callback URL displayed by IMC into the broker
   developer configuration where required.
4. Enter the credentials requested by the IMC form, complete the broker login
   and TOTP flow, and confirm the connected session.
5. Generate the broker-specific IMC API key from API Keys.

Use Analyze mode to validate requests before enabling live execution. Auto mode
executes accepted orders immediately; Semi-Auto mode queues them in Action
Center for approval.
