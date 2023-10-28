declare module '@n8n/n8n-nodes-langchain/dist/utils/logWrapper' {
	export declare function callMethodAsync<T>(
		this: T,
		parameters: {
			executeFunctions: IExecuteFunctions;
			connectionType: ConnectionTypes;
			currentNodeRunIndex: number;
			method: (...args: any[]) => Promise<unknown>;
			arguments: unknown[];
		},
	): Promise<unknown>;
}
