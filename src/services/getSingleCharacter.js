import { URL_API_SINGLE_CHARACTER } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de personaje.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos del personaje.
 */
const fromApiResponseToCharacter = apiResponse => {
  return apiResponse
}

/**
 * Realiza una solicitud para obtener un único personaje por su ID.
 * @param {Object} options - Opciones para la solicitud del personaje.
 * @param {string} options.id - ID del personaje que se desea obtener.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos del personaje solicitado.
 */
const getSingleCharacter = ({ id }) => {
  return fetch(`${URL_API_SINGLE_CHARACTER}${id}`)
    .then(res => res.json())
    .then(fromApiResponseToCharacter)
}

export default getSingleCharacter