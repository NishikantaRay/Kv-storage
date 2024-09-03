import { hashPassword } from '../../utils/hashPassword'
import { validateRequest } from '../../utils/validateRequest'

export async function handleSignup(request, env) {
	const { username, password, email } = await request.json()

	const validationError = validateRequest({ username, password, email })
	if (validationError) {
		return new Response(JSON.stringify({ error: validationError }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' },
		})
	}

	const existingUser = await env.MY_KV.get(`user:${username}`)
	if (existingUser) {
		return new Response(JSON.stringify({ error: 'User already exists' }), {
			status: 409,
			headers: { 'Content-Type': 'application/json' },
		})
	}
	const hashedPassword = await hashPassword(password)

	await env.MY_KV.put(
		`user:${username}`,
		JSON.stringify({ username, email, password: hashedPassword })
	)

	return new Response(JSON.stringify({ success: true, username }), {
		headers: { 'Content-Type': 'application/json' },
	})
}
