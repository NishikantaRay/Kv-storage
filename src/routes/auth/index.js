import { handleLogin } from './login'
import { handleSignup } from './signup'
export async function handleAuthRequest(request, env, ctx) {
	const url = new URL(request.url)

	if (url.pathname === '/auth/login' && request.method === 'POST') {
		return await handleLogin(request, env, ctx)
	} else if (url.pathname === '/auth/signup' && request.method === 'POST') {
		return await handleSignup(request, env, ctx)
	}
	return new Response('Not Found', { status: 404 })
}
