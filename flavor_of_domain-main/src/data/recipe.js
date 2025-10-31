const apiUrl = 'http://localhost:3000/recipe'

export async function insertRecipe(newRecipe) {
	console.log('Inserting recipe:', newRecipe)

	const response = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newRecipe),
	})

	console.log('Insert recipe response status:', response.status)

	if (!response.ok) {
		console.error('Error response body:', text)
		throw new Error(
			`POST /recipe/ error status: ${response.status}: ${await response.text()}`
		)
	}

	return await response.json()
}

export async function getAllRecipe() {
	const response = await fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})

	console.log('Get recipe response status:', response.status)

	if (!response.ok) {
		throw new Error(
			`GET /recipe/ error status: ${response.status}: ${await response.text()}`
		)
	}

	return await response.json()
}

export async function getAllRecipesForUser(email) {
	console.log(`${apiUrl}/user/${email}`)
	const response = await fetch(`${apiUrl}/user/${email}`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!response.ok) {
		throw new Error(
			`GET /recipe/user/${email} error status: ${
				response.status
			}: ${await response.text()}`
		)
	}

	return await response.json()
}

export async function getRecipeById(recipe_id) {
	console.log(`Getting recipe with recipe_id ${recipe_id}`)
	const response = await fetch(`${apiUrl}/${recipe_id}`, {
		method: 'GET',
		mode: 'cors',
	})

	console.log('Get recipe response status:', response.status)

	if (!response.ok) {
		throw new Error(
			`GET /recipe/ error status: ${response.status}: ${await response.text()}`
		)
	}

	return await response.json()
}

export async function getRecipeCountByUserEmail(user_email) {
	const response = await fetch(`${apiUrl}/count/user/${user_email}`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!response.ok) {
		throw new Error(
			`GET /recipe/ error status: ${response.status}: ${await response.text()}`
		)
	}

	return await response.json()
}

export async function deleteRecipe(recipe_id) {
	console.log(`Deleting recipe ${recipe_id}`)
	const response = await fetch(`${apiUrl}/${recipe_id}`, {
		method: 'DELETE',
		mode: 'cors',
	})

	console.log('DELETE recipe response status:', response.status)

	if (!response.ok) {
		console.error('Error response body:', text)
		throw new Error(
			`DELETE /recipe/ error status: ${
				response.status
			}: ${await response.text()}`
		)
	}

	console.log(`Success response body: ${await response.text()}`)
}

export async function updateRecipe(updatedRecipe) {
	console.log('Updating recipe:', updatedRecipe)

	const response = await fetch(`${apiUrl}/${updatedRecipe.recipe_id}`, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedRecipe),
	})

	console.log('Update recipe response status:', response.status)

	if (!response.ok) {
		console.error('Error response body:', text)
		throw new Error(
			`PUT /recipe/:id error status: ${
				response.status
			}: ${await response.text()}`
		)
	}

	return await response.json()
}
