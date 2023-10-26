const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const rimraf = require('rimraf');

// Define absolute paths for original pkg and temporary pkg.
const ORIG_PKG_PATH = path.resolve(__dirname, '../package.json');
const CACHED_PKG_PATH = path.resolve(__dirname, './cached-package.json');

// Obtain original `package.json` contents.
const pkgData = require(ORIG_PKG_PATH);

// Get list of arguments passed to script.
const dryRun = process.argv.includes('--dryrun');
const publishPublic = process.argv.includes('--public');
const publishPrivate = process.argv.includes('--private');
const cleanCommand = process.argv.includes('--clean');

// Cache original `package.json` contents.
function findRootDir(currentDir) {
	console.log(`Looking for package.json in ${currentDir}`);
	if (fs.existsSync(path.join(currentDir, 'package.json'))) {
		console.log(`Found package.json in ${currentDir}`);
		return currentDir;
	}
	const parentDir = path.dirname(currentDir);
	if (parentDir === currentDir) {
		console.log('Root directory with package.json not found');
		throw new Error('Root directory with package.json not found');
	}
	console.log(`Looking for package.json in ${parentDir}`);
	return findRootDir(parentDir);
}

// Publish to repository
function publishToNpm(name, isPrivate) {
	pkgData.name = name;

	console.log(`Publishing ${pkgData.name}...`);

	if (fs.existsSync(ORIG_PKG_PATH)) {
		fs.writeFileSync(ORIG_PKG_PATH, JSON.stringify(pkgData, null, 2));
	} else {
		console.error(`Error: Cannot find file at ${ORIG_PKG_PATH}`);
	}

	// !dryRun && !isPrivate && deleteMaps();
	!isPrivate && deleteMaps();

	const accessFlag = isPrivate ? '--access private' : '';
	const publishCommand = dryRun ? 'npm publish --dry-run' : `npm publish ${accessFlag}`;

	console.log(`Executing: ${publishCommand}`);
	require('child_process').execSync(publishCommand, {
		cwd: findRootDir(__dirname),
		stdio: 'inherit',
	});

	console.log(`Publishing ${pkgData.name}... Done!`);
}

// Clean build
function cleanBuild() {
	console.log('Cleaning build...');
	rimraf.sync(path.resolve(__dirname, '../dist/'));
	console.log('Cleaning build... Done!');
}

//Delete map files
function deleteMaps() {
	console.log('Deleting map files...');
	fg.glob('dist/**/*.js.map').then((files) => {
		files.forEach((file) => {
			fs.unlinkSync(file);
		});
	});
	console.log('Deleting map files... Done!');
}

cleanBuild();

// // Calls deleteMaps() to delete map files
// deleteMaps(path.resolve(__dirname, '../dist/'));

if (publishPublic) {
	// Only publish to the public repository
	publishToNpm('n8n-nodes-ai', false);
} else if (publishPrivate) {
	// Only publish to the private repositories
	publishToNpm('@coldfront/n8n-nodes-ai', true);
} else {
	// Publish to both repositories
	publishToNpm('@coldfront/n8n-nodes-ai', true);
	publishToNpm('n8n-nodes-ai', false);
}

require('./restore-pkg');
