// @ts-check
import { describe, expect, test } from 'vitest';
import { flatten } from './object';

describe('flatten', () => {
	test('return single level object as it is', () => {
		const obj = { color: 'blue' };
		expect(flatten(obj)).toMatchObject(obj);
	});

	test('two level object to single level object', () => {
		const input = { colors: { accent: '#f0f', text: '#000' } };
		const output = { 'colors.accent': '#f0f', 'colors.text': '#000' };
		expect(flatten(input)).toMatchObject(output);
	});

	test('three level object to single level object', () => {
		const input = {
			colors: { accent: { 100: '#f0f', 500: '#f0f' }, text: { 100: '#000', 500: '#000' } }
		};
		const output = {
			'colors.accent.100': '#f0f',
			'colors.accent.500': '#f0f',
			'colors.text.100': '#000',
			'colors.text.500': '#000'
		};
		expect(flatten(input)).toMatchObject(output);
	});

	test('join keys using "-"', () => {
		const input = { colors: { accent: '#f0f', text: '#000' } };
		const output = { 'colors-accent': '#f0f', 'colors-text': '#000' };
		expect(flatten(input, { separator: '-' })).toMatchObject(output);
	});
});
