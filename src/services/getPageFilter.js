import { URL_API_PAGINATION_FILTER_CHARACTER } from "@env"

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
 * Realiza una solicitud para obtener una página específica de personajes filtrando los resultados.
 * @param {Object} options - Opciones para la solicitud de página.
 * @param {string} [options.index='1'] - Índice de la página a obtener (por defecto es '1').
 * @param {string} [options.status=''] - Estado de los personajes a filtrar (por defecto vacío).
 * @param {string} [options.name=''] - Nombre de los personajes a filtrar (por defecto vacío).
 * @param {string} [options.gender=''] - Género de los personajes a filtrar (por defecto vacío).
 * @param {string} [options.species=''] - Especie de los personajes a filtrar (por defecto vacío).
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la página solicitada.
 */
const getPageFilter = ({index, status, name, gender, species}={index: '1', name:'', gender:'', status:'', species:''}) => {
    return fetch(`${URL_API_PAGINATION_FILTER_CHARACTER}${index}&status=${status}&gender=${gender}&name=${name}&species=${species}`)
    .then(res => res.json())
    .then(fromApiResponseToPage)
}

export default getPageFilter