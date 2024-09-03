import path from "path";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

const packageDir = process.env.PACKAGE;

export default defineConfig({
  test: {
    root: path.join(__dirname, "../../packages"),
    watch: false,
    include: [
      packageDir
        ? ["**", packageDir, "**/*.(e2e-)?spec.ts"].join("/")
        : "**/*.(e2e-)?spec.ts",
    ],
    /**
     * For local debugging of the e2e tests, we set a very long timeout value otherwise tests will
     * automatically fail for going over the 5 second default timeout.
     */
    testTimeout: process.env.E2E_DEBUG
      ? 1800 * 1000
      : process.env.CI
        ? 30 * 1000
        : 15 * 1000,
    typecheck: {
      tsconfig: path.join(__dirname, "tsconfig.e2e.json"),
    },
    // In jobs-queue.e2e-spec.ts, we use `it.only()` for sqljs, so we need this
    // set to true to avoid failures in CI.
    allowOnly: true,
    server: {
      deps: {
        // To prevent "realm" graphql error
        // https://github.com/vitejs/vite/issues/7879#issuecomment-1349079757
        fallbackCJS: true,
      },
    },
  },
  // https://github.com/graphql/graphql-js/issues/2801#issuecomment-1846206543
  resolve: {
    alias: {
      graphql: "graphql/index.js",
    },
  },
  plugins: [
    // SWC required to support decorators used in test plugins
    // See https://github.com/vitest-dev/vitest/issues/708#issuecomment-1118628479
    // Vite plugin
    swc.vite({
      jsc: {
        transform: {
          // See https://github.com/vendure-ecommerce/vendure/issues/2099
          useDefineForClassFields: false,
        },
      },
    }),
  ],
});
