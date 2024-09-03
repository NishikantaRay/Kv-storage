export async function getOriginalUrl(shortcode, env) {
	const urlData = await env.MY_KV.get(`url:${shortcode}`, { type: 'json' })

	if (!urlData) {
		return new Response('Shortcode not found', { status: 404 })
	}
	urlData.clicks += 1
	await env.MY_KV.put(`url:${shortcode}`, JSON.stringify(urlData))
	if (urlData) {
		return new Response(urlData.originalUrl, {
			status: 302,
			headers: { 'Content-Type': 'application/json' },
		})
	} else {
		return new Response(JSON.stringify({ error: 'URL not found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' },
		})
	}
}
