<script>
	/** @type {"horizontal"|"vertical"} */
	export let direction = 'horizontal';
</script>

<div class="fifty-fifty" data-fifty-fifty-direction={direction}>
	<div class="fifty-fifty__col"><slot name="first"></slot></div>
	<div class="fifty-fifty__col"><slot name="second"></slot></div>
</div>

<style>
	.fifty-fifty {
		display: grid;
		grid-template-columns: 1fr 1fr;
		height: 100%;
	}

	.fifty-fifty__col {
		contain: size;
	}

	.fifty-fifty[data-fifty-fifty-direction='vertical'] {
		grid-template-columns: none;
		grid-template-rows: 1fr 1fr;
	}
</style>
