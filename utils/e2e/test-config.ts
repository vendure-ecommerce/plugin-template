import { mergeConfig } from "@vendure/core";
import {
  MysqlInitializer,
  PostgresInitializer,
  registerInitializer,
  SqljsInitializer,
  testConfig as defaultTestConfig,
} from "@vendure/testing";
import path from "path";
import { DataSourceOptions } from "typeorm";

/**
 * We use a relatively long timeout on the initial beforeAll() function of the
 * e2e tests because on the first run (and always in CI) the sqlite databases
 * need to be generated, which can take a while.
 */
export const TEST_SETUP_TIMEOUT_MS = process.env.E2E_DEBUG
  ? 1800 * 1000
  : 120000;

registerInitializer(
  "sqljs",
  new SqljsInitializer(path.join(__dirname, "__sqlite-data__")),
);
registerInitializer("postgres", new PostgresInitializer());
registerInitializer("mysql", new MysqlInitializer());
registerInitializer("mariadb", new MysqlInitializer());

export const testConfig = (port: number) => {
  return mergeConfig(defaultTestConfig, {
    apiOptions: {
      port,
    },
    dbConnectionOptions: getDbConfig(),
  });
};

function getDbConfig(): DataSourceOptions {
  const dbType = process.env.DB || "sqljs";
  switch (dbType) {
    case "postgres":
      return {
        synchronize: true,
        type: "postgres",
        host: "127.0.0.1",
        port: 5432,
        username: process.env.DB_USER ?? "admin",
        password: process.env.DB_PASSWORD ?? "secret",
      };
    case "mariadb":
      return {
        synchronize: true,
        type: "mariadb",
        host: "127.0.0.1",
        port: 3306,
        username: process.env.DB_USER ?? "admin",
        password: process.env.DB_PASSWORD ?? "secret",
      };
    case "mysql":
      return {
        synchronize: true,
        type: "mysql",
        host: "127.0.0.1",
        port: 3306,
        username: process.env.DB_USER ?? "admin",
        password: process.env.DB_PASSWORD ?? "secret",
      };
    case "sqljs":
    default:
      return defaultTestConfig.dbConnectionOptions;
  }
}
