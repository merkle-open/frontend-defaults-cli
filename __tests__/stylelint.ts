/// <reference types="@types/jest" />
import { apiIt } from './shared';

describe('stylelint', () => {
	it('default', async () =>
		await apiIt('stylelint', {
			stylelint: true,
		}));
	it('with-githooks', async () =>
		await apiIt('stylelint-with-githooks', {
			stylelint: true,
			githooks: true,
		}));
});
