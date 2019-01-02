import path from 'path';
import fs from 'fs-extra';
import deepMerge from 'deepmerge';
import execa from 'execa';
import Listr from 'listr';
import stringify from 'json-stable-stringify';

import { getCwd } from './get-cwd';
import { IOptions } from './fetch-options';
import { wait } from './wait';
import { fetchPackage } from './fetch-package';
import { fetchTemplateJson } from './fetch-template';

const cwd = getCwd();

const updatePackageJson = async () => {
	await fs.writeFile(
		path.join(cwd, 'package.json'),
		JSON.stringify(deepMerge(await fetchPackage(), await fetchTemplateJson('install', 'package.json')), null, 2)
	);
};

const cleanPackageJson = async () => {
	await fs.writeFile(path.join(cwd, 'package.json'), stringify(await fetchPackage(), { space: '  ' }));
};

export const install = async (options: IOptions) => {
	if (!options.install) {
		return;
	}

	try {
		await execa('npm', ['i'], {
			cwd,
		});
	} catch (err) {
		throw new Error(err);
	}

	return;
};

export const listr = (options: IOptions) => {
	if (!options.install) {
		return {
			title: 'npm-run-all and clean package.json',
			task: () => {
				return new Listr([
					{
						title: 'add npm-run-all to package.json',
						task: async () => {
							return Promise.all([updatePackageJson(), wait()]);
						},
					},
					{
						title: 'clean package.json',
						task: async () => {
							return Promise.all([cleanPackageJson(), wait()]);
						},
					},
				]);
			},
		};
	}

	return {
		title: 'Install',
		task: () => {
			return new Listr([
				{
					title: 'add npm-run-all to package.json',
					task: async () => {
						return Promise.all([updatePackageJson(), wait()]);
					},
				},
				{
					title: 'clean package.json',
					task: async () => {
						return Promise.all([cleanPackageJson(), wait()]);
					},
				},
				{
					title: 'execute npm install',
					task: async () => {
						return Promise.all([install(options), wait()]);
					},
				},
			]);
		},
	};
};
