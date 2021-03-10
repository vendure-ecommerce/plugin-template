/* eslint-disable @typescript-eslint/no-var-requires */
import { bootstrap, defaultConfig, JobQueueService, mergeConfig } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import { clearAllTables, populateCustomers } from '@vendure/testing';
import path from 'path';

import { headlessConfig } from './vendure-config';

// tslint:disable:no-console

const initialData = require(path.join(require.resolve('@vendure/create'), '../assets/initial-data.json'));

/**
 * A CLI script which populates the dev database with deterministic random data.
 */
if (require.main === module) {
    // Running from command line
    const populateConfig = mergeConfig(
        defaultConfig,
        mergeConfig(headlessConfig, {
            authOptions: {
                tokenMethod: 'bearer',
                requireVerification: false,
            },
            importExportOptions: {
                importAssetsDir: path.join(require.resolve('@vendure/create'), '../assets/images'),
            },
            customFields: {},
        }),
    );
    clearAllTables(populateConfig, true)
        .then(() =>
            populate(
                () =>
                    bootstrap(populateConfig).then(async (app) => {
                        await app.get(JobQueueService).start();
                        return app;
                    }),
                initialData,
                path.join(require.resolve('@vendure/create'), '../assets/products.csv'),
            ),
        )
        .then(async (app) => {
            console.log('populating customers...');
            await populateCustomers(10, populateConfig, true);
            return app.close();
        })
        .then(
            () => process.exit(0),
            (err) => {
                console.log(err);
                process.exit(1);
            },
        );
}
