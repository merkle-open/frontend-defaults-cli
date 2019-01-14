import 'jest';
import enquirer from 'enquirer';

import { fetchSurvey, TYPE_CHOICES } from '../src/fetch-survey';

jest.mock('enquirer');

describe('enqirer', async () => {
	it('everything', async () => {
		enquirer.prompt = jest.fn().mockResolvedValue({
			license: TYPE_CHOICES.licenseClosedSource,
			packageJson: {
				result: `{
					"name": "test",
					"description": "test",
					"author": "author",
					"version": "0.1.0"
				}`,
			},
			language: TYPE_CHOICES.ts,
			tslint: true,
			eslint: true,
			project: [
				TYPE_CHOICES.readme,
				TYPE_CHOICES.editorconfig,
				TYPE_CHOICES.npmrc,
				TYPE_CHOICES.nodeVersion,
				TYPE_CHOICES.gitignore,
				TYPE_CHOICES.githooks,
			],
			linters: [TYPE_CHOICES.prettier, TYPE_CHOICES.stylelint, TYPE_CHOICES.commitlint],
			webpack: true,
			install: true,
		});
		expect({ ...(await fetchSurvey()), cwd: undefined, packageJson: undefined }).toEqual({
			cwd: undefined,
			packageJson: undefined,
			commitlint: true,
			copyrightHolder: undefined,
			dryRun: false,
			editorconfig: true,
			es: false,
			eslint: true,
			force: false,
			githooks: true,
			gitignore: true,
			install: true,
			license: TYPE_CHOICES.licenseClosedSource,
			mode: 'survey',
			nodeVersion: true,
			npmrc: true,
			prettier: true,
			readme: true,
			stylelint: true,
			ts: true,
			tslint: true,
			webpack: true,
		});
	});
});
