import { dest, parallel, src, watch as gulpWatch } from 'gulp';

const UI_EXTENSION_FILES = ['**/ui/**/*'];

function copyUiExtensionsSource() {
    return src(UI_EXTENSION_FILES, { cwd: 'src' }).pipe(dest('lib/src'));
}
export const build = parallel(copyUiExtensionsSource);

function copyToDist(filePath: string) {
    console.log('copyToDist', filePath);
    src(filePath, { cwd: 'src' }).pipe(dest('lib/src'));
}

export function watch() {
    const watcher = gulpWatch(UI_EXTENSION_FILES, { cwd: 'src' });
    watcher.on('change', copyToDist);
    watcher.on('add', copyToDist);
    return new Promise(() => {});
}
