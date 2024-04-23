<script>
	import FiftyFifty from '$lib/components/FiftyFifty.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { createJsonTokenStore, createCssStore } from '$lib/store';
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

	const json = createJsonTokenStore(sampleJson);
	const css = createCssStore(json);
</script>

<PageHeader />
<FiftyFifty>
	<div>
		<textarea name="json-editor" id="json-editor" bind:value={$json.jsonString}></textarea>
		{#if !$json.valid}
			<p>{$json.error}</p>
		{/if}
	</div>
	<div><textarea name="css-viewer" id="css-viewer" bind:value={$css} readonly></textarea></div>
</FiftyFifty>
