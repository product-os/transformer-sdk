import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { InputManifest, Results, Contract } from './types';

// export types for use by transformers
export * from './types';

export async function transform<InputContract extends Contract = Contract>(
	callback: (
		manifest: InputManifest<InputContract>,
	) => Promise<Results['results']>,
) {
	const inputPath = getEnvOrFail('INPUT');
	const outputPath = getEnvOrFail('OUTPUT');
	const manifest = await readInput<InputContract>(inputPath);
	const results = await callback(manifest);
	await writeOutput(outputPath, { results });
}

async function readInput<InputContract extends Contract = Contract>(
	inputPath: string,
) {
	const inputDir = path.dirname(inputPath);
	const manifest = yaml.load(
		(await fs.promises.readFile(inputPath)).toString(),
	) as InputManifest<InputContract>;
	// make path absolute to make handling for users easier
	manifest.input.artifactPath = path.join(
		inputDir,
		manifest.input.artifactPath,
	);
	return manifest;
}

async function writeOutput(outputPath: string, results: Results) {
	await fs.promises.writeFile(outputPath, JSON.stringify(results));
}

function getEnvOrFail(envVar: string) {
	const env = process.env[envVar];
	if (!env) {
		console.log(`required env var ${envVar} was not set`);
		process.exit(1);
	}
	return env;
}
