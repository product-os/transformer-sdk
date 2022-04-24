import type { Contract } from '@balena/jellyfish-types/build/core';

export interface TransformerContract
	extends Contract<{
		targetPlatform?: string;
	}> {}

export type InputManifest<InputContract extends Contract = Contract> = {
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
};

export type Results = {
	results: Result[];
};

export type Result<ResultContract extends Contract = Contract> = {
	contract: ResultContract;
	artifactPath?: string; // relative to the results file
	imagePath?: string; // relative to the results file
};
