import type {
	Contract,
	ContractDefinition,
} from '@balena/jellyfish-types/build/core';

export type { Contract, ContractDefinition };

export interface TransformerContract
	extends Contract<{
		targetPlatform?: string;
	}> {}

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
