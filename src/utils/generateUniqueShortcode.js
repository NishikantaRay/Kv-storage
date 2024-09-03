import { generateShortcode } from './generateShortcode.js'
export async function generateUniqueShortcode(env, length = 6) {
	let shortcode
	let exists = true

	while (exists) {
		shortcode = generateShortcode(length)
		const value = await env.MY_KV.get(`url:${shortcode}`)
		exists = value !== null
	}

	return shortcode
}
