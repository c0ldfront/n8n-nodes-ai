const { createClient } = require('@supabase/supabase-js');
const { Buffer } = require('node:buffer');

// Create Supabase client
const supabase = createClient(
	'http://10.0.0.246:54321',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
);

// Upload file using standard upload
async function uploadFile(filePath, file) {
	try {
		const { data, error } = await supabase.storage
			.from('documents')
			.upload(filePath, Buffer.from(file, 'base64'), {
				contentType: 'application/pdf',
				upsert: true,
			});
		if (error) {
			console.log(error);
		} else {
			console.log('finished upload');
		}
	} catch (error) {
		console.log(error);
	}
}

const fileName = $binary.data.fileName;
const fileDirectory = $binary.data.directory;

const fullFilePath = fileDirectory + '/' + fileName;

// console.log($input.item.binary.data.data)
// console.log(fileName)
// console.log(fileDirectory)
// console.log(fullFilePath)

uploadFile(fullFilePath, $input.item.binary.data.data);

// Loop over input items and add a new field called 'myNewField' to the JSON of each one
// for (const item of $input.all()) {
//   item.json.myNewField = 1;
// }

// return $input.all();
return {};
