# Vendure plugins template

This repo is a starter for creating shared Vendure plugins for distribution via NPM 
or any other package manager.

## Structure

This is a monorepo powered by [Lerna](https://lerna.js.org/). The folder structure is as follows:

```
packages/           # Each plugin is housed in a directory under `packages`
  example-plugin/   # An example plugin to get you started
    dev-server/     # The development server for testing the plugin
    e2e/            # End-to-end tests for the plugin
    src/            # The source code of the plugin  
utils/              # Utility scripts for shared tasks
    e2e/            # Helper functions for e2e tests
```

The reason we are using a monorepo is that it allows you to create multiple plugins without requiring a separate 
repository for each one. This reduces the maintenance burden and makes it easier to manage multiple plugins.

## Getting started

1. Clone this repository
2. Run `npm install` from the root to install the dependencies
3. `cd packages/example-plugin`
4. Run `npm run dev` to start the development server for the example plugin.
5. Modify the example plugin to implement your features.

## Code generation

This repo is set up with [GraphQL Code Generator](https://www.graphql-code-generator.com/) to generate TypeScript types
for the schema extensions in your plugins. To generate the types, run `npm run generate` from the plugin directory:

```bash
cd packages/example-plugin
npm run codegen
```

This should be done whenever you:

- make changes to the schema extensions in your plugin (`/src/api/api-extensions.ts`)
- make changes to GraphQL queries or mutations in your e2e tests (in `/e2e/graphql/**.ts`)
- make changes to the GraphQL queries or mutations in your plugin's admin UI (in `/src/ui/**.ts`)

## Testing

End-to-end (e2e) tests are run using `npm run e2e` from the plugin directory. This will start a Vendure server with the
plugin installed, run the tests in the `e2e` directory, and then shut down the server.

```bash
cd packages/example-plugin
npm run e2e
```

## Publishing to NPM

1. Go to the directory of the plugin you want to publish, e.g. `cd packages/example-plugin`
2. `npm run build`
3. `npm publish`

For an in-depth guide on publishing to NPM and the Vendure Hub,
see our [Publishing a Plugin guide](https://docs.vendure.io/guides/how-to/publish-plugin/).

