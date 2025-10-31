const apiUrl = 'http://localhost:3000/category';

export function getAllCategory() {
  return fetch(`${apiUrl}/`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /Category/ error status: ${response.status}`);
    }
    return response.json();
  });
}

/**
*
* @param {*} type of category to get
* @returns
*/
export function getCategoryByType(type) {
  return fetch(`${apiUrl}/${type}`, {
    method: 'GET',
    mode: 'cors',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`GET /Category/ error status: ${response.status}`);
    }
    return response.json();
  });
}

/**
*
* @param {*} newCategory example {
       "type": "Seafood"
   }
*
* @returns
*/
export function insertCategory(newCategory) {
  return fetch(`${apiUrl}/`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newCategory),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`POST /Category/ error status: ${response.status}`);
    }
    return response.json();
  });
}

/**
*
* @param {*} type of Category to delete
*
* @returns
*/
export function deleteCategory(type) {
  return fetch(`${apiUrl}/${type}`, {
    method: 'DELETE',
    mode: 'cors'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`DELETE /Categorys/ error status: ${response.status}`);
    }
    return response.json();
  });
}