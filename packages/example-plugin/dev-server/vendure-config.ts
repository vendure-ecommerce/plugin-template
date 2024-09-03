import { DefaultSearchPlugin, VendureConfig } from "@vendure/core";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import "dotenv/config";
import path from "path";
import { ExamplePlugin } from "../src";
import { compileUiExtensions } from "@vendure/ui-devkit/compiler";

const apiPort = process.env.API_PORT || 3000;

export const config: VendureConfig = {
  apiOptions: {
    port: +apiPort,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    shopApiPlayground: true,
    adminApiPlayground: true,
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    superadminCredentials: {
      identifier: "superadmin",
      password: "superadmin",
    },
  },
  dbConnectionOptions: {
    type: "better-sqlite3",
    synchronize: true,
    migrations: [path.join(__dirname, "../migrations/*.+(js|ts)")],
    logging: false,
    database: path.join(__dirname, "vendure.sqlite"),
  },
  paymentOptions: {
    paymentMethodHandlers: [],
  },
  plugins: [
    DefaultSearchPlugin.init({}),
    ExamplePlugin.init({
      enabled: true,
    }),
    AdminUiPlugin.init({
      port: 3002,
      route: "admin",
      adminUiConfig: {
        apiPort: +apiPort,
        apiHost: "http://localhost",
      },
      app: compileUiExtensions({
        devMode: true,
        extensions: [ExamplePlugin.uiExtensions],
        outputPath: path.join(__dirname, "./admin-ui"),
      }),
    }),
  ],
};
