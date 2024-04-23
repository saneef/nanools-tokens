// @ts-check
import { describe, expect, test } from 'vitest';
import { jsonToCssProps } from './css';

describe('jsonToCssProps', () => {
	test('populate CSS properties within :root selector', async () => {
		const input = {
			'color-gray-100': '#f1f5f9',
			'color-gray-800': '#1e293b',
			'color-primary-100': '#dcfce7',
			'color-primary-800': '#166534'
		};
		const output = `:root {
  --color-gray-100: #f1f5f9;
  --color-gray-800: #1e293b;
  --color-primary-100: #dcfce7;
  --color-primary-800: #166534;
}`;
		expect((await jsonToCssProps(input, { utilityClasses: [] })).trim()).toBe(output);
	});
});
