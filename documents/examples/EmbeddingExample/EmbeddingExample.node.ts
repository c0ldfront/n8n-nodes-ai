/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'n8n-workflow';

export class EmbeddingExample implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Embeddings Example',
		name: 'embeddingExample',
		icon: 'file:placeholder.svg',
		group: ['transform'],
		version: 1,
		description: 'Use Embeddings Example',
		defaults: {
			name: 'Embeddings Example',
		},

		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Embeddings'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: 'https://docs.n8n.io/integrations/builtin/cluster-nodes/sub-nodes/n8n-nodes-langchain.embeddingstensorflow/',
					},
				],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiEmbedding],
		outputNames: ['Embeddings'],
		properties: [
			{
				displayName:
					'The Example model we use for generating embeddings is using 512-dimensional embeddings. Please make sure to use the same dimensionality for your vector store. Be aware that running this model with high-dimensional embeddings may result in high CPU usage on the machine.',
				name: 'notice',
				type: 'notice',
				default: '',
			},
		],
	};

	async supplyData(this: IExecuteFunctions): Promise<SupplyData> {
		this.logger.verbose('Supply data for Embeddings Example');
		this.logger.verbose('Supply data for embeddings');
		return {
			response: null,
		};
	}
}
