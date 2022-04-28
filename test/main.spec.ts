import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as sdk from '../lib';

import type { InputManifest } from '../lib';
import type { Contract } from '@balena/jellyfish-types/build/core';

interface TestContract
	extends Contract<{
		exists: true;
	}> {}

describe('Transformer SDK', function () {
	const inputManifest: InputManifest<TestContract> = {
		input: {
			contract: { slug: 'test', type: 'test', data: { exists: true } } as any,
			transformerContract: {} as any,
			artifactPath: 'artifact',
		},
	};

	beforeEach(() => {
		const inputDir = fs.mkdtempSync(path.join(os.tmpdir(), path.sep));
		const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), path.sep));
		process.env['INPUT'] = path.join(inputDir, 'input-manifest.yml');
		process.env['OUTPUT'] = path.join(outputDir, 'output-manifest.yml');
		fs.writeFileSync(
			process.env['INPUT'] as string,
			JSON.stringify(inputManifest),
		);
	});

	afterEach(() => {
		Reflect.deleteProperty(process.env, 'INPUT');
		Reflect.deleteProperty(process.env, 'OUTPUT');
	});

	it('should execute transform callback', async function () {
		await sdk.transform<TestContract>((manifest) => {
			expect(manifest.input.contract.data.exists).toEqual(true);
			return Promise.resolve([]);
		});
	});
});
