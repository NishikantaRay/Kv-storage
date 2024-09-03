import jwt from '@tsndr/cloudflare-worker-jwt'

const SECRET_KEY = 'abcdefgh'

export async function generateToken(payload) {
	return jwt.sign(payload, SECRET_KEY)
}

export function verifyToken(token) {
	try {
		return jwt.verify(token, SECRET_KEY)
	} catch (err) {
		return null
	}
}
