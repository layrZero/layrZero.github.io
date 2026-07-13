# Order Lifecycle And Reconciliation

IMC keeps order execution and exposure verification explicit.

## Open Flow

1. Read current mode context from `funds` or analyzer status.
2. Send `placeorder`, `placesmartorder`, `basketorder`, `splitorder`, `optionsorder`, or `optionsmultiorder` with mode precondition fields.
3. Verify the broker order with `orderstatus`.

## Close Flow

1. Send `closeposition` with the strategy name and mode precondition fields.
2. If the close response succeeds, read `positionsopen` for the same strategy, symbol, exchange, and product.
3. Treat `positionsopen.quantity = 0` as zero-exposure proof.
4. Treat `closeposition` returning `NO_STRATEGY_EXPOSURE` as zero-exposure proof.
5. If neither proof is available, keep the local client state pending reconciliation rather than assuming the position is still open.

## Why `positionsopen` Exists

`positionsopen` is not an order endpoint. It is a strategy-scoped reconciliation read. It answers one question: "does this strategy still have exposure for this symbol/product?"

Because it is read-only, it is mode-checked but does not create a protected operation lease.
