const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, '../patches');
const targetDir = path.resolve(__dirname, '../dist/patches');

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
	fs.mkdirSync(targetDir, { recursive: true });
}

// Function to copy files
function copyFiles(source, target) {
	const files = fs.readdirSync(source);

	for (const file of files) {
		const sourceFile = path.join(source, file);
		const targetFile = path.join(target, file);

		const stat = fs.statSync(sourceFile);
		if (stat.isDirectory()) {
			if (!fs.existsSync(targetFile)) {
				fs.mkdirSync(targetFile);
			}
			copyFiles(sourceFile, targetFile);
		} else {
			fs.copyFileSync(sourceFile, targetFile);
		}
	}
}

copyFiles(sourceDir, targetDir);
