const apiUrl = 'http://localhost:3000/prepares'

export async function getAllPrepares() {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /Prepares/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

// TODO add /getPreparesByUserEmail and /getPreparesByRecipeId if necessary

/**
 * 
 * @param {*} newPrepares example {
        "user_email": "user.julia@example.com",
        "recipe_id": 10
    }
 * 
 * @returns 
 */
export async function insertPrepares(newPrepares) {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		body: newPrepares,
	})

	if (!dbResult.ok) {
		throw new Error(`POST /Prepares/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} deltedPrepares example {
        "user_email": "user.julia@example.com",
        "recipe_id": 10
    }
 * 
 * @returns 
 */
export async function deletePrepares(deltedPrepares) {
	const dbResult = await fetch(`${apiUrl}/delete`, {
		method: 'DELETE',
		mode: 'cors',
		body: deltedPrepares,
	})

	if (!dbResult.ok) {
		throw new Error(`DELETE /Preparess/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}
