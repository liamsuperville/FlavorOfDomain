const apiUrl = 'http://localhost:3000/comment';

export function getAllComment() {
  return fetch(`${apiUrl}/`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /Comment/ error status: ${response.status}`);
    }
    return response.json();
  });
}

/**
*
* @param {*} comment_id of Comment to retrieve
* @returns
*/
export function getCommentById(comment_id) {
  return fetch(`${apiUrl}/${comment_id}`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /Comment/ error status: ${response.status}`);
    }
    return response.json();
  });
}

export async function getCommentCountByUserEmail(user_email) {
	console.log(`Getting Comment count for user_email ${user_email}`)
	const response = await fetch(`${apiUrl}/count/user/${user_email}`, {
		method: 'GET',
		mode: 'cors',
	})

	console.log('Get Comment response status:', response.status)

	if (!response.ok) {
		throw new Error(
			`GET /Comment/ error status: ${response.status}: ${await response.text()}`
		)
	}

	return await response.json()
}

/**
*
* @param {*} newComment example {
       "comment_id": 7,
       "text": "The stir-fry had a perfect balance of spice and zest.",
       "images": "stirfry.jpg",
       "user_email": "user.fiona@example.com",
       "recipe_id": 6,
       "monitored_by": "ADM006"
   }
*
* @returns
*/
export function insertComment(newComment) {
  return fetch(`${apiUrl}/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newComment),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`POST /Comment/ error status: ${response.status}`);
    }
  });
}

/**
*
* @param {*} updatedComment example {
       "comment_id": 7,
       "text": "The stir-fry had a perfect balance of spice and zest.",
       "images": "stirfry.jpg",
       "user_email": "user.fiona@example.com",
       "recipe_id": 6,
       "monitored_by": "ADM006"
   }
*
* @returns
*/
export function updateComment(updatedComment) {
  return fetch(`${apiUrl}/${updatedComment.comment_id}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedComment),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`PUT /Comment/ error status: ${response.status}`);
    }
  });
}

/**
*
* @param {*} comment_id of Comment to delete
*
* @returns
*/
export function deleteComment(comment_id) {
  return fetch(`${apiUrl}/${comment_id}`, {
    method: 'DELETE',
    mode: 'cors'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`DELETE /Comments/ error status: ${response.status}`);
    }
  });
}