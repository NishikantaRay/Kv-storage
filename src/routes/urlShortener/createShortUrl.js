import { generateUniqueShortcode } from '../../utils/generateUniqueShortcode'

export async function handleCreateShortUrl(request, env) {
	const { originalUrl, customShortcode } = await request.json()

	let shortcode

	if (customShortcode) {
		const existingUrl = await env.MY_KV.get(`url:${customShortcode}`)
		if (existingUrl) {
			return new Response(
				'Shortcode already in use. Please choose another one.',
				{ status: 409 }
			)
		}
		shortcode = customShortcode
	} else {
		shortcode = await generateUniqueShortcode(env)
	}

	await env.MY_KV.put(
		`url:${shortcode}`,
		JSON.stringify({
			originalUrl,
			createdAt: new Date().toISOString(),
			clicks: 0,
		})
	)
	return new Response(
		JSON.stringify({
			shortUrl: `${new URL(request.url).origin}/go/${shortcode}`,
		}),
		{
			headers: { 'Content-Type': 'application/json' },
		}
	)
}
