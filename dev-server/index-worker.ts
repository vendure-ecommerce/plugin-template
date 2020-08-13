import { bootstrapWorker, VendureConfig } from '@vendure/core';
import { config } from './vendure-config';

const workerConfig: VendureConfig = {
    ...config,
    workerOptions: {
        options: {
            host: process.env.WORKER_REMOTE ? '0.0.0.0' : 'localhost',
            port: Number(process.env.WORKER_PORT) || 3020,
        },
    },
};

bootstrapWorker(workerConfig).catch((err) => {
    // tslint:disable-next-line:no-console
    console.log(err);
});
