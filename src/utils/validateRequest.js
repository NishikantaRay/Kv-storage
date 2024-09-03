export function validateRequest({ username, email, password }) {
	if (!username || !email || !password) {
		return 'All fields are required'
	}
	// Additional validation logic can be added here
	return null
}
