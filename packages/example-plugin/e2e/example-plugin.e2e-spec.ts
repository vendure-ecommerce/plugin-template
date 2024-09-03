import { createTestEnvironment } from '@vendure/testing';
import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {ExamplePlugin} from "../src";
import path from "path";
import {initialData} from "../../../utils/e2e/e2e-initial-data";
import {ExampleQueryDocument} from "./types/generated-shop-types";
import {GetExampleEntityListDocument} from "./types/generated-admin-types";
import {testConfig} from "../../../utils/e2e/test-config";

describe('ExamplePlugin', () => {

    const {server, adminClient, shopClient} = createTestEnvironment({
        ...testConfig(8000),
        plugins: [ExamplePlugin.init({
            enabled: true,
        })],
    });

    beforeAll(async () => {
        await server.init({
            productsCsvPath: path.join(__dirname, '../../../utils/e2e/e2e-products-full.csv'),
            initialData: initialData,
            customerCount: 2,
        });
        await adminClient.asSuperAdmin();
    }, 60000);

    afterAll(async () => {
        await server.destroy();
    });

  it('exampleQuery returns the expected result', async () => {
      const result = await shopClient.query(ExampleQueryDocument);

      expect(result.exampleQuery).toBe('Hello! Your example plugin is set to enabled=true');
  });

  it('exampleEntities returns an empty list', async () => {
      const result = await adminClient.query(GetExampleEntityListDocument, {
          options: {}
      });

      expect(result.exampleEntities.totalItems).toBe(0);
      expect(result.exampleEntities.items).toEqual([]);
  });
});