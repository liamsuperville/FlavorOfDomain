const apiUrl = 'http://localhost:3000/meal-plans';

export function getAllMealPlans() {
  return fetch(`${apiUrl}/`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /meal-plans/ error status: ${response.status}`);
    }
    return response.json();
  });
}

/**
 * Get meal plans for a specific user
 * @param {*} userEmail Email of the user
 * @returns Promise with meal plans data
 */
export function getMealPlansByUserEmail(userEmail) {
  return fetch(`${apiUrl}/user/${userEmail}`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /meal-plans/user/${userEmail} error status: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    console.error("Error fetching meal plans:", error);
    return [];
  });
}

/**
 * Insert a new meal plan
 * @param {*} newMealPlan example {
 *    "user_email": "user.julia@example.com",
 *    "recipe_id": 10
 * }
 * @returns Promise with the created meal plan data
 */
export function insertMealPlans(newMealPlan) {
	// Ensure recipe_id is an integer
	const formattedMealPlan = {
	  ...newMealPlan,
	  recipe_id: parseInt(newMealPlan.recipe_id, 10)
	};
	
	console.log("Inserting meal plan:", formattedMealPlan);
	
	return fetch(`${apiUrl}/`, {
	  method: 'POST',
	  mode: 'cors',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(formattedMealPlan),
	})
	.then(response => {
	  console.log("Meal plan response status:", response.status);
	  
	  if (!response.ok) {
		return response.text().then(text => {
		  console.error("Error response body:", text);
		  throw new Error(`POST /meal-plans/ error status: ${response.status}: ${text}`);
		});
	  }
	  
	  // Check if response is JSON or plain text
	  const contentType = response.headers.get("content-type");
	  if (contentType && contentType.includes("application/json")) {
		return response.json();
	  } else {
		// Handle plain text success response
		return response.text().then(text => {
		  return {
			success: true,
			message: text,
			...formattedMealPlan
		  };
		});
	  }
	})
	.catch(error => {
	  console.error("Error inserting meal plan:", error);
	  throw error;
	});
  }

/**
 * Delete a meal plan
 * @param {*} deletedMealPlan example {
 *    "user_email": "user.julia@example.com",
 *    "recipe_id": 10
 * } 
 * @returns Promise with deletion result
 */
export function deleteMealPlans(deletedMealPlan) {
  // Ensure recipe_id is an integer
  const formattedMealPlan = {
    ...deletedMealPlan,
    recipe_id: parseInt(deletedMealPlan.recipe_id, 10)
  };
  
  console.log("Deleting meal plan:", formattedMealPlan);
  
  return fetch(`${apiUrl}/delete`, {
    method: 'DELETE',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formattedMealPlan),
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        console.error("Error response body:", text);
        throw new Error(`DELETE /meal-plans/ error status: ${response.status}: ${text}`);
      });
    }
  });
}