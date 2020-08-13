/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createTestEnvironment, registerInitializer, SqljsInitializer } from '@vendure/testing';
import path from 'path';

import { ExamplePlugin } from '../plugin';

import { ADD_EXAMPLE } from './graphql/admin-e2e-definitions.graphql';
import { GET_EXAMPLES } from './graphql/shop-e2e-definitions.graphql';
import { TEST_SETUP_TIMEOUT_MS, testConfig } from './config/test-config';
import { initialData } from './config/e2e-initial-data';
import { AddExample } from './types/generated-admin-types';
import { GetExamples } from './types/generated-shop-types';

registerInitializer('sqljs', new SqljsInitializer(path.join(__dirname, '__data__')));

describe('example plugin', () => {
    const exampleName = 'exampleName';

    const { server, adminClient, shopClient } = createTestEnvironment({
        ...testConfig,
        plugins: [ExamplePlugin],
    });

    beforeAll(async () => {
        await server.init({
            initialData,
            productsCsvPath: path.join(__dirname, 'config/e2e-products.csv'),
            customerCount: 1,
            logging: true,
        });
        await adminClient.asSuperAdmin();
    }, TEST_SETUP_TIMEOUT_MS);

    afterAll(async () => {
        await server.destroy();
    });

    describe('admin api', () => {
        it('adds an example', async () => {
            const { addExample } = await adminClient.query<AddExample.Mutation, AddExample.Variables>(
                ADD_EXAMPLE,
                {
                    name: exampleName,
                },
            );

            expect(addExample?.name).toEqual(exampleName);
        });

        it('returns examples', async () => {
            const {
                examples: { items, totalItems },
            } = await shopClient.query<GetExamples.Query, GetExamples.Variables>(GET_EXAMPLES);

            expect(totalItems).toEqual(1);
            expect(items[0].name).toEqual(exampleName);
        });
    });

    describe('shop api', () => {
        it('returns examples', async () => {
            const {
                examples: { items, totalItems },
            } = await shopClient.query<GetExamples.Query, GetExamples.Variables>(GET_EXAMPLES);

            expect(totalItems).toEqual(1);
            expect(items[0].name).toEqual(exampleName);
        });
    });
});
