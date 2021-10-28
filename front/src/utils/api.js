/**
 * represente une erreur renvoyee par l'API
 */
export class ApiErrors {
  constructor(errors) {
    this.errors = errors;
  }
}
/**
 *
 * @param {string} endpoint
 * @param {object} options
 */

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch("http://localhost:3333" + endpoint, {
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
    ...options,
  });
  if (response.status === 204) {
    //no body
    return null;
  }
  const responseData = await response.json();
  if (response.ok) {
    return responseData;
  } else {
    if (responseData.errors) {
      throw new ApiErrors(responseData.errors);
    }
  }
}
