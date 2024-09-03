import { verifyPassword } from '../../utils/hashPassword'
import { generateToken } from '../../utils/generateToken'

export async function handleLogin(request, env) {
	const { username, password } = await request.json()

	const userData = await env.MY_KV.get(`user:${username}`)

	if (!userData) {
		return new Response(
			JSON.stringify({ error: 'Invalid username or password' }),
			{
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}

	const { password: storedPassword } = JSON.parse(userData)

	const passwordValid = await verifyPassword(password, storedPassword)

	if (!passwordValid) {
		return new Response(
			JSON.stringify({ error: 'Invalid username or password' }),
			{
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}

	const token = await generateToken({ username })
	return new Response(JSON.stringify({ success: true, token }), {
		headers: { 'Content-Type': 'application/json' },
	})
}
