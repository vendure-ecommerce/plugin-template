import { VendureConfig } from "@vendure/core";
import "dotenv/config";
import path from "path";
import { ExamplePlugin } from "../src";

export const config: VendureConfig = {
  apiOptions: {
    port: 3123,
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
    database: path.join(__dirname, "../vendure.sqlite"),
  },
  paymentOptions: {
    paymentMethodHandlers: [],
  },
  plugins: [
    ExamplePlugin.init({
      enabled: true,
    }),
  ],
};
