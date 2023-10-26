import fs from 'fs';
import csv from 'csv-parser';

// function toCamelCase(str: string): string {
// 	return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
// }

// function toCamelCase(str: string) {
// 	// Using replace method with regEx
// 	return str
// 		.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word: string, index: number) {
// 			return index == 0 ? word.toLowerCase() : word.toUpperCase();
// 		})
// 		.replace(/\s+/g, '');
// }

function toCamelCase(str: string): string {
	return str
		.replace(/_([a-z])/g, (g) => g[1].toUpperCase()) // Convert snake_case to camelCase
		.replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()); // Convert other non-alphanumeric patterns to camelCase
}

function typeFor(rowType: string): string {
	switch (rowType) {
		case 'number':
			return 'number';
		case 'boolean':
			return 'boolean';
		case 'string':
			return 'string';
		default:
			return 'any'; // Default case if other types come up in the future
	}
}

function convertOptions(filePath: string) {
	const options: [] = [];
	const typeDef: { [key: string]: string } = {};

	fs.createReadStream(filePath)
		.pipe(csv())
		.on('data', (row: any) => {
			const camelName = toCamelCase(row.name);
			row.name = camelName;
			typeDef[camelName] = typeFor(row.type);

			switch (row.type) {
				case 'number':
					row.default = Number(row.default);
					break;
				case 'boolean':
					row.default = row.default.toLowerCase() === 'true';
					break;
				// Add more cases if necessary
			}

			// @ts-ignore
			options.push(row);
		})
		.on('end', () => {
			// console.log(JSON.stringify(options, null, 4));

			// Print TypeScript type definition
			const typeLines = Object.entries(typeDef)
				.map(([name, type]) => `${name}?: ${type};`)
				.join('\n');
			console.log(`type OptionsType = {\n${typeLines}\n};`);
		});
}

(() => {
	convertOptions('../resources/options.csv');
})();
