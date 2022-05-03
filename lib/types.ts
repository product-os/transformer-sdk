import {
	Contract,
	ContractDefinition as RawContractDefinition,
	ContractData,
} from '@balena/jellyfish-types/build/core';

export { Contract, ContractData };

export interface TransformerContract
	extends Contract<{
		targetPlatform?: string;
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

export interface ContractDefinition<TData = ContractData>
	extends RawContractDefinition<TData> {
	handle: string;
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
