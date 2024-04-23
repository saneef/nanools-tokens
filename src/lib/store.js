import { json } from '@sveltejs/kit';
import { derived, writable } from 'svelte/store';
import { jsonToCssProps, prettifyCss } from './utils/css';
import { flatten } from './utils/object';

/**
 * @typedef {ParsedJson & {
 * 	jsonString: string
 * }} JsonTokens JSON Tokens Store
 */

/**
 * Creates a JSON token store.
 *
 * @param      {string}  jsonString  The json string
 * @return     {import('svelte/store').Writable<JsonTokens>}
 */
export function createJsonTokenStore(jsonString) {
	const parsedJson = parseJson(jsonString);
	if (!parsedJson.valid) {
		throw new Error(`createJsonTokenStore: invalid jsonString, ${parsedJson.error}`);
	}

	const { json, valid } = parsedJson;

	/** @type {JsonTokens} */
	const value = { jsonString, valid, json, error: undefined };
	const { subscribe, set, update } = writable(value);

	/**
	 * @param      {JsonTokens}  jsonTokens
	 */
	const parseAndSet = function ({ jsonString }) {
		const { json, valid, error } = parseJson(jsonString);

		set({ ...value, jsonString, valid, error, json });
	};

	/** @param {(args: JsonTokens) => JsonTokens}  fn  */
	const parseAndUpdate = (fn) => {
		parseAndSet(fn(value));
	};

	return {
		subscribe,
		set: parseAndSet,
		update: parseAndUpdate
	};
}

/**
 * Creates a CSS store.
 *
 * @param      {ReturnType<typeof createJsonTokenStore>}  codeStore  The code store
 */
export function createCssStore(codeStore) {
	return derived(codeStore, async ($codeStore, set) => {
		let css = '';
		if ($codeStore.valid) {
			css = jsonToCssProps($codeStore.json);
		}

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
