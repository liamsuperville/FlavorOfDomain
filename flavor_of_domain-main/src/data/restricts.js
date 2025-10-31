import { useEffect, useState } from 'react'

const apiUrl = 'http://localhost:3000/restricts'

export async function getAllRestricts() {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /Restricts/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

// TODO add /getRestrictsByDietaryPreferenceName and /getRestrictsByIngredientName if necessary

/**
 * 
 * @param {*} newRestricts example {
        "dietary_name": "Pescatarian",
        "ingredient_name": "Garlic"
    }
 * 
 * @returns 
 */
export async function insertRestricts(newRestricts) {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		body: newRestricts,
	})

	if (!dbResult.ok) {
		throw new Error(`POST /Restricts/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} deletedRestricts example {
        "dietary_name": "Pescatarian",
        "ingredient_name": "Garlic"
    }
 * 
 * @returns 
 */
export async function deleteRestricts(deletedRestricts) {
	const dbResult = await fetch(`${apiUrl}/delete`, {
		method: 'DELETE',
		mode: 'cors',
		body: deletedRestricts,
	})

	if (!dbResult.ok) {
		throw new Error(`DELETE /Restrictss/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}
