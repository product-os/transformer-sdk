import * as fs from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import slugify from 'slugify';
import * as inflection from 'inflection';
import { compile } from 'json-schema-to-typescript';

import { ContractDefinition } from './types';
import * as yaml from 'js-yaml';

// tslint:disable-next-line
const packageJson = require('../package.json');

/**
 * Generate transformer bundle
 *
 * Future versions could update interfaces and function signatures in place, while maintaining existing function body
 * implementations, this could be done with AST
 */
export async function generateBundleTypes(
	contracts: Array<ContractDefinition<any>>,
): Promise<string> {
	const templateData = {
		sdk: packageJson,
		types: [] as Array<{
			data: string;
			handle: string;
			contractInterfaceName: string;
			contractDefinitionInterfaceName: string;
			dataInterfaceName: string;
		}>,
	};
	for (const contract of contracts) {
		const handle = getHandle(contract);
		if (contract.type.startsWith('type')) {
			try {
				const schema = contract?.data?.schema || {};
				const data = await compile(schema, `${handle}-data`, {
					ignoreMinAndMaxItems: true,
					bannerComment: '',
					style: {
						bracketSpacing: true,
						printWidth: 120,
						semi: true,
						singleQuote: true,
						tabWidth: 2,
						trailingComma: 'all',
						useTabs: true,
					},
				});
				templateData.types.push({
					data,
					handle,
					contractInterfaceName: getContractInterfaceName(handle),
					contractDefinitionInterfaceName:
						getContractDefinitionInterfaceName(handle),
					dataInterfaceName: getDataInterfaceName(handle),
				});
			} catch (error) {
				throw Error(`Could not create interface for ${handle}`);
			}
		}
	}
	const template = await fs.promises.readFile(
		path.join(__dirname, './templates/types.ts.ejs'),
	);
	return ejs.render(template.toString(), templateData);
}

export async function generateBundleIndex(
	contracts: Array<ContractDefinition<any>>,
): Promise<string> {
	const templateData = {
		sdk: packageJson,
		requiredInterfaces: '',
		functions: [] as Array<{
			name: string;
			inputType: string;
			outputType: string;
		}>,
	};
	const requiredInterfaces = [];
	const contractsByHandle = mapContractsByHandle(contracts);
	for (const contract of contracts) {
		const handle = getHandle(contract);
		if (contract.type.startsWith('transformer')) {
			let inputType = 'any';
			if (contract.data.input['$ref']) {
				const inputRef = contract.data.input['$ref'];
				if (!contractsByHandle.has(inputRef)) {
					throw Error(
						`${handle} data.input.$ref: '${inputRef}' not found in contracts`,
					);
				}
				inputType = getContractInterfaceName(inputRef);
			}
			let outputType = 'any';
			if (contract.data.output['$ref']) {
				const outputRef = contract.data.output['$ref'];
				if (!contractsByHandle.has(outputRef)) {
					throw Error(
						`${handle} data.output.$ref: '${outputRef}' not found in contracts`,
					);
				}
				outputType = getContractDefinitionInterfaceName(outputRef);
			}
			requiredInterfaces.push(inputType, outputType);
			templateData.functions.push({
				inputType,
				outputType,
				name: handle.replace(/-/g, ''),
			});
		}
	}
	templateData.requiredInterfaces = requiredInterfaces.join(', ');
	const template = await fs.promises.readFile(
		path.join(__dirname, './templates/index.ts.ejs'),
	);
	return ejs.render(template.toString(), templateData);
}

export async function writeGeneratedFiles(
	bundlePath: string,
	outputPath: string,
) {
	const contractsPath = path.join(bundlePath, './contracts.yml');
	const typesPath = path.join(outputPath, './types.ts');
	const indexPath = path.join(outputPath, './index.ts');
	try {
		await fs.promises.access(contractsPath);
		const bundleYml = await fs.promises.readFile(contractsPath);
		const contracts = yaml.loadAll(
			bundleYml.toString(),
		) as ContractDefinition[];
		const typesFile = await generateBundleTypes(contracts);
		// use wx flag to prevent overwrite
		await fs.promises.writeFile(typesPath, typesFile, { flag: 'wx' });
		const functionsFile = await generateBundleIndex(contracts);
		await fs.promises.writeFile(indexPath, functionsFile, { flag: 'wx' });
	} catch (e: any) {
		throw e;
	}
}

function getContractInterfaceName(handle: string): string {
	return `${getHandleVariants(handle).capitalized}Contract`;
}

function getContractDefinitionInterfaceName(handle: string): string {
	return `${getHandleVariants(handle).capitalized}ContractDefinition`;
}

function getDataInterfaceName(handle: string): string {
	return `${getHandleVariants(handle).capitalized}Data`;
}

function getHandle(contract: ContractDefinition<any>): string {
	if (!contract.handle && !contract.name) {
		throw Error('Contract must define a name or handle');
	}
	return contract.handle
		? contract.handle
		: slugify(contract.name as string, {
				lower: true,
				trim: true,
				strict: true,
		  });
}

function getHandleVariants(handle: string): {
	capitalized: string;
	camelCase: string;
} {
	return {
		capitalized: inflection.camelize(handle.replace('-', '_')),
		camelCase: inflection.camelize(handle),
	};
}

function mapContractsByHandle(contracts: Array<ContractDefinition<any>>) {
	return new Map(
		contracts.map((contract) => {
			return [getHandle(contract), contract];
		}),
	);
}
