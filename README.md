# Vendure plugin template

1. Copy this directory and rename to `vendure-plugin-YOUR-PLUGIN-NAME`
2. Update the `name` and `description` field in `package.json`
4. Update this Readme: What does the plugin do? How can someone use your plugin in their project?
5. Run `yarn` to install the dependencies
6. Run `yarn start` to start the server

The admin is now available at `http://localhost:3050/admin`. Login with _superadmin/superadmin_

The shop GraphQL `http://localhost:3050/shop-api`. Here you can test your custom GraphQL query:
```graphql
{
  exampleQuery
}
```

## Testing

1. Run `yarn test` to run the e2e test.
2. Don't forget to implement your own!

## Publishing to NPM

1. Make sure you are [logged in to NPM](https://docs.npmjs.com/cli/v9/commands/npm-login)
2. `yarn build`
3. `yarn publish`

That's it!

(Maybe share your accomplishments in the [Vendure slack](https://join.slack.com/t/vendure-ecommerce/shared_invite/zt-1exzio25w-vjL5TYkyJZjK52d6jkOsIA)?

## Next steps

1. Check out [the docs](https://www.vendure.io/docs/plugins/) to see the possibilities of a plugin
2. Check out [GraphQL codegen](https://the-guild.dev/graphql/codegen) to generate Typescript types for your custom GraphQL types
