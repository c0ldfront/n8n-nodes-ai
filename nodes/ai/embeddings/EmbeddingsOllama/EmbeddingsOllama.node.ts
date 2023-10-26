import {
	NodeConnectionType,
	type IExecuteFunctions,
	type INodeType,
	type INodeTypeDescription,
	type SupplyData,
} from 'n8n-workflow';
import { OllamaEmbeddings } from 'langchain/embeddings/ollama';
import { logWrapper } from '@n8n/n8n-nodes-langchain/dist/utils/logWrapper';
import { Embeddings } from 'langchain/embeddings/base';
import { options } from './EmbeddingsOllama.node.options';
import { OllamaNodeOptionsParams } from './EmbeddingsOllama.node.interfaces';

export class EmbeddingsOllama implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Embeddings Ollama',
		name: 'embeddingsOllama',
		icon: 'file:ollama.svg',
		group: ['transform'],
		version: 1,
		description: 'Use Embeddings Ollama',
		defaults: {
			name: 'Embeddings Ollama',
		},
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [],
		// eslint-disable-next-line n8n-nodes-base/node-class-description-outputs-wrong
		outputs: [NodeConnectionType.AiEmbedding],
		outputNames: ['Embeddings'],
		credentials: [
			{
				name: 'ollamaApi',
				required: true,
			},
		],
		requestDefaults: {
			ignoreHttpStatusErrors: true,
			baseURL: '={{ $credentials.baseUrl.replace(new RegExp("/$"), "") }}',
		},
		properties: options,
	};

	async supplyData(this: IExecuteFunctions, itemIndex: number): Promise<SupplyData> {
		this.logger.verbose('Supply data for Embeddings Ollama');
		const credentials = await this.getCredentials('ollamaApi');

		const modelName = this.getNodeParameter('model', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex, {}) as {
			baseURL?: string;
			maxRetries?: number;
			maxConcurrency?: number;
			embeddingOnly?: boolean;
			f16Kv?: boolean;
			frequencyPenalty?: number;
			logitsAll?: boolean;
			lowVram?: boolean;
			mainGpu?: number;
			mirostat?: number;
			mirostatEta?: number;
			mirostatTau?: number;
			numBatch?: number;
			numCtx?: number;
			numGpu?: number;
			numGqa?: number;
			numKeep?: number;
			numThread?: number;
			penalizeNewline?: boolean;
			presencePenalty?: number;
			repeatLastN?: number;
			repeatPenalty?: number;
			ropeFrequencyBase?: number;
			ropeFrequencyScale?: number;
			temperature?: number;
			stop?: string[];
			tfsZ?: number;
			topK?: number;
			topP?: number;
			typicalP?: number;
			useMlock?: boolean;
			useMmap?: boolean;
			vocabOnly?: boolean;
		} as OllamaNodeOptionsParams;

		if (!options.baseURL) {
			options.baseURL = credentials.baseUrl as string;
		}

		const embeddings = new OllamaEmbeddings({
			baseUrl: options.baseURL as string,
			model: modelName as string,
			requestOptions: {
				embeddingOnly: options.embeddingOnly,
				f16KV: options.f16Kv,
				frequencyPenalty: options.frequencyPenalty,
				logitsAll: options.logitsAll,
				lowVram: options.lowVram,
				mainGpu: options.mainGpu,
				mirostat: options.mirostat,
				mirostatEta: options.mirostatEta,
				mirostatTau: options.mirostatTau,
				numBatch: options.numBatch,
				numCtx: options.numCtx,
				numGpu: options.numGpu,
				numGqa: options.numGqa,
				numKeep: options.numKeep,
				numThread: options.numThread,
				penalizeNewline: options.penalizeNewline,
				presencePenalty: options.presencePenalty,
				repeatLastN: options.repeatLastN,
				repeatPenalty: options.repeatPenalty,
				ropeFrequencyBase: options.ropeFrequencyBase,
				ropeFrequencyScale: options.ropeFrequencyScale,
				// stop: options.stop,
				temperature: options.temperature,
				tfsZ: options.tfsZ,
				topK: options.topK,
				topP: options.topP,
				typicalP: options.typicalP,
				useMLock: options.useMlock,
				useMMap: options.useMmap,
				vocabOnly: options.vocabOnly,
			},
		}) as Embeddings;

		return {
			response: logWrapper(embeddings, this),
		};
	}
}
