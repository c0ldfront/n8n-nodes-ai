/* eslint-disable n8n-nodes-base/node-filename-against-convention */
// eslint-disable-next-line n8n-nodes-base/node-filename-against-convention
import { FileOptions } from '@supabase/storage-js';
import { createClient } from '@supabase/supabase-js';
import {
	BINARY_ENCODING,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
} from 'n8n-workflow';
// import { StorageClient } from '@supabase/storage-js';
import type { Readable } from 'stream';
// interface IReturnSupasebaseItem {
// 	id: string;
// 	type: string;
// 	name: string;
// 	size: string;
// 	path: string;
// 	public: boolean;
// }

/**
 * Ensures that the given URL ends with a single slash.
 * If the URL already ends with a slash, it is removed.
 * @param url - The URL to ensure has a single trailing slash.
 * @returns The URL with a single trailing slash.
 */
// function ensureSingleSlash(url: string): string {
// 	if (url.endsWith('/')) {
// 		return url.slice(0, -1); // Remove the trailing slash if it exists
// 	}
// 	return url;
// }

/**
 * Uploads a file to the specified bucket in Supabase Storage.
 * @param {string} bucketName - The name of the bucket to upload the file to.
 * @param {string} fileName - The name to give the uploaded file.
 * @param {Buffer} fileData - The data of the file to upload.
 * @param {SupabaseClient<any, string, any>} supabase - The Supabase client instance to use for the upload.
 */
// async function uploadFile(
// 	bucketName: string,
// 	fileName: string,
// 	fileData: Buffer,
// 	supabase: SupabaseClient<any, string, any>,
// 	mimeType: string,
// 	overWrite: boolean = false,
// 	// supabase: SupabaseClient<any, string, any>,
// ): Promise<any> {
// 	try {
// 		const { data, error: _error } = await supabase.storage
// 			.from(bucketName)
// 			.upload(fileName, fileData, { upsert: overWrite, contentType: mimeType });
// 		console.log(data);
// 		console.log(`File uploaded successfully: ${data}`);
// 		return data;
// 	} catch (error) {
// 		console.log('Error uploading file: ');
// 		console.error(error);
// 		return error;
// 	}
// }

// async function createBucket(bucketName: string, publicAccess: boolean, supabase: any) {
// 	const { data, error } = await supabase.storage.createBucket(bucketName, {
// 		public: publicAccess,
// 	});
// 	if (error) {
// 		console.log(error);
// 	} else {
// 		console.log(data);
// 	}
// }

export class StorageSupabase implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SupabaseStorage Node',
		name: 'supabaseStorage',
		icon: 'file:supabase.svg',
		group: ['input'],
		version: 1,
		description: 'Basic SupabaseStorage Node',
		defaults: {
			name: 'SupabaseStorage Node',
		},
		credentials: [
			{
				name: 'supabaseApi',
				required: true,
			},
		],
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Bucket Name',
				name: 'bucketName',
				type: 'string',
				default: '',
				placeholder: 'test_bucket',
				description: 'The name of the bucket to upload the file to',
			},
			{
				displayName: 'Overwrite',
				name: 'overWrite',
				type: 'boolean',
				default: false,
				description: 'Whether to overwrite file if it exists',
			},
			{
				displayName: 'Binary Data',
				name: 'binaryData',
				type: 'boolean',
				default: true,
				// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
				description: 'The text content of the file to upload',
			},
			{
				displayName: 'Binary Property',
				name: 'binaryPropertyName',
				type: 'string',
				default: 'data',
				description: 'Object property name which holds binary data',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = (await this.getCredentials('supabaseApi')) as {
			host: string;
			serviceRole: string;
		};
		const returnItems: INodeExecutionData[] = [];

		try {
			const supabase = createClient(credentials.host, credentials.serviceRole);

			const items = this.getInputData();
			for (let i = 0; i < items.length; i++) {
				const newItem: INodeExecutionData = {
					json: items[i].json,
					binary: {},
				};

				if (items[i].binary !== undefined && newItem.binary) {
					// Create a shallow copy of the binary data so that the old
					// data references which do not get changed still stay behind
					// but the incoming data does not get changed.
					Object.assign(newItem.binary, items[i].binary);
				}

				items[i] = newItem;

				// if (this.getNodeParameter('binaryData', i)) {
				// const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i);
				const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i);
				const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);

				let uploadData: Buffer | Readable;
				if (binaryData.id) {
					uploadData = await this.helpers.getBinaryStream(binaryData.id);
				} else {
					uploadData = Buffer.from(binaryData.data, BINARY_ENCODING);
				}

				// Properties
				// - bucketName
				// - overWrite
				// - publicAccess

				const bucketName = this.getNodeParameter('bucketName', i) as string;
				const overWrite = this.getNodeParameter('overWrite', i) as boolean;

				const fileOptions: FileOptions = {
					// cacheControl: '3600',
					contentType: binaryData.mimeType as string,
					// duplex: 'blob',
					upsert: overWrite as boolean,
				};

				const { error } = await supabase.storage
					.from(bucketName)
					.upload(binaryData?.fileName!, uploadData, fileOptions);
				if (error) {
					throw error;
				}
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(items[i]),
					{ itemData: { item: i } },
				);
				returnItems.push(...executionData);
			}
		} catch (error) {
			if (this.continueOnFail()) {
				return [[{ json: { error: error.message } }]];
			}

			throw error;
		}
		return [returnItems];
	}
}
