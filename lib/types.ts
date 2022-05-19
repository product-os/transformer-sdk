import {
	Contract as RawContract,
	ContractData,
} from '@balena/jellyfish-types/build/core';
import { JSONSchema7Type as JsonSchema } from '@balena/jellyfish-types';

export { ContractData };

export interface TransformerContract
	extends Contract<{
		targetPlatform?: string;
		inputFilter: JsonSchema;
	}> {}

// TODO: rename to input and remove input prop
export interface InputManifest<InputContract extends Contract = Contract> {
	input: {
		contract: InputContract;
		transformerContract: TransformerContract;
		artifactPath: string; // relative to the input file
		decryptedSecrets?: {
			[key: string]: string;
		};
		decryptedTransformerSecrets?: {
			[key: string]: string;
		};
	};
}

// TODO: remove when handle is upstream
export interface ContractDefinition<TData = ContractData> {
	handle: string;
	type: string;
	data: TData;
	name?: string;
}

// TODO: remove when handle is upstream
export interface Contract<TData = ContractData> extends RawContract<TData> {
	handle?: string;
}

// TODO: rename to Output
export interface Results {
	results: Result[];
}

export interface Result<
	ResultContract extends ContractDefinition = ContractDefinition,
> {
	contract: ResultContract;
	artifactPath?: string; // relative to the results file
	imagePath?: string; // relative to the results file
}
