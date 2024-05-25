import { URL_API_SINGLE_LOCATION } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de ubicación.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos de la ubicación.
 */
const fromApiResponseToLocation = apiResponse => {
  return apiResponse
}

/**
 * Realiza una solicitud para obtener una única ubicación por su ID.
 * @param {Object} options - Opciones para la solicitud de la ubicación.
 * @param {string} options.id - ID de la ubicación que se desea obtener.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la ubicación solicitada.
 */
const getSingleLocation = ({ id }) => {
  return fetch(`${URL_API_SINGLE_LOCATION}${id}`)
    .then(res => res.json())
    .then(fromApiResponseToLocation)
}

export default getSingleLocation