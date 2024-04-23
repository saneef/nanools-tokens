import { dev } from '$app/environment';
import { PLAUSIBLE_DOMAIN } from '$env/static/private';

const PLAUSIBLE_TOKEN = '%plausible.head%';

/**
 * Inserts Plausible script on production
 * See: https://adamtuttle.codes/blog/2021/sveltekit-customizing-app-html-at-runtime/
 *
 * @type {import('@sveltejs/kit').Handle}
 */
export const handle = async ({ event, resolve }) => {
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			if (dev) {
				return html.replace(PLAUSIBLE_TOKEN, `<!-- Plausible script goes here on production -->`);
			}

			return html.replace(
				PLAUSIBLE_TOKEN,
				`
<script defer event-subdomain="tokens2css" data-domain="${PLAUSIBLE_DOMAIN ?? ''}"" src="/p.js"></script>`
			);
		}
	});

	return response;
};
