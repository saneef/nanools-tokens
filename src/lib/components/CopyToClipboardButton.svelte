<script>
	import { writable } from 'svelte/store';
	/** @type string */
	export let label = 'Copy';
	export let onSuccessLabel = 'Copied!';

	/** @type string */
	export let text;

	const state = writable('enabled');

	function showSuccess() {
		$state = 'success';

		setTimeout(() => {
			$state = 'enabled';
		}, 2000);
	}

	function handleClick() {
		navigator.clipboard.writeText(text).then(
			function () {
				showSuccess();
			},
			function (err) {
				alert('Unable to copy');
			}
		);
	}
</script>

<button class="button" on:click={handleClick}
	>{$state === 'success' ? onSuccessLabel : label}</button
>
