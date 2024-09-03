import { SimpleGraphQLClient } from '@vendure/testing';
import gql from "graphql-tag";

export const GET_RUNNING_JOBS = gql`
    query GetRunningJobs($options: JobListOptions) {
        jobs(options: $options) {
            items {
                id
                queueName
                state
                isSettled
                duration
            }
            totalItems
        }
    }
`;

/**
 * For mutation which trigger background jobs, this can be used to "pause" the execution of
 * the test until those jobs have completed;
 */
export async function awaitRunningJobs(
    adminClient: SimpleGraphQLClient,
    timeout: number = 5000,
    delay = 100,
) {
    let runningJobs = 0;
    const startTime = +new Date();
    let timedOut = false;
    // Allow a brief period for the jobs to start in the case that
    // e.g. event debouncing is used before triggering the job.
    await new Promise(resolve => setTimeout(resolve, delay));
    do {
        const { jobs } = await adminClient.query(GET_RUNNING_JOBS, {
            options: {
                filter: {
                    isSettled: {
                        eq: false,
                    },
                },
            },
        });
        runningJobs = jobs.totalItems;
        timedOut = timeout < +new Date() - startTime;
    } while (runningJobs > 0 && !timedOut);
}
