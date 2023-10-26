declare module '@n8n/n8n-nodes-langchain/dist/utils/logWrapper' {
	import { Tool } from 'langchain/tools';
	import { BaseChatMessageHistory } from 'langchain/schema';
	import { BaseChatModel } from 'langchain/chat_models/base';
	import { Embeddings } from 'langchain/embeddings/base';
	import { VectorStore } from 'langchain/vectorstores/base';
	import type { Document } from 'langchain/document';
	import { TextSplitter } from 'langchain/text_splitter';
	import type { BaseDocumentLoader } from 'langchain/document_loaders/base';
	import { BaseLLM } from 'langchain/llms/base';
	import { BaseChatMemory } from 'langchain/memory';
	import { BaseRetriever } from 'langchain/schema/retriever';
	import { BaseOutputParser } from 'langchain/schema/output_parser';

	export declare function logWrapper(
		originalInstance:
			| Tool
			| BaseChatModel
			| BaseChatMemory
			| BaseLLM
			| BaseChatMessageHistory
			| BaseOutputParser
			| BaseRetriever
			| Embeddings
			| Document[]
			| Document
			| BaseDocumentLoader
			| TextSplitter
			| VectorStore
			| N8nBinaryLoader
			| N8nJsonLoader,
		executeFunctions: IExecuteFunctions,
	):
		| BaseChatModel<import('langchain/base_language').BaseLanguageModelCallOptions>
		| BaseChatMemory
		| Tool
		| BaseOutputParser<unknown>
		| BaseChatMessageHistory
		| BaseRetriever
		| N8nJsonLoader
		| Document<Record<string, any>>
		| Document<Record<string, any>>[]
		| BaseDocumentLoader
		| TextSplitter
		| N8nBinaryLoader
		| BaseLLM<import('langchain/llms/base').BaseLLMCallOptions>
		| Embeddings
		| VectorStore;
}
