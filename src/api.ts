import { getCwd } from './get-cwd';
import { install, openVSCode } from './install';
import { showDiff } from './log-diff';
import { writeFiles } from './write-files';
import { fetchSurveyFiles } from './fetch-survey';
import { TLicense, TMode, TPreset, IOptions } from './const';
import { collectChanges } from './collect-changes';
import chalk from 'chalk';
import { IPackageJson } from './type-package-json';
import { gitInit } from './git-init';

export interface IApiOptions {
	cwd?: string;
	packageJson?: IPackageJson;
	license?: TLicense;
	copyrightHolder?: string;

	// details
	ts?: boolean;
	es?: boolean;
	eslint?: boolean;
	editorconfig?: boolean;
	prettier?: boolean;
	stylelint?: boolean;
	gitignore?: boolean;
	npmrc?: boolean;
	readme?: boolean;
	githooks?: boolean;
	commitlint?: boolean;
	nodeVersion?: boolean;
	webpack?: boolean;
	build?: boolean;

	install?: boolean;
	force?: boolean;

	mode?: TMode;
	preset?: TPreset;
}

const defaultApiOptions = {
	// details
	ts: false,
	es: false,
	eslint: false,
	editorconfig: false,
	prettier: false,
	stylelint: false,
	gitignore: false,
	npmrc: false,
	readme: false,
	githooks: false,
	commitlint: false,
	nodeVersion: false,
	webpack: false,
	build: false,

	install: false,
	force: false,
	dryRun: false,

	mode: 'api' as 'api',
};

export async function api(apiOptions: IApiOptions) {
	const cwd = getCwd();
	const options: IOptions = {
		cwd,
		...defaultApiOptions,
		...apiOptions,
	};

	// enable githooks always with commitlint
	if (options.commitlint) {
		options.githooks = true;
	}

	// disable build if webpack enabled
	if (options.build && options.webpack) {
		options.build = false;
	}

	try {
		const { originalFiles, mergedFiles } = await collectChanges(options);
		const shouldContinue = await showDiff(originalFiles, mergedFiles, options);
		if (!shouldContinue) {
			return;
		}
		const files = await fetchSurveyFiles(mergedFiles, options);
		await writeFiles(files, mergedFiles, options);
		await gitInit(options.cwd);
		await install(options);
		await openVSCode(options);
		return files;
	} catch (err) {
		console.error(chalk.red(err));
		process.exit(1);
	}
	return;
}
