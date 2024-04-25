// @ts-check
import postcss from 'postcss';
import postcssPluginDesignTokenUtils from 'postcss-design-token-utils';
import prettierCssPlugin from 'prettier/plugins/postcss';

const baseCss = `:root {
  @design-token-utils (custom-properties);
}

@design-token-utils (utility-classes);
`;

/** @typedef {import('./object.js').StringKeyObject} StringKeyObject */

/**
 * Converts flat JSON design tokens object to CSS properties
 *
 * @param {StringKeyObject}  json    The JSON design tokens
 * @param {Object=}  options
 */
export async function jsonToCssProps(json, options) {
	const res = postcss([postcssPluginDesignTokenUtils({ tokens: json, ...options })]).process(
		baseCss,
		{
			from: 'a.css',
			to: 'b.css'
		}
	);
	return res.css?.replace('\n@design-token-utils (utility-classes);', '');
}
