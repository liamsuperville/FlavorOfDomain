const apiUrl = 'http://localhost:3000/rating';

export function getAllRating() {
  return fetch(`${apiUrl}/`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /rating/ error status: ${response.status}`);
    }
    return response.json();
  });
}

/**
 * Get ratings by recipe ID
 * @param {*} recipeId The ID of the recipe
 * @returns Promise with ratings data
 */
export function getRatingsByRecipeId(recipeId) {
  return fetch(`${apiUrl}/recipe/${recipeId}`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /rating/recipe/${recipeId} error status: ${response.status}`);
    }
    return response.json();
  });
}

/**
 * Get user's rating for a specific recipe
 * @param {*} userEmail The email of the user
 * @param {*} recipeId The ID of the recipe
 * @returns Promise with rating data
 */
export function getUserRatingForRecipe(userEmail, recipeId) {
  return fetch(`${apiUrl}/user/${userEmail}/recipe/${recipeId}`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      if (response.status === 404) {
        // Return null if rating doesn't exist
        return null;
      }
      throw new Error(`GET /rating/user/${userEmail}/recipe/${recipeId} error status: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    console.error("Error fetching user rating:", error);
    return null;
  });
}

export async function getRatingCountByUserEmail(user_email) {
	console.log(`Getting Rating count for user_email ${user_email}`)
	const response = await fetch(`${apiUrl}/count/user/${user_email}`, {
		method: 'GET',
		mode: 'cors',
	})

	console.log('Get Rating response status:', response.status)

	if (!response.ok) {
		throw new Error(
			`GET /Rating/ error status: ${response.status}: ${await response.text()}`
		)
	}

	return await response.json()
}

/**
 * Insert a new rating
 * @param {*} newRating example {
 *    "user_email": "user.hannah@example.com",
 *    "recipe_id": 8,
 *    "number_of_stars": 4
 * }
 * @returns Promise with the created rating data
 */
export function insertRating(newRating) {
  // Ensure recipe_id is an integer
  const formattedRating = {
    ...newRating,
    recipe_id: parseInt(newRating.recipe_id, 10),
    number_of_stars: parseInt(newRating.number_of_stars, 10)
  };
  
  console.log("Inserting rating:", formattedRating);
  
  return fetch(`${apiUrl}/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedRating),
  })
  .then(response => {
    console.log("Rating response status:", response.status);
    if (!response.ok) {
      return response.text().then(text => {
        console.error("Error response body:", text);
        throw new Error(`POST /rating/ error status: ${response.status}: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log("Rating inserted successfully:", data);
    return data;
  })
  .catch(error => {
    console.error("Error inserting rating:", error);
    throw error;
  });
}

/**
 * Update an existing rating
 * @param {*} updatedRating example {
 *    "user_email": "user.hannah@example.com",
 *    "recipe_id": 8,
 *    "number_of_stars": 5
 * }
 * @returns Promise with the updated rating data
 */
export function updateRating(updatedRating) {
  // Ensure recipe_id and number_of_stars are integers
  const formattedRating = {
    ...updatedRating,
    recipe_id: parseInt(updatedRating.recipe_id, 10),
    number_of_stars: parseInt(updatedRating.number_of_stars, 10)
  };
  
  console.log("Updating rating:", formattedRating);
  
  return fetch(`${apiUrl}/update`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedRating),
  })
  .then(response => {
    console.log("Rating update response status:", response.status);
    if (!response.ok) {
      return response.text().then(text => {
        console.error("Error response body:", text);
        throw new Error(`PUT /rating/update error status: ${response.status}: ${text}`);
      });
    }
    return response.text().then(text => {
      console.log("response body:", text);
    });
  })
  .catch(error => {
    console.error("Error updating rating:", error);
    throw error;
  });
}

/**
 * Delete a rating
 * @param {*} userEmail The email of the user
 * @param {*} recipeId The ID of the recipe
 * @returns Promise with deletion result
 */
export function deleteRating(userEmail, recipeId) {
  const deletedRating = {
    user_email: userEmail,
    recipe_id: parseInt(recipeId, 10)
  };
  
  console.log("Deleting rating:", deletedRating);
  
  return fetch(`${apiUrl}/delete`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(deletedRating),
  })
  .then(response => {
    console.log("Rating deletion response status:", response.status);
    if (!response.ok) {
      return response.text().then(text => {
        console.error("Error response body:", text);
        throw new Error(`DELETE /rating/delete error status: ${response.status}: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log("Rating deleted successfully:", data);
    return data;
  })
  .catch(error => {
    console.error("Error deleting rating:", error);
    throw error;
  });
}