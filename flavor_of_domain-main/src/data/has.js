const apiUrl = 'http://localhost:3000/has';

export function getAllHas() {
  return fetch(`${apiUrl}/`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /has/ error status: ${response.status}`);
    }
    return response.json();
  });
}

export function getHasByUserEmail(userEmail) {
  return fetch(`${apiUrl}/user/${userEmail}`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /has/user/${userEmail} error status: ${response.status}`);
    }
    return response.json();
  });
}

/**
 * Insert a new dietary preference for a user
 * @param {*} newHas example {
 *    "user_email": "user.example@example.com",
 *    "dietary_name": "Vegan"
 * }
 * @returns Promise with the created 'has' relationship data
 */
export function insertHas(newHas) {
  console.log(newHas)
  return fetch(`${apiUrl}/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newHas),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`POST /has/ error status: ${response.status}`);
    }
    return true
  });
}

/**
 * Delete a dietary preference for a user
 * @param {*} deletedHas example {
 *    "user_email": "user.example@example.com",
 *    "dietary_name": "Vegan"
 * }
 * @returns Promise with the deletion result
 */
export function deleteHas(deletedHas) {
  return fetch(`${apiUrl}/delete`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deletedHas),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`DELETE /has/ error status: ${response.status}`);
    }
    return true
  });
}