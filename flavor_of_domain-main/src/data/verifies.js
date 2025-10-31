import { useEffect, useState } from 'react'

const apiUrl = 'http://localhost:3000/verifies'

export async function getAllVerifies() {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /Verifies/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

// TODO add /getVerifiesByAdminSsn and /getVerifiesByUserEmail if necessary

/**
 * 
 * @param {*} newVerifies example {
        "admin_ssn": "ADM001",
        "user_email": "user.alex@example.com"
    },
 * 
 * @returns 
 */
export async function insertVerifies(newVerifies) {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		body: newVerifies,
	})

	if (!dbResult.ok) {
		throw new Error(`POST /Verifies/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} deletedVerifies example {
        "admin_ssn": "ADM001",
        "user_email": "user.alex@example.com"
    },
 * 
 * @returns 
 */
export async function deleteVerifies(deletedVerifies) {
	const dbResult = await fetch(`${apiUrl}/delete`, {
		method: 'DELETE',
		mode: 'cors',
		body: deletedVerifies,
	})

	if (!dbResult.ok) {
		throw new Error(`DELETE /Verifiess/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}
