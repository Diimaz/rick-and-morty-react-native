import { URL_API_PAGINATION_FILTER_LOCATION } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de ubicaciones.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos de las ubicaciones.
 */
const fromApiResponseToLocations = apiResponse => {
    const {results} = apiResponse
    const data = {
        results,
    }   
    return data
}

/**
 * Realiza una solicitud para obtener una página específica de ubicaciones filtrando los resultados.
 * @param {Object} options - Opciones para la solicitud de página.
 * @param {string} [options.index='1'] - Índice de la página a obtener (por defecto es '1').
 * @param {string} [options.name=''] - Nombre de las ubicaciones a filtrar (por defecto vacío).
 * @param {string} [options.type=''] - Tipo de las ubicaciones a filtrar (por defecto vacío).
 * @param {string} [options.dimension=''] - Dimensión de las ubicaciones a filtrar (por defecto vacío).
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la página solicitada.
 */
const getPageFilterLocation = ({index, name, type, dimension}={index: '1', name:'', type:'', dimension:''}) => {
    return fetch(`${URL_API_PAGINATION_FILTER_LOCATION}${index}&name=${name}&type=${type}&dimension=${dimension}`)
    .then(res => res.json())
    .then(fromApiResponseToLocations)
}

export default getPageFilterLocation