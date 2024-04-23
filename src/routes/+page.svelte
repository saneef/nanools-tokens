<script>
	import FiftyFifty from '$lib/components/FiftyFifty.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import { createJsonTokenStore, createCssStore } from '$lib/store';
	import { writable } from 'svelte/store';
	const sampleJson = `{
  "color": {
    "gray": {
      "100": "#f1f5f9",
      "800": "#1e293b"
    },
    "primary": {
      "100": "#dcfce7",
      "800": "#166534"
    }
  }
}`;

	const input = createJsonTokenStore(sampleJson);
	const output = createCssStore(input);
</script>

<div class="layout">
	<PageHeader />
	<FiftyFifty>
		<FiftyFifty slot="first" direction="vertical">
			<div slot="first" class="layout-100">
				<h2>Design Tokens</h2>
				<Editor bind:value={$input.jsonString} lang="json"></Editor>
			</div>
			<div slot="second" class="layout-100">
				<h2>Options</h2>
				<Editor value={''} lang="json"></Editor>
			</div>
		</FiftyFifty>
		<div slot="second" class="layout-100">
			<h2>Output</h2>
			<Editor value={$output} lang="css"></Editor>
		</div>
	</FiftyFifty>
</div>

<style>
	h2 {
		margin-block-start: 0;
		padding: 0.25rem;
	}
	.layout {
		display: grid;
		grid-template-rows: max-content 1fr;
		height: 100vh;
		height: 100dvh;
	}

	.layout-100 {
		display: grid;
		grid-template-rows: max-content 1fr;
		height: 100%;
	}
</style>
