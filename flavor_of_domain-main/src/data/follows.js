const apiUrl = 'http://localhost:3000/follows'

export async function getAllFollows() {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	})

	if (!dbResult.ok) {
		throw new Error(`GET /Follows/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

// TODO add gets to /getFollowsByFolloweeEmail and /getFollowsByFollowerEmail if necessary

/**
 * 
 * @param {*} newFollows example {
        "follower_email": "user.hannah@example.com",
        "followee_email": "user.julia@example.com"
    }
 * 
 * @returns 
 */
export async function insertFollows(newFollows) {
	const dbResult = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		body: newFollows,
	})

	if (!dbResult.ok) {
		throw new Error(`POST /Follows/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}

/**
 * 
 * @param {*} deletedFollows example {
        "follower_email": "user.hannah@example.com",
        "followee_email": "user.julia@example.com"
    }
 * 
 * @returns 
 */
export async function deleteFollows(deletedFollows) {
	const dbResult = await fetch(`${apiUrl}/delete`, {
		method: 'DELETE',
		mode: 'cors',
		body: deletedFollows,
	})

	if (!dbResult.ok) {
		throw new Error(`DELETE /Followss/ error status: ${dbResult.status}`)
	}

	return await dbResult.json()
}
