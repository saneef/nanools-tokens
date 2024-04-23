<script>
	const year = new Date().getFullYear();
</script>

<footer>
	<p>
		© {year} <a href="https://saneef.com/">Saneef Ansari</a>
	</p>
	<nav>
		<ul role="list">
			<li><a href="https://github.com/saneef/nanools-tokens">Source</a></li>
			<li><a href="https://github.com/sponsors/saneef">Sponsor</a></li>
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
		gap: var(--space-s);
	}
	li {
		display: inline-flex;
	}
</style>
