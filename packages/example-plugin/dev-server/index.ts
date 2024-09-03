import { bootstrap, JobQueueService } from "@vendure/core";
import { config } from "./vendure-config";

bootstrap(config)
  .then(async (app) => app.get(JobQueueService).start())
  .catch((err) => {
    console.log(err);
  });
