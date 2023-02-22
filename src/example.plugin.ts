import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { gql } from "graphql-tag";
import { PLUGIN_INIT_OPTIONS } from "./constants";
import { ExampleResolver } from "./example.resolver";

export interface ExampleOptions {
  enabled: boolean;
}

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    {
      provide: PLUGIN_INIT_OPTIONS,
      useFactory: () => ExamplePlugin.options,
    },
  ],
  shopApiExtensions: {
    resolvers: [ExampleResolver],
    schema: gql`
      extend type Query {
        exampleQuery: String!
      }
    `,
  },
})
export class ExamplePlugin {
  static options: ExampleOptions;

  static init(options: ExampleOptions) {
    this.options = options;
    return ExamplePlugin;
  }
}
