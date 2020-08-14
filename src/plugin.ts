import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';

import { PLUGIN_INIT_OPTIONS } from './constants';
import { ExampleEntity } from './entities/example.entity';
import { ExampleService } from './service/example.service';
import { adminApiExtensions, shopApiExtensions } from './api/api-extensions';
import { ExampleResolver } from './api/example.resolver';
import { ExampleAdminResolver } from './api/example-admin.resolver';
import { PluginInitOptions } from './types';

/**
 * An example Vendure plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     ExamplePlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */
@VendurePlugin({
    // Importing the PluginCommonModule gives all of our plugin's injectables (services, resolvers)
    // access to the Vendure core providers. See https://www.vendure.io/docs/typescript-api/plugin/plugin-common-module/
    imports: [PluginCommonModule],
    entities: [ExampleEntity],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [ExampleResolver, ExampleAdminResolver],
    },
    shopApiExtensions: {
        schema: shopApiExtensions,
        resolvers: [ExampleResolver],
    },
    providers: [
        ExampleService,
        // By definiting the `PLUGIN_INIT_OPTIONS` symbol as a provider, we can then inject the
        // user-defined options into other classes, such as the {@link ExampleService}.
        { provide: PLUGIN_INIT_OPTIONS, useFactory: () => ExamplePlugin.options },
    ],
})
export class ExamplePlugin {
    static options: PluginInitOptions;

    /**
     * The static `init()` method is a convention used by Vendure plugins which allows options
     * to be configured by the user.
     */
    static init(options: PluginInitOptions): ExamplePlugin {
        this.options = options;
        return ExamplePlugin;
    }

    static uiExtensions: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared' as const,
                ngModuleFileName: 'example-ui-extension.module.ts',
                ngModuleName: 'ExampleUiExtensionModule',
            },
            {
                type: 'lazy' as const,
                route: 'examples',
                ngModuleFileName: 'example-ui-lazy.module.ts',
                ngModuleName: 'ExampleUiLazyModule',
            },
        ],
    };
}
