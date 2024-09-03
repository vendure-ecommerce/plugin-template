import { generateTypes } from "../../utils/generate-types";
import path from "path";
import { ExamplePlugin } from "./src";

require("dotenv").config({ path: path.join(__dirname, "../dev-server/.env") });

generateTypes(
  {
    plugins: [
      ExamplePlugin.init({
        enabled: true,
      }),
    ],
  },
  {
    pluginDir: __dirname,
    e2e: true,
    ui: false,
  },
).then(() => process.exit(0));
