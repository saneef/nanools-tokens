import { json } from '@sveltejs/kit';
import { derived, get, writable } from 'svelte/store';
import { jsonToCssProps } from './utils/css';
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
export function createJsonStore(initialString = '{}') {
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
 * @param      {ReturnType<typeof createJsonStore>}  tokensStore
 * @param      {ReturnType<typeof createJsonStore>}  optionsStore
 * @return     {import('svelte/store').Readable<string>}
 */
export function createCssStore(tokensStore, optionsStore) {
	// @ts-ignore
	return derived([tokensStore, optionsStore], async ([$tokensStore, $optionsStore], set) => {
		const css = await jsonToCssProps($tokensStore.json, $optionsStore.json);
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
		json = JSON.parse(string);
		// json = flatten(obj, { separator: '-' });
	} catch (/** @type {any} */ e) {
		valid = false;
		json = {};
		error = /** @type {string} */ (e.message);
	}

	return { json, valid, error };
}
