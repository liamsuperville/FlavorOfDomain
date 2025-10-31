const apiUrl = 'http://localhost:3000/approves'

export async function getAllApproves() {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /approves/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

// TODO add /getApprovesBySsn, /getApprovesByUserEmail, and /getApprovesByRecipeId if necessary

/**
 * 
 * @param {*} newApproves example {
        "ssn": "ADM018",
        "user_email": "user.rachel@example.com",
        "recipe_id": 18
    }
 * 
 * @returns 
 */
export async function insertApproves(newApproves) {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		body: newApproves,
	})

	if (!dbResult.ok) {
		throw new Error(`POST /approves/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} updatedApproves example {
        "ssn": "ADM018",
        "user_email": "user.rachel@example.com",
        "recipe_id": 18
    }
 * 
 * @returns 
 */
export async function updateApproves(updatedApproves) {
	const dbResult = await fetch(`${apiUrl}/${updatedApproves.email}`, {
		method: 'PUT',
		mode: 'cors',
		body: updatedApproves,
	})

	if (!dbResult.ok) {
		throw new Error(`PUT /approves/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} deleteApproves example {
        "ssn": "ADM018",
        "user_email": "user.rachel@example.com",
        "recipe_id": 18
    }
 * 
 * @returns 
 */
export async function deleteApproves(deleteApproves) {
	const dbResult = await fetch(`${apiUrl}/delete`, {
		method: 'DELETE',
		mode: 'cors',
		body: deleteApproves
	})

	if (!dbResult.ok) {
		throw new Error(`DELETE /approvess/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}
