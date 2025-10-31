const apiUrl = 'http://localhost:3000/admin'

export async function getAllAdmin() {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /admin/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 *
 * @param {*} ssn of admin to retrieve
 * @returns
 */
export async function getAdminBySsn(ssn) {
	const dbResult = await fetch(`${apiUrl}/${ssn}`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /admin/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} newAdmin example {
        "ssn": "ADM018",
        "email": "rachel.lewis@example.com",
        "name": "Rachel Lewis",
        "birthday": "1969-11-11"
    }
 * 
 * @returns 
 */
export async function insertAdmin(newAdmin) {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(newAdmin),
	})

	if (!dbResult.ok) {
		throw new Error(`POST /admin/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} updatedAdmin example {
        "ssn": "ADM018",
        "email": "rachel.lewis@example.com",
        "name": "Rachel Lewis",
        "birthday": "1969-11-11"
    }
 * 
 * @returns 
 */
export async function updateAdmin(updatedAdmin) {
	const dbResult = await fetch(`${apiUrl}/${updatedAdmin.ssn}`, {
		method: 'PUT',
		mode: 'cors',
		body: updatedAdmin,
	})

	if (!dbResult.ok) {
		throw new Error(`PUT /admin/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 *
 * @param {*} ssn of admin to delete
 *
 * @returns
 */
export async function deleteAdmin(ssn) {
	const dbResult = await fetch(`${apiUrl}/${ssn}`, {
		method: 'DELETE',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`DELETE /admins/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}
