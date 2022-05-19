import * as fs from "fs";
import * as process from "process";
import { Command, Flags } from '@oclif/core';
import { writeGeneratedFiles } from '../../generate';

export default class Generate extends Command {

	static flags = {
		force: Flags.boolean({char: 'f'}),
		path: Flags.string(),
	}

	static description =
		'Generate typings and function signatures from a bundle of contracts';

	async run(): Promise<void> {
		const {flags} = await this.parse(Generate)
		try {
			let path = process.cwd()
			if (flags.path) {
				await fs.promises.access(flags.path);
				path = flags.path
			}
			await writeGeneratedFiles(path, path, flags.force);
		} catch (e: any) {
			this.error(e.message);
		}
	}
}
