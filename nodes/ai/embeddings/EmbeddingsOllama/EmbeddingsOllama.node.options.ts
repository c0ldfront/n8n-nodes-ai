import { INodeProperties } from 'n8n-workflow';

export const options: INodeProperties[] = [
	{
		displayName:
			'The Ollama model we use for generating embeddings is using 4096-dimensional embeddings. Please make sure to use the same dimensionality for your vector store.',
		name: 'notice',
		type: 'notice',
		default: '',
	},
	{
		displayName: 'Models',
		name: 'model',
		type: 'options',
		// eslint-disable-next-line n8n-nodes-base/node-param-default-wrong-for-options
		default: 'llama2:latest',
		description: 'The model to use for embeddings',
		typeOptions: {
			loadOptions: {
				routing: {
					request: {
						method: 'GET',
						url: '/api/tags',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'models',
								},
							},
							{
								type: 'setKeyValue',
								properties: {
									name: '={{$responseItem.name}}',
									value: '={{$responseItem.name}}',
								},
							},
							{
								type: 'sort',
								properties: {
									key: 'name',
								},
							},
						],
					},
				},
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'model',
			},
		},
		required: true,
	},
	{
		displayName: 'Options',
		name: 'options',
		placeholder: 'Add Option',
		description: 'Additional options to add',
		type: 'collection',
		default: {},
		options: [
			{
				displayName: 'Base URL',
				name: 'baseURL',
				default: 'http://localhost:11434',
				description: 'Override the default base URL for the API',
				type: 'string',
			},
			{
				displayName: 'Max Retries',
				name: 'maxRetries',
				default: 0,
				description: 'Maximum amount of time a request is allowed to retry before failure',
				type: 'number',
			},
			{
				displayName: 'Max Concurrency',
				name: 'maxConcurrency',
				default: 0,
				description: 'Maximum amount of concurrency connections allowed to process',
				type: 'number',
			},
			{
				displayName: 'Embedding Only',
				name: 'embeddingOnly',
				default: false,
				description: 'Whether to generate embeddings only',
				type: 'boolean',
			},
			{
				displayName: 'F16 Key-Value',
				name: 'f16Kv',
				default: false,
				description: 'Whether to use F16 key-value',
				type: 'boolean',
			},
			{
				displayName: 'Frequency Penalty',
				name: 'frequencyPenalty',
				default: 0,
				description: 'Frequency penalty value',
				type: 'number',
			},
			{
				displayName: 'Logits All',
				name: 'logitsAll',
				default: false,
				description: 'Whether to use Logits for all values',
				type: 'boolean',
			},
			{
				displayName: 'Low VRAM',
				name: 'lowVram',
				default: false,
				description: 'Whether to use low VRAM',
				type: 'boolean',
			},
			{
				displayName: 'Main GPU',
				name: 'mainGpu',
				default: 0,
				description: 'Number representing the main GPU',
				type: 'number',
			},
			{
				displayName: 'Mirostat',
				name: 'mirostat',
				default: 0,
				description: 'Mirostat value',
				type: 'number',
			},
			{
				displayName: 'Mirostat ETA',
				name: 'mirostatEta',
				default: 0,
				description: 'Mirostat ETA value',
				type: 'number',
			},
			{
				displayName: 'Mirostat Tau',
				name: 'mirostatTau',
				default: 0,
				description: 'Mirostat Tau value',
				type: 'number',
			},
			{
				displayName: 'Num Batch',
				name: 'numBatch',
				default: 0,
				description: 'Number of batches',
				type: 'number',
			},
			{
				displayName: 'Num Context',
				name: 'numCtx',
				default: 0,
				description: 'Number of contexts',
				type: 'number',
			},
			{
				displayName: 'Num GPU',
				name: 'numGpu',
				default: 0,
				description: 'Number of GPUs',
				type: 'number',
			},
			{
				displayName: 'Num GQA',
				name: 'numGqa',
				default: 0,
				description: 'Number of GQAs',
				type: 'number',
			},
			{
				displayName: 'Num Keep',
				name: 'numKeep',
				default: 0,
				description: 'Number to keep',
				type: 'number',
			},
			{
				displayName: 'Num Thread',
				name: 'numThread',
				default: 0,
				description: 'Number of threads',
				type: 'number',
			},
			{
				displayName: 'Penalize Newline',
				name: 'penalizeNewline',
				default: false,
				description: 'Whether to penalize newline',
				type: 'boolean',
			},
			{
				displayName: 'Presence Penalty',
				name: 'presencePenalty',
				default: 0,
				description: 'Presence penalty value',
				type: 'number',
			},
			{
				displayName: 'Repeat Last N',
				name: 'repeatLastN',
				default: 0,
				description: 'Repeat last N values',
				type: 'number',
			},
			{
				displayName: 'Repeat Penalty',
				name: 'repeatPenalty',
				default: 0,
				description: 'Repeat penalty value',
				type: 'number',
			},
			{
				displayName: 'Rope Frequency Base',
				name: 'ropeFrequencyBase',
				default: 0,
				description: 'Rope frequency base value',
				type: 'number',
			},
			{
				displayName: 'Rope Frequency Scale',
				name: 'ropeFrequencyScale',
				default: 0,
				description: 'Rope frequency scale value',
				type: 'number',
			},
			{
				displayName: 'Temperature',
				name: 'temperature',
				default: 0,
				description: 'Temperature value',
				type: 'number',
			},
			{
				displayName: 'Stop',
				name: 'stop',
				default: '',
				description: 'Stop criteria (string array)',
				type: 'string',
			},
			{
				displayName: 'TFS Z',
				name: 'tfsZ',
				default: 0,
				description: 'TFS Z value',
				type: 'number',
			},
			{
				displayName: 'Top K',
				name: 'topK',
				default: 0,
				description: 'Top K value',
				type: 'number',
			},
			{
				displayName: 'Top P',
				name: 'topP',
				default: 0,
				description: 'Top P value',
				type: 'number',
			},
			{
				displayName: 'Typical P',
				name: 'typicalP',
				default: 0,
				description: 'Typical P value',
				type: 'number',
			},
			{
				displayName: 'Use Mlock',
				name: 'useMlock',
				default: false,
				description: 'Whether to use Mlock option',
				type: 'boolean',
			},
			{
				displayName: 'Use Mmap',
				name: 'useMmap',
				default: false,
				description: 'Whether to use Mmap option',
				type: 'boolean',
			},
			{
				displayName: 'Vocab Only',
				name: 'vocabOnly',
				default: false,
				description: 'Whether to use vocabulary only',
				type: 'boolean',
			},
		],
	},
];
