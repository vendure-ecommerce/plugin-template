import {CrudPermissionDefinition} from "@vendure/core";

/** @internal */
export const loggerCtx = "ExamplePlugin";
/** @internal */
export const PLUGIN_INIT_OPTIONS = Symbol("PLUGIN_INIT_OPTIONS");

/**
 * This permission gives access to CRUD operations on the Example entity.
 */
export const examplePermission = new CrudPermissionDefinition('Example')