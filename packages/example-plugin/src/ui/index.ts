import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';
import fs from 'fs';

let extensionPath: string;
try {
    const devModeExtensionPath = path.join(process.cwd(), 'packages/example-plugin/src/ui');
    fs.accessSync(devModeExtensionPath);
    extensionPath = devModeExtensionPath;
} catch (e: any) {
    extensionPath = __dirname;
}

export const ui: AdminUiExtension = {
    extensionPath,
    id: 'example-plugin',
    providers: ['providers.ts'],
    routes: [
        {
            route: 'example',
            filePath: 'routes.ts',
        }
    ]
};
