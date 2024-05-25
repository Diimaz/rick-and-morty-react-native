import { URL_API_SINGLE_EPISODE } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de episodio.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos del episodio.
 */
const fromApiResponseToEpisodes = apiResponse => {
  return apiResponse
}

/**
 * Realiza una solicitud para obtener un único episodio por su ID.
 * @param {Object} options - Opciones para la solicitud del episodio.
 * @param {string} options.id - ID del episodio que se desea obtener.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos del episodio solicitado.
 */
const getSingleEpisode = ({ id }) => {
   return fetch(`${URL_API_SINGLE_EPISODE}${id}`)
     .then(res => res.json())
     .then(fromApiResponseToEpisodes)
}

export default getSingleEpisode