<script>
	const year = new Date().getFullYear();
</script>

<footer>
	<p>
		© {year} <a href="https://saneef.com/">Saneef Ansari</a>
	</p>
	<nav>
		<ul role="list">
			<li>
				<a href="https://github.com/sponsors/saneef">
					<span role="img" aria-label="A cup of steaming-hot coffee">☕️</span>
					Buy me coffee
				</a>
			</li>
			<li><a href="https://github.com/saneef/nanools-tokens">Source</a></li>
		</ul>
	</nav>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
		font-size: var(--step--1);
	}
	ul {
		display: flex;
		margin: 0;
		padding: 0;
		gap: var(--space-m);
	}
	li {
		display: inline-flex;
	}

	a {
		position: relative;
	}
	span[role='img'] {
		position: absolute;
		right: 100%;
		margin-inline-end: var(--space-3xs);
	}
</style>
