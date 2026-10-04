# Layr0 Product Documentation

This website is the company-wide product documentation hub for Layr0. It is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

The current product documentation is available under `docs/products/imc`.

## Installation

```bash
yarn
```

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Upcoming protected-order release

SDK baseline 1.1.5; protected APIs in SDK 1.2.0, targeting IMC `364acaf`. Production registration for this release: Dhan, Upstox, Zerodha and FYERS. Angel One is production-disabled. See [release and migration details](docs/products/imc/releases/protected-order-release.md). These feature branches are not yet published or deployed.
