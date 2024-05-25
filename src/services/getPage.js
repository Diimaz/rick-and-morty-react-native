import { URL_API_PAGINATION } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de página.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos de la página.
 */
const fromApiResponseToPage = apiResponse => {
    const {results} = apiResponse
    const data = {
        results,
    }   
    return data
}

/**
 * Realiza una solicitud para obtener una página específica.
 * @param {Object} options - Opciones para la solicitud de página.
 * @param {string} [options.index='1'] - Índice de la página a obtener (por defecto es '1').
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la página solicitada.
 */
const getPage = ({index}={index: '1'}) => {
    return fetch(`${URL_API_PAGINATION}${index}`)
    .then(res => res.json())
    .then(fromApiResponseToPage)
}

export default getPage