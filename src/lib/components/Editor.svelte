<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { json } from '@codemirror/lang-json';
	import { css } from '@codemirror/lang-css';

	export let value = '';
	/** @type {"json" | "css"} */
	export let lang = 'json';
	export let editable = true;

	const langMap = {
		json: json(),
		css: css()
	};
</script>

<CodeMirror
	bind:value
	lang={langMap[lang]}
	{editable}
	lineWrapping={true}
	styles={{
		'&.cm-focused': { '--activeLineBg': '#cceeff44', '--activeLineGutterBg': '#e2f2ff' },
		'.cm-gutters': { backgroundColor: 'transparent', borderColor: 'var(--color-light-shade)' },
		'.cm-activeLine': { backgroundColor: 'var(--active-line-bg, transparent)' },
		'.cm-activeLineGutter': { backgroundColor: 'var(--active-line-gutter-bg, transparent)' },
		'.cm-scroller': {
			fontFamily: 'var(--font-family-mono, monospace)',
			lineHeight: 1.45,
			fontSize: 'var(--step--1)'
		}
	}}
/>
