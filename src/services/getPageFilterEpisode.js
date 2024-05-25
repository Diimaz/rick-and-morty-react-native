import { URL_API_PAGINATION_FILTER_EPISODE } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de episodios.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos de los episodios.
 */
const fromApiResponseToEpisodes = apiResponse => {
    const {results} = apiResponse
    const data = {
        results,
    }   
    return data
}

/**
 * Realiza una solicitud para obtener una página específica de episodios filtrando los resultados.
 * @param {Object} options - Opciones para la solicitud de página.
 * @param {string} [options.index='1'] - Índice de la página a obtener (por defecto es '1').
 * @param {string} [options.name=''] - Nombre de los episodios a filtrar (por defecto vacío).
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la página solicitada.
 */
const getPageFilterEpisode = ({index, name}={index: '1', name:''}) => {
    console.log(`${URL_API_PAGINATION_FILTER_EPISODE}${index}&name=${name}`)
    return fetch(`${URL_API_PAGINATION_FILTER_EPISODE}${index}&name=${name}`)
    .then(res => res.json())
    .then(fromApiResponseToEpisodes)
}

export default getPageFilterEpisode