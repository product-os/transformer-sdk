import { Command } from '@oclif/core';

import { writeGeneratedFiles } from '../../generate';

export default class Generate extends Command {
	static description =
		'Generate typings and function signatures from a bundle of contracts';

	async run(): Promise<void> {
		try {
			await writeGeneratedFiles(process.cwd(), process.cwd());
		} catch (e: any) {
			this.error(e.message);
		}
	}
}
