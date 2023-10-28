/* eslint-disable n8n-nodes-base/node-dirname-against-convention */
import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'n8n-workflow';
import { callMethodAsync } from '@n8n/n8n-nodes-langchain/dist/utils/logWrapper';
import { SupabaseHybridSearch } from 'langchain/retrievers/supabase';
import { createClient } from '@supabase/supabase-js';
import { BaseCallbackConfig, Callbacks } from 'langchain/dist/callbacks/manager';
import { Document } from 'langchain/document';
import { Embeddings } from 'langchain/embeddings/base';
import { proxyLogWrapper } from '../../../common/SharedUtilities';
import { options } from './RetrieverSupabaseHybridSearch.node.options';

export class RetrieverSupabaseHybridSearch implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'SupabaseHybridSearch Retriever',
		name: 'retrieverSupabaseHybridSearch',
		icon: 'file:supabase.svg',
		group: ['transform'],
		version: 1,
		description: 'Use a SupabaseHybridSearch as Retriever',
		defaults: {
			name: 'SupabaseHybridSearch Retriever',
		},
		credentials: [
			{
				name: 'supabaseApi',
				required: true,
			},
		],
		codex: {
			categories: ['AI'],
			subcategories: {
				AI: ['Retrievers'],
			},
			resources: {
				primaryDocumentation: [
					{
						url: '#',
					},
				],
			},
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [
			{
				displayName: 'Embeddings',
				maxConnections: 1,
				type: NodeConnectionType.AiEmbedding,
				required: true,
			},
		],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiRetriever],
		outputNames: ['Retriever'],
		properties: options,
	};

	async supplyData(this: IExecuteFunctions, itemIndex: number): Promise<SupplyData> {
		this.logger.verbose('Supplying data for SupabaseHybridSearch Retriever');

		const credentials = (await this.getCredentials('supabaseApi')) as {
			host: string;
			serviceRole: string;
		};

		const tableName = this.getNodeParameter('tableName', itemIndex) as string;
		const similarityQueryName = this.getNodeParameter('similarityQueryName', itemIndex) as string;
		const keywordQueryName = this.getNodeParameter('keywordQueryName', itemIndex) as string;
		const similarityK = this.getNodeParameter('similarityK', itemIndex) as number;
		const keywordK = this.getNodeParameter('keywordK', itemIndex) as number;
		const client = createClient(credentials.host, credentials.serviceRole);

		const embeddings = (await this.getInputConnectionData(
			NodeConnectionType.AiEmbedding,
			itemIndex,
		)) as Embeddings;

		const retriever = new SupabaseHybridSearch(embeddings, {
			client,
			similarityK: similarityK,
			keywordK: keywordK,
			tableName: tableName,
			similarityQueryName: similarityQueryName,
			keywordQueryName: keywordQueryName,
		});

		return {
			response: proxyLogWrapper(
				retriever,
				this,
				(target, prop, executeFunctions, connectionType) => {
					if (prop === 'getRelevantDocuments' && 'getRelevantDocuments' in target) {
						return async (
							query: string,
							config?: Callbacks | BaseCallbackConfig,
						): Promise<Document[]> => {
							connectionType = NodeConnectionType.AiRetriever;
							const { index } = executeFunctions.addInputData(connectionType, [
								[{ json: { query, config } }],
							]);

							const response = (await callMethodAsync.call(target, {
								executeFunctions,
								connectionType,
								currentNodeRunIndex: index,
								method: target[prop],
								arguments: [query, config],
							})) as Array<Document<Record<string, any>>>;

							executeFunctions.addOutputData(connectionType, index, [[{ json: { response } }]]);
							return response;
						};
					}
					return undefined;
				},
			),
		};
	}
}
