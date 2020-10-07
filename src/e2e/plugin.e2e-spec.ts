/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createTestEnvironment, registerInitializer, SqljsInitializer } from '@vendure/testing';
import path from 'path';

import { ExamplePlugin } from '../plugin';

import { ADD_EXAMPLE, UPDATE_EXAMPLE } from './graphql/admin-e2e-definitions.graphql';
import { GET_EXAMPLES, GET_EXAMPLE } from './graphql/shop-e2e-definitions.graphql';
import { TEST_SETUP_TIMEOUT_MS, testConfig } from './config/test-config';
import { initialData } from './config/e2e-initial-data';
import { AddExample, UpdateExample } from './types/generated-admin-types';
import { GetExamples, GetExample } from './types/generated-shop-types';

registerInitializer('sqljs', new SqljsInitializer(path.join(__dirname, '__data__')));

describe('example plugin', () => {
    const exampleName = 'exampleName';
    let exampleId: string;

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
            const initialName = 'initialName';
            const {
                addExample: { id, name },
            } = await adminClient.query<AddExample.Mutation, AddExample.Variables>(ADD_EXAMPLE, {
                input: {
                    name: initialName,
                },
            });

            exampleId = id;
            expect(name).toEqual(initialName);
        });

        it('updates an example', async () => {
            const {
                updateExample: { name },
            } = await adminClient.query<UpdateExample.Mutation, UpdateExample.Variables>(UPDATE_EXAMPLE, {
                input: {
                    id: exampleId,
                    name: exampleName,
                },
            });

            expect(name).toEqual(exampleName);
        });

        it('returns a list of examples', async () => {
            const {
                examples: { items, totalItems },
            } = await adminClient.query<GetExamples.Query, GetExamples.Variables>(GET_EXAMPLES);

            expect(totalItems).toEqual(1);
            expect(items[0].name).toEqual(exampleName);
        });

        it('returns a single example', async () => {
            const { example } = await adminClient.query<GetExample.Query, GetExample.Variables>(GET_EXAMPLE, {
                id: '1',
            });

            expect(example?.name).toEqual(exampleName);
        });
    });

    describe('shop api', () => {
        it('returns a list of examples', async () => {
            const {
                examples: { items, totalItems },
            } = await shopClient.query<GetExamples.Query, GetExamples.Variables>(GET_EXAMPLES);

            expect(totalItems).toEqual(1);
            expect(items[0].name).toEqual(exampleName);
        });

        it('returns a single example', async () => {
            const { example } = await shopClient.query<GetExample.Query, GetExample.Variables>(GET_EXAMPLE, {
                id: '1',
            });

            expect(example?.name).toEqual(exampleName);
        });
    });
});
