// Fixed version of users.js without hooks
const apiUrl = 'http://localhost:3000/users'

export function getUsers() {
	return fetch(`${apiUrl}/`, {
		method: 'GET',
		mode: 'cors',
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`GET /users/ error status: ${response.status}`)
		}
		return response.json()
	})
}

export function getUserByEmail(email) {
	return fetch(`${apiUrl}/${email}`, {
		method: 'GET',
		mode: 'cors',
	}).then((response) => {
		if (!response.ok) {
			throw new Error(`GET /users/:email error status: ${response.status}`)
		}
		return response.json()
	})
}

/**
*
* @param {*} newUser example {
       "email": "user.ted@example.com",
       "password": "passTed",
       "name": "Ted Danson",
       "birthday": "2009-09-19",
       "verified": 0
   }
*
* @returns
*/
export async function insertUser(newUser) {
	const response = await fetch(`${apiUrl}/`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newUser),
	})

  if (!response.ok) {
    throw new Error(`POST /users/ error status: ${response.status}`)
  }
  return await response.json()
}

/**
*
* @param {*} updatedUser example {
       "email": "user.ted@example.com",
       "password": "passTed",
       "name": "Ted Danson",
       "birthday": "2009-09-19",
       "verified": 0
   }
*
* @returns
*/
export async function updateUser(updatedUser) {
	const response = await fetch(`${apiUrl}/update/${updatedUser.email}`, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updatedUser),
	})

	if (!response.ok) {
		throw new Error(`PUT /users/:email error status: ${response.status}`)
	}

	return await response.json()
}

export async function updateUserPassword(userData) {
	console.log(userData)
	const result = await fetch(`${apiUrl}/update-password`, {
		method: 'PUT',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	})

	if (!result.ok) {
		throw new Error(`PUT /user/update-password error status: ${result.status}`)
	}

	return await result.json()
}

/**
 *
 * @param {*} email of user to delete
 *
 * @returns
 */
export async function deleteUser(email) {
	const response = await fetch(`${apiUrl}/${email}`, {
		method: 'DELETE',
		mode: 'cors',
	})

	if (!response.ok) {
		throw new Error(`DELETE /users/:email error status: ${response.status}`)
	}
	return await response.json()
}
