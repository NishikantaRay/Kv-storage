import { handleRequest } from './routes/urlShortener'
import { handleAuthRequest } from './routes/auth'
export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url)
		if (url.pathname.startsWith('/auth')) {
			return await handleAuthRequest(request, env, ctx)
		} else {
			return await handleRequest(request, env, ctx)
		}
	},
}
