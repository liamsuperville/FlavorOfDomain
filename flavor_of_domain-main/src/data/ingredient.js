const apiUrl = 'http://localhost:3000/ingredient';

/**
 * Get all ingredients
 * @returns Promise with all ingredients
 */
export function getAllIngredient() {
  console.log("Fetching all ingredients");
  return fetch(`${apiUrl}/`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /ingredient/ error status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(`Fetched ${data.length} ingredients`);
    return data;
  })
  .catch(error => {
    console.error("Error fetching ingredients:", error);
    return [];
  });
}

/**
 * Get an ingredient by name
 * @param {*} name Name of ingredient to retrieve
 * @returns Promise with ingredient data
 */
export function getIngredientByName(name) {
  console.log(`Fetching ingredient: ${name}`);
  return fetch(`${apiUrl}/${name}`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /ingredient/${name} error status: ${response.status}`);
    }
    return response.json();
  })
  .catch(error => {
    console.error(`Error fetching ingredient ${name}:`, error);
    throw error;
  });
}

/**
 * Insert a new ingredient
 * @param {*} newIngredient example {
 *    "name": "Garlic",
 *    "calories": 149
 * }
 * @returns Promise with the created ingredient data
 */
export function insertIngredient(newIngredient) {
  console.log("Inserting ingredient:", newIngredient);
  return fetch(`${apiUrl}/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newIngredient),
  })
  .then(response => {
    console.log("Insert ingredient response status:", response.status);
    if (!response.ok) {
      return response.text().then(text => {
        console.error("Error response body:", text);
        throw new Error(`POST /ingredient/ error status: ${response.status}: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log("Ingredient inserted successfully:", data);
    return data;
  })
  .catch(error => {
    console.error("Error inserting ingredient:", error);
    throw error;
  });
}

/**
 * Update an existing ingredient
 * @param {*} updatedIngredient example {
 *    "name": "Garlic",
 *    "calories": 149
 * }
 * @returns Promise with the updated ingredient data
 */
export function updateIngredient(updatedIngredient) {
  console.log("Updating ingredient:", updatedIngredient);
  return fetch(`${apiUrl}/${updatedIngredient.name}`, {
    method: 'PUT',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedIngredient),
  })
  .then(response => {
    console.log("Update ingredient response status:", response.status);
    if (!response.ok) {
      return response.text().then(text => {
        console.error("Error response body:", text);
        throw new Error(`PUT /ingredient/${updatedIngredient.name} error status: ${response.status}: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log("Ingredient updated successfully:", data);
    return data;
  })
  .catch(error => {
    console.error("Error updating ingredient:", error);
    throw error;
  });
}

/**
 * Delete an ingredient
 * @param {*} name Name of ingredient to delete
 * @returns Promise with deletion result
 */
export function deleteIngredient(name) {
  console.log(`Deleting ingredient: ${name}`);
  return fetch(`${apiUrl}/${name}`, {
    method: 'DELETE',
    mode: 'cors'
  })
  .then(response => {
    console.log("Delete ingredient response status:", response.status);
    if (!response.ok) {
      return response.text().then(text => {
        console.error("Error response body:", text);
        throw new Error(`DELETE /ingredient/${name} error status: ${response.status}: ${text}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log("Ingredient deleted successfully:", data);
    return data;
  })
  .catch(error => {
    console.error("Error deleting ingredient:", error);
    throw error;
  });
}