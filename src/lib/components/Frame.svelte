<script>
	/** @type string */
	export let title;
	export let lang = '';
	/** @type string|undefined */
	export let message = undefined;
</script>

<div class="frame paper">
	<div class="frame__header" class:frame__header--narrow={$$slots.actions}>
		<div class="frame__header-meta">
			<h2>{title}</h2>
			<span class="pill text-upper">{lang}</span>
		</div>
		{#if $$slots.actions}
			<div class="frame__header-actions">
				<slot name="actions"></slot>
			</div>
		{/if}
	</div>
	<div class="frame__content">
		<slot></slot>
	</div>
	{#if message}
		<div class="frame__footer">
			<div class="message">{message}</div>
		</div>
	{/if}
</div>

<style>
	.frame {
		height: 100%;
		display: grid;
		grid-template-rows: max-content 1fr max-content;
	}

	.frame__content {
		contain: size;
	}

	.frame__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--color-light-shade);
		gap: var(--space-s);
		padding: var(--space-xs);
	}

	.frame__header--narrow {
		padding-block: var(--space-3xs);
		padding-inline-end: var(--space-3xs);
	}

	.frame__header-meta {
		display: flex;
		align-items: center;
		gap: var(--space-2xs);
	}

	h2 {
		font-size: var(--step--1);
		font-weight: medium;
		color: var(--color-dark);
	}

	.message {
		padding: var(--space-3xs) var(--space-2xs);
		background-color: var(--color-danger);
		color: var(--color-light);
		font-size: var(--step--1);
	}
</style>
