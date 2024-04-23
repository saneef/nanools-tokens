<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { json } from '@codemirror/lang-json';
	import { css } from '@codemirror/lang-css';

	export let value = '';
	/** @type {"json" | "css"} */
	export let lang = 'json';

	const langMap = {
		json: json(),
		css: css()
	};

	$: langSupport = langMap[lang];
</script>

<CodeMirror bind:value lang={langSupport} />

<style>
	:global(.codemirror-wrapper) {
		position: relative;
		width: 100%;
		height: 100%;
		border: none;
		line-height: 1.5;
		overflow: hidden;
	}

	:global(.codemirror-wrapper .cm-editor) {
		height: 100%;
	}
</style>
