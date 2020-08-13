# Vendure Plugin Template

This is a template for a plugin for the [Vendure e-commerce framework](https://www.vendure.io/).

It is intended for plugins which are to be **distributed as npm packages**, either publicly or privately. If you are building a one-off plugin for a specific project, it probably makes more sense to simply nest those plugins into the project source, as is demonstrated by the [real-world-vendure folder structure](https://github.com/vendure-ecommerce/real-world-vendure)

Further information on how Vendure plugins can be used can be found in the [vendure.io Plugins documentation](https://www.vendure.io/docs/plugins/).

## TODO

This template could be made more complete by including:

* Example e2e test setup
* Example Admin UI extension
* Code generation for resolvers & e2e tests
* ESLint / Prettier

## Development Server

A development server is configured in the `dev-server` folder, using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) to spin up a Postgres database, as well as a server and worker.  This is used to test the plugin during development.

To start the server, run:

```bash
yarn dev:run
```

To populate or reset the database, run the following command:

```bash
yarn dev:populate
```

To restart the server (only) after a change, use the following command:

```bash
yarn dev:restart
```

Note: The Docker containers must be rebuilt when updating dependencies.  See 