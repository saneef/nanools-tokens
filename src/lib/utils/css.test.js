// @ts-check
import { describe, expect, test } from 'vitest';
import { jsonToCssProps, prettifyCss } from './css';

describe('jsonToCssProps', () => {
	test('populate CSS properties within :root selector', () => {
		const input = {
			'color-gray-100': '#f1f5f9',
			'color-gray-800': '#1e293b',
			'color-primary-100': '#dcfce7',
			'color-primary-800': '#166534'
		};
		const output =
			':root {--color-gray-100: #f1f5f9;--color-gray-800: #1e293b;--color-primary-100: #dcfce7;--color-primary-800: #166534;}';
		expect(jsonToCssProps(input)).toBe(output);
	});
});

describe('prettifyCss', () => {
	test('format CSS', async () => {
		const input = `:root {--color-gray-100: #f1f5f9;--color-gray-800: #1e293b;--color-primary-100: #dcfce7;--color-primary-800: #166534;}`;
		const output = `:root {
  --color-gray-100: #f1f5f9;
  --color-gray-800: #1e293b;
  --color-primary-100: #dcfce7;
  --color-primary-800: #166534;
}
`;
		expect(await prettifyCss(input)).toBe(output);
	});
});
