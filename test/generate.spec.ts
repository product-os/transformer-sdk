import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import {
	generateBundleIndex,
	generateBundleTypes,
	writeGeneratedFiles,
} from '../lib/generate';
import { ContractDefinition } from '../lib';

describe('Generate', function () {

	beforeEach(async function () {
		const fixturePath = path.join(__dirname, 'fixtures');
		await writeGeneratedFiles(fixturePath, fixturePath, true);
		const typesTs = await fs.promises.readFile(
			path.join(fixturePath, 'types.ts'),
		);
		const typesFixture = await fs.promises.readFile(
			path.join(__dirname, 'fixtures/types.ts'),
		);
		expect(typesTs).toEqual(typesFixture);
		const indexTs = await fs.promises.readFile(
			path.join(fixturePath, 'index.ts'),
		);
		const indexFixture = await fs.promises.readFile(
			path.join(__dirname, 'fixtures/index.ts'),
		);
		expect(indexTs).toEqual(indexFixture);
	});

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
});
