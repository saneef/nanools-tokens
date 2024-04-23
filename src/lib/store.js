import { json } from '@sveltejs/kit';
import { derived, get, writable } from 'svelte/store';
import { jsonToCssProps, prettifyCss } from './utils/css';
import { flatten } from './utils/object';

/**
 * @typedef {ParsedJson & {
 *   jsonString: string
 * }} JsonTokens JSON Tokens Store
 */

/**
 * Creates a JSON token store.
 *
 * @param      {string}  [initialString]  The Initial JSON string
 * @return     {import('svelte/store').Writable<JsonTokens>}
 */
export function createJsonTokenStore(initialString = '{}') {
	const initParsedJson = parseJson(initialString);

	/** @type JsonTokens */
	const value = structuredClone({ ...initParsedJson, jsonString: initialString });

	const { update, subscribe } = writable(value);

	/** @param {JsonTokens}  jsonTokens */
	const parseAndSet = function ({ jsonString }) {
		const { json, valid, error } = parseJson(jsonString);
		if (valid) {
			update((prev) => ({ ...prev, json, valid, error, jsonString }));
		} else {
			update((prev) => ({ ...prev, valid, error, jsonString }));
		}
	};

	/** @param {import('svelte/store').Updater<JsonTokens>} fn */
	const parseAndUpdate = function (fn) {
		parseAndSet(fn(value));
	};

	return { set: parseAndSet, update: parseAndUpdate, subscribe };
}

/**
 * Creates a CSS store.
 *
 * @param      {ReturnType<typeof createJsonTokenStore>}  codeStore  The code store
 * @return     {import('svelte/store').Readable<string>}
 */
export function createCssStore(codeStore) {
	// @ts-ignore
	return derived(codeStore, async ($codeStore, set) => {
		let css = jsonToCssProps($codeStore.json);
		css = await prettifyCss(css);
		set(css);
	});
}

/**
 * @typedef {Object} ParsedJson
 * @property {Object} json
 * @property {boolean} valid True when JSON is valid
 * @property {string=} error
 */

/**
 * @param      {string}  string
 * @return     {ParsedJson}
 */
function parseJson(string) {
	let json;
	let valid = true;
	let error;
	try {
		const obj = JSON.parse(string);
		json = flatten(obj, { separator: '-' });
	} catch (/** @type {any} */ e) {
		valid = false;
		json = {};
		error = /** @type {string} */ (e.message);
	}

	return { json, valid, error };
}
