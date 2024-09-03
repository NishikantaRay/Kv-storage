export async function updateUrl(shortcode, newUrl, env) {
	const urlData = await env.MY_KV.get(`url:${shortcode}`, { type: 'json' })
	if (!urlData) {
		return new Response('Shortcode not found', { status: 404 })
	}

	urlData.originalUrl = newUrl
	await env.MY_KV.put(`url:${shortcode}`, JSON.stringify(urlData))

	return new Response('URL updated successfully', { status: 200 })
}
