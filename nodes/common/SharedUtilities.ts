import { ConnectionTypes, IExecuteFunctions } from 'n8n-workflow';

/**
 * Type definition for the method override handler function.
 * @param target - The target object.
 * @param prop - The property key.
 * @param executeFunctions - The IExecuteFunctions object.
 * @param connectionType - The connection type.
 * @returns A function that takes an argument and returns a Promise, or undefined.
 */
type MethodOverrideHandlerType = (
	target: any,
	prop: PropertyKey,
	executeFunctions: IExecuteFunctions,
	connectionType?: ConnectionTypes,
) => ((arg: any) => Promise<any>) | undefined;

/**
 * Wraps the given instance with a proxy that intercepts method calls and allows for overriding them.
 * @param originalInstance - The original instance to wrap with a proxy.
 * @param executeFunctions - The execute functions object to pass to the method override handler.
 * @param methodOverrideHandler - The function that handles method overrides.
 * @returns A new proxy-wrapped instance.
 */
export function proxyLogWrapper(
	originalInstance: any,
	executeFunctions: IExecuteFunctions,
	methodOverrideHandler: MethodOverrideHandlerType,
) {
	return new Proxy(originalInstance, {
		get: (target, prop) => {
			let connectionType: ConnectionTypes | undefined;

			const wrappedFunction = methodOverrideHandler(target, prop, executeFunctions, connectionType);

			if (wrappedFunction) {
				return wrappedFunction;
			}

			return (target as any)[prop];
		},
	});
}
