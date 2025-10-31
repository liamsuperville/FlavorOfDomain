const apiUrl = 'http://localhost:3000/recipe-ingredient'

export async function getAllRecipeIngredient() {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /RecipeIngredient/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * Get ingredients for a specific recipe
 * @param {*} recipeId The ID of the recipe to get ingredients for
 * @returns Promise with ingredients data
 */
export async function getIngredientsByRecipeId(recipeId) {
	const response = await fetch(`${apiUrl}/recipe/${recipeId}`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!response.ok) {
		throw new Error(
			`GET /recipeIngredient/recipe/${recipeId} error status: ${
				response.status
			}: ${await response.text()}`
		)
	}
	return await response.json()
}

/**
 * 
 * @param {*} newRecipeIngredient example {
        "recipe_id": 5,
        "ingredient_name": "Garlic"
    },
 * 
 * @returns 
 */
export async function insertRecipeIngredient(newRecipeIngredient) {
	console.log(`attempting to insert ${JSON.stringify(newRecipeIngredient)}`)
	try {
		const response = await fetch(`${apiUrl}/`, {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newRecipeIngredient),
		})

		if (!response.ok) {
			throw new Error(
				`POST /RecipeIngredient/ ${newRecipeIngredient} error status: ${
					response.status
				}: ${await response.text()}`
			)
		}
	} catch (error) {
		console.error('Failed to insert ingredients:', error)
		// Return empty array instead of throwing to provide graceful degradation
		return []
	}
}

/**
 * 
 * @param {*} deletedRecipeIngredient example {
        "recipe_id": 5,
        "ingredient_name": "Garlic"
    }
 * 
 * @returns 
 */
export async function deleteRecipeIngredient(deletedRecipeIngredient) {
	const dbResult = await fetch(`${apiUrl}/delete`, {
		method: 'DELETE',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(deletedRecipeIngredient),
	})

	if (!dbResult.ok) {
		throw new Error(
			`DELETE /RecipeIngredients/ error status: ${dbResult.status}`
		)
	}

	return await dbResult.json()
}
