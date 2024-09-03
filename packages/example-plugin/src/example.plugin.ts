import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import {exampleEntityAdminApiExtensions, shopSchema} from "./api/api-extensions";
import { ExampleShopResolver } from "./api/example-shop.resolver";

import {examplePermission, PLUGIN_INIT_OPTIONS} from "./constants";
import { ExampleOptions } from "./types";
import { ExampleEntity } from "./entities/example.entity";
import { ExampleEntityService } from "./services/example-entity.service";
import { ExampleAdminResolver } from "./api/example-admin.resolver";
import {ui} from "./ui";

/**
 * This is an example plugin that you can use as the basis for your own custom plugin.
 *
 * @category Plugin
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [
    {
      provide: PLUGIN_INIT_OPTIONS,
      useFactory: () => ExamplePlugin.options,
    },
    ExampleEntityService,
  ],
  shopApiExtensions: {
    resolvers: [ExampleShopResolver],
    schema: shopSchema,
  },
  adminApiExtensions: {
    resolvers: [ExampleAdminResolver],
    schema: exampleEntityAdminApiExtensions,
  },
  entities: [ExampleEntity],
  configuration: config => {
    config.authOptions.customPermissions.push(examplePermission);
    return config;
  },
  compatibility: '>=3.0.0'
})
export class ExamplePlugin {
  /** @internal */
  static options: ExampleOptions;

  static uiExtensions = ui;

  /**
   * The static `init()` method is called with the options to
   * configure the plugin.
   *
   * @example
   * ```ts
   * ExamplePlugin.init({
   *     enabled: true,
   * }),
   * ```
   */
  static init(options: ExampleOptions) {
    this.options = options;
    return ExamplePlugin;
  }
}
