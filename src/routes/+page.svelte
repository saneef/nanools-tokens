<script>
	import FiftyFifty from '$lib/components/FiftyFifty.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import CopyToClipboardButton from '$lib/components/CopyToClipboardButton.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';
	import Frame from '$lib/components/Frame.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import { createJsonStore, createCssStore } from '$lib/store';
	import { writable } from 'svelte/store';
	import defaultTokens from '$lib/defaultTokens.json';
	import defaultOptions from '$lib/defaultOptions.json';

	const input = createJsonStore(JSON.stringify(defaultTokens, null, 2));
	const options = createJsonStore(JSON.stringify(defaultOptions, null, 2));
	const output = createCssStore(input, options);
</script>

<div class="layout">
	<div class="layout__header">
		<PageHeader />
	</div>
	<div class="layout__input">
		<Frame title="Design tokens" lang="json" message={$input.error}>
			<Editor bind:value={$input.jsonString} lang="json"></Editor>
		</Frame>
	</div>
	<div class="layout__options">
		<Frame title="Options" lang="json" message={$options.error}>
			<Editor bind:value={$options.jsonString} lang="json"></Editor>
		</Frame>
	</div>
	<div class="layout__output">
		<Frame title="Output" lang="css">
			<Editor value={$output} lang="css" editable={false}></Editor>
			<CopyToClipboardButton slot="actions" text={$output} />
		</Frame>
	</div>
	<div class="layout__footer">
		<PageFooter />
	</div>
</div>

<style>
	.layout {
		padding: var(--space-s);
		display: grid;
		grid-template-rows: max-content repeat(3, 50vmax) max-content;
		gap: var(--space-s);
	}

	@media (min-width: 720px) {
		.layout {
			grid-template-rows: max-content repeat(2, 1fr) max-content;
			grid-template-columns: 1fr 1fr;
			height: 100vh;
			height: 100dvh;
		}

		.layout__header,
		.layout__footer {
			grid-column: 1 / -1;
		}

		.layout__options {
			grid-row: 3;
		}

		.layout__output {
			grid-row: 2/-2;
		}
	}
</style>
