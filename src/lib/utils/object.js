// @ts-check

/** @typedef {Object.<string|number, number|string|Array<string>|Array<number>>} StringKeyObject */
/** @typedef {Object.<string|number, number|string|Array<string>|Array<number>|StringKeyObject>} NestedStringKeyObject */

/**
 * Flattens nested object by dot separated keys
 *
 * @param      {NestedStringKeyObject}  object Object
 * @param      {Object}  [options={}]            Options
 * @param      {string=} [options.separator='.'] Key separator
 * @return     {StringKeyObject}
 */
export function flatten(object, { separator = '.' } = {}) {
	return flattenObjectWithParentKey(object, { separator });
}

/**
 * @param      {NestedStringKeyObject}  object
 * @param      {Object}  options  Options
 * @param      {string=}  options.parentKey
 * @param      {string}  [options.separator='.']
 * @return     {StringKeyObject}
 */
function flattenObjectWithParentKey(object, { parentKey, separator = '.' } = {}) {
	return Object.keys(object).reduce((acc, k) => {
		const prop = parentKey === undefined ? k : `${parentKey}${separator}${k}`;
		const value = object[k];

		if (isValidValue(value)) {
			return {
				...acc,
				[prop]: value
			};
		}

		return {
			...acc,
			...flattenObjectWithParentKey(/** @type {NestedStringKeyObject} */ (value), {
				parentKey: prop,
				separator
			})
		};
	}, {});
}

/**
 * Determines whether the specified v is valid value.
 *
 * @param      {any}   v
 * @return     {boolean}  True if the specified v is valid value, False otherwise.
 */
function isValidValue(v) {
	if (Array.isArray(v) || ['string', 'number'].includes(typeof v)) {
		return true;
	}
	return false;
}
