# Dhan

Dhan is enabled for production registration in the upcoming protected-order release, replacing Angel One. Production slug: `dhan`. These feature changes are not yet a deployment announcement.

## Credential setup

1. Sign in to the licensed IMC account and choose Dhan in Broker Setup.
2. Configure the Dhan application ID and application secret for the consent login. IMC accepts the API-key setting as `client_id:::app_id`; the secret is `app_secret`.
3. Use the callback URL and static IP shown by IMC in the Dhan application configuration. Do not substitute a token for the application secret.
4. Complete Dhan consent login. IMC generates consent, opens Dhan login and consumes the callback token for broker authentication.
5. Generate/copy the Dhan-bound **IMC API key**. Python/REST examples use this key, not the Dhan broker token.
6. Check mode/version metadata and [DDPI status](../../api-documentation/v1/ddpi-status.md) before delivery protection. Refresh broker authentication when needed.

## Order capabilities

New centralized GTT and protected entries use [Super Orders](../../api-documentation/v1/dhan-super-orders.md). Provide explicit Super entry intent plus TP/SL; old exit-only Dhan placement is rejected. New Forever placement is disabled; existing Forever records retain their own system identity. CNC/MTF delivery needs fresh confirmed authorization. Cancellation is not a closing sell, and a triggered exit is not a guaranteed fill.

Use [protected book v2](../../api-documentation/v1/protected-orders.md) for non-billable execution reconciliation. Missing broker history/linkage remains unknown. Stored Super exposure can block mode changes even when a day-scoped broker book no longer lists it.
