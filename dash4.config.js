/**
 *
 * 	DASH4 configuration
 *  https://github.com/smollweide/dash4
 *
 */
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-dependencies
const { PluginDependencies } = require('@dash4/plugin-dependencies');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-readme
const { PluginReadme } = require('@dash4/plugin-readme');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-terminal
const { PluginTerminal, jestCommands } = require('@dash4/plugin-terminal');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-code-coverage
const { PluginCodeCoverage } = require('@dash4/plugin-code-coverage');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-npm-scripts
const { PluginNpmScripts } = require('@dash4/plugin-npm-scripts');
// https://github.com/smollweide/dash4/tree/master/plugins/plugin-actions
const { PluginActions } = require('@dash4/plugin-actions');

async function getConfig() {
	return {
		port: 4000,
		tabs: [
			{
				title: 'root',
				rows: [
					[
						new PluginReadme({ file: 'README.md', height: 400 }),
						new PluginActions({
							title: 'Links',
							actions: [
								{
									type: 'link',
									href: 'https://github.com/namics/frontend-defaults',
									title: 'frontend-defaults',
									image: 'https://avatars1.githubusercontent.com/u/32236?s=200&v=4',
								},
								{
									type: 'link',
									href: 'https://github.com/namics/eslint-config-namics',
									title: 'eslint-config',
									image: 'https://avatars1.githubusercontent.com/u/32236?s=200&v=4',
								},
								{
									type: 'link',
									href: 'https://github.com/namics/webpack-config-plugins',
									title: 'webpack-config-plugins',
									image: 'https://avatars1.githubusercontent.com/u/32236?s=200&v=4',
								},
							],
						}),
						new PluginNpmScripts({
							scripts: [
								{ title: 'install', cmd: 'npm i' },
								{ title: 'build', cmd: 'npm run build' },
								{ title: 'test', cmd: 'npm run test' },
								{ title: 'lint', cmd: 'npm run lint' },
								{ title: 'prettier', cmd: 'npm run prettier' },
								{ title: 'sort-package', cmd: 'npm run sort-package' },
								{ title: 'release', cmd: 'npm run release' },
								{ title: 'clean', cmd: 'npm run clean' },
								{ title: 'reset last commit', cmd: 'git reset HEAD~1' },
							],
						}),
					],
					[
						new PluginTerminal({ cmd: 'npm run watch', width: [12, 6, 8] }),
						new PluginDependencies({
							width: [12, 6, 4],
							installProcess: {
								title: 'run install',
								cmd: 'npm i',
							},
						}),
					],
					[
						new PluginTerminal({
							cmd: 'npm run watch-test',
							allowedCommands: jestCommands,
							width: [12, 6, 8],
						}),
						new PluginCodeCoverage({ width: [12, 6, 4] }),
					],
				],
			},
		],
	};
}

module.exports = getConfig;
