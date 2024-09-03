export async function deleteUrl(shortcode, env) {
	const urlData = await env.MY_KV.get(`url:${shortcode}`)

	if (!urlData) {
		return new Response('Shortcode not found', { status: 404 })
	}

	await env.MY_KV.delete(`url:${shortcode}`)

	return new Response('URL deleted successfully', { status: 200 })
}
