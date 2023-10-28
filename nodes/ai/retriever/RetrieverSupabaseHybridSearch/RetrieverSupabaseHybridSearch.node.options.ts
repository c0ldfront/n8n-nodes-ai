import { INodeProperties } from 'n8n-workflow';

export const options: INodeProperties[] = [
	{
		displayName: 'Table Name',
		name: 'tableName',
		type: 'string',
		default: '',
		required: true,
		description: 'Name of the table to load from',
	},
	{
		displayName: 'Similarity Query Name',
		name: 'similarityQueryName',
		type: 'string',
		default: 'match_documents',
		required: true,
		description: 'Name of the query to use for matching documents',
	},
	{
		displayName: 'Keyword Query Name',
		name: 'keywordQueryName',
		type: 'string',
		default: 'kw_match_documents',
		required: true,
		description: 'Name of the query to use for matching documents',
	},
	{
		displayName: 'Similarity K',
		name: 'similarityK',
		type: 'number',
		default: 2,
		required: true,
	},
	{
		displayName: 'Keyword K',
		name: 'keywordK',
		type: 'number',
		default: 2,
		required: true,
	},
];
