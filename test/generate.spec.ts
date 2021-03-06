import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as yaml from 'js-yaml';
import {
	generateBundleIndex,
	generateBundleTypes,
	writeGeneratedFiles,
} from '../lib/generate';
import { ContractDefinition } from '../lib';

describe('Generate', function () {
	it('should generate bundle types', async function () {
		const contractsYml = await fs.promises.readFile(
			path.join(__dirname, 'fixtures/contracts.yml'),
		);
		const contracts = yaml.loadAll(
			contractsYml.toString(),
		) as ContractDefinition[];
		const typesTs = await generateBundleTypes(contracts);
		const fixtureTs = await fs.promises.readFile(
			path.join(__dirname, 'fixtures/types.ts'),
		);
		expect(typesTs).toEqual(fixtureTs.toString());
	});

	it('should generate bundle index', async function () {
		const contractsYml = await fs.promises.readFile(
			path.join(__dirname, 'fixtures/contracts.yml'),
		);
		const contracts = yaml.loadAll(
			contractsYml.toString(),
		) as ContractDefinition[];
		const indexTs = await generateBundleIndex(contracts);
		const fixtureTs = await fs.promises.readFile(
			path.join(__dirname, 'fixtures/index.ts'),
		);
		expect(indexTs).toEqual(fixtureTs.toString());
	});

	it('should write bundle typescript files', async function () {
		const fixturePath = path.join(__dirname, 'fixtures');
		const outputPath = await fs.promises.mkdtemp(
			path.join(os.tmpdir(), path.sep),
		);
		await writeGeneratedFiles(fixturePath, outputPath);
		const typesTs = await fs.promises.readFile(
			path.join(outputPath, 'types.ts'),
		);
		const typesFixture = await fs.promises.readFile(
			path.join(__dirname, 'fixtures/types.ts'),
		);
		expect(typesTs).toEqual(typesFixture);
		const indexTs = await fs.promises.readFile(
			path.join(outputPath, 'index.ts'),
		);
		const indexFixture = await fs.promises.readFile(
			path.join(__dirname, 'fixtures/index.ts'),
		);
		expect(indexTs).toEqual(indexFixture);
	});
});
