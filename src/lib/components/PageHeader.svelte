<script>
	const pluginUrl = 'https://github.com/saneef/postcss-design-token-utils';
</script>

<header>
	<div>
		<div class="flow flow-space-2xs">
			<p class="title">
				<a href="https://nanools.com">nanools</a>
				<span class="slash">∕</span>
				<a href="/">Design Token to CSS</a>
			</p>
			<p class="intro">
				Convert JSON design token to CSS. Uses
				<a href={pluginUrl}>postcss-design-token-utils plugin</a>.
			</p>
		</div>
	</div>
	<div>
		<a class="link" href={pluginUrl}>Docs</a>
	</div>
</header>

<style>
	header {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-block-start: var(--space-2xs);
		gap: var(--space-m);
	}

	.title {
		font-weight: bold;
	}

	.intro {
		font-size: var(--step--1);
	}

	.link {
		font-weight: bold;
	}
	.slash {
		padding-inline: var(--space-3xs);
	}
</style>
