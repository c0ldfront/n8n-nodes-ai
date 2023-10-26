const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');

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
// Calls deleteMaps() to delete map files
deleteMaps(path.resolve(__dirname, '../dist/'));
