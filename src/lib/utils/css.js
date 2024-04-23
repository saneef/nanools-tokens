// @ts-check
import prettierCssPlugin from 'prettier/plugins/postcss';
import * as prettier from 'prettier/standalone';

/** @typedef {import('./object.js').StringKeyObject} StringKeyObject */

/**
 * Converts flat JSON design tokens object to CSS properties
 *
 * @param {StringKeyObject}  json    The JSON design tokens
 */
export function jsonToCssProps(json) {
	const props = Object.entries(json).reduce((acc, [key, value]) => {
		return `${acc}--${key}: ${value};`;
	}, '');
	return `:root {${props}}`;
}

/**
 * Prettify CSS using Prettier
 *
 * @param      {string}   css     CSS
 * @return     {Promise<string>}  Formatted CSS
 */
export async function prettifyCss(css) {
	return prettier.format(css, { parser: 'css', plugins: [prettierCssPlugin] });
}
