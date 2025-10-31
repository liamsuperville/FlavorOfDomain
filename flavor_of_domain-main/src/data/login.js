const apiUrl = 'http://localhost:3000/login'

export async function loginApi(email, password) {
	console.log({ email: email, password: password })
	const result = await fetch(apiUrl, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	})

	if (!result.ok) {
		throw new Error(`GET /log/ error status: ${result.status}`)
	}

	return await result.json()
}
