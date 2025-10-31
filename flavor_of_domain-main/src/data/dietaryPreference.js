const apiUrl = 'http://localhost:3000/dietary-preference'

export function getAllDietaryPreference() {
	return fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})
	.then(response => {
		if (!response.ok) {
		throw new Error(`GET /DietaryPreference/ error status: ${response.status}`);
		}
		return response.json();
	});
	}

/**
 * 
 * @param {*} name of DietaryPreference to retrieve
 * @returns 
 */
export async function getDietaryPreferenceByName(name) {
	const dbResult = await fetch(`${apiUrl}/${name}`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /DietaryPreference/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} newDietaryPreference example {
        "name": "Pescatarian"
    },
 * 
 * @returns 
 */
export async function insertDietaryPreference(newDietaryPreference) {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		body: newDietaryPreference,
	})

	if (!dbResult.ok) {
		throw new Error(`POST /DietaryPreference/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} name of DietaryPreference to delete
 * 
 * @returns 
 */
export async function deleteDietaryPreference(name) {
	const dbResult = await fetch(`${apiUrl}/${name}`, {
		method: 'DELETE',
		mode: 'cors'
	})

	if (!dbResult.ok) {
		throw new Error(`DELETE /DietaryPreferences/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}
