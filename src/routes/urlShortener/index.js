import { handleCreateShortUrl } from './createShortUrl'
import { getOriginalUrl } from './getOriginalUrl'
import { updateUrl } from './updateUrl'
import { deleteUrl } from './deleteUrl'

export async function handleRequest(request, env, ctx) {
	const url = new URL(request.url)

	// for understanding the code i have create separate files for each operation
	if (url.pathname === '/shorten' && request.method === 'POST') {
		return await handleCreateShortUrl(request, env, ctx)
	} else if (url.pathname.startsWith('/go/')) {
		const shortcode = url.pathname.split('/go/')[1]
		if (request.method === 'GET') {
			return await getOriginalUrl(shortcode, env)
		} else if (request.method === 'PUT') {
			const { newUrl } = await request.json()
			return await updateUrl(shortcode, newUrl, env)
		} else if (request.method === 'DELETE') {
			return await deleteUrl(shortcode, env)
		}
	}

	return new Response('Not Found', { status: 404 })
}
