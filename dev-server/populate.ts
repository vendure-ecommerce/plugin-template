import { bootstrap, defaultConfig, mergeConfig } from '@vendure/core';
import { populate } from '@vendure/core/cli';
import { clearAllTables, populateCustomers } from '@vendure/testing';
import path from 'path';

import { initialData } from './mock-data/data-sources/initial-data';

import { headlessConfig } from './vendure-config';

// tslint:disable:no-console

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
                importAssetsDir: path.join(__dirname, './mock-data/assets'),
            },
            workerOptions: {
                runInMainProcess: true,
            },
            customFields: {},
        }),
    );
    clearAllTables(populateConfig, true)
        .then(() =>
            populate(
                () => bootstrap(populateConfig),
                initialData,
                path.join(__dirname, './mock-data/data-sources/products.csv'),
            ),
        )
        .then(async app => {
            console.log('populating customers...');
            await populateCustomers(10, populateConfig, true);
            return app.close();
        })
        .then(
            () => process.exit(0),
            err => {
                console.log(err);
                process.exit(1);
            },
        );
}