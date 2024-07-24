import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { shopSchema } from "./api/api-extensions";
import { ExampleResolver } from "./api/example.resolver";

import { PLUGIN_INIT_OPTIONS } from "./constants";
import { ExampleOptions } from "./types";

/**
 * @description
 * This is an example plugin that you can use as the basis for your own custom plugin.
 */
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
    schema: shopSchema,
  },
})
export class ExamplePlugin {
  static options: ExampleOptions;

  static init(options: ExampleOptions) {
    this.options = options;
    return ExamplePlugin;
  }
}
