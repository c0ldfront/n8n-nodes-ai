const fs = require('fs');
const path = require('path');

// Define absolute paths for original pkg and temporary pkg.
const ORIG_PKG_PATH = path.resolve(__dirname, '../package.json');
const CACHED_PKG_PATH = path.resolve(__dirname, './cached-package.json');

// Obtain original `package.json` contents.
const pkgData = require(ORIG_PKG_PATH);

// if (process.argv.length <= 2) {
// 	throw new Error('Missing npm scripts key/name argument(s)');
// }

// Get list of arguments passed to script.
// const scriptsToRemove = process.argv[2].split(',');
// const devDepsToRemove = process.argv[3] ? process.argv[3].split(',') : [];
// "build:icons": "gulp build:icons",
// "build:clean": "rimraf dist",
// "build:prod": "tsc --project tsconfig.prod.json && npm run build:icons",
// "copy:assets": "node .scripts/copy-assets.js",

let scriptsToRemove =
	'lintfix,lint,format,dev,build,prepublish,postpublish,prepublishOnly,package:clean,build:icons,build:clean,build:prod,copy:assets'.split(
		',',
	);
let devDepsToRemove =
	'csv-parser,prettier,gulp,rimraf,eslint-plugin-n8n-nodes-base,@typescript-eslint/parser,fast-glob'.split(
		',',
	);

// Write/cache the original `package.json` data to `cached-package.json` file.
fs.writeFile(CACHED_PKG_PATH, JSON.stringify(pkgData, null, 2), function (err) {
	if (err) throw err;
});

// Remove the specified named scripts from the scripts section.
scriptsToRemove.forEach(function (scriptName) {
	delete pkgData.scripts[scriptName];
});

// Remove the specified named pkgs from the devDependencies section.
devDepsToRemove.forEach(function (pkgName) {
	delete pkgData.devDependencies[pkgName];
});

delete pkgData.volta;

// Overwrite original `package.json` with new data (i.e. minus the specific data).
fs.writeFile(ORIG_PKG_PATH, JSON.stringify(pkgData, null, 2), function (err) {
	if (err) throw err;
});
