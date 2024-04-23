import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$assets: './src/assets'
		},
		adapter: adapter()
	}
};

export default config;
