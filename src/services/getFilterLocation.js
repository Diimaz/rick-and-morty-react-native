import { URL_API_FILTER_LOCATION } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de ubicaciones.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos de las ubicaciones.
 */
const fromApiResponseToLocation = apiResponse => {
    const {info,results } = apiResponse
    const first = `${URL_API_FILTER_LOCATION}1`
    const last = `${URL_API_FILTER_LOCATION}${info.pages}`
    let arrayPages = []
    for (let index = 0; index < info.pages; index++) {
      arrayPages = [...arrayPages, index+1]
    }
    const data = {
      results,
      first,
      prev: info.prev,
      next: info.next,
      last,
      totalPages: info.pages,
      pages: arrayPages,
      }
    return data
}

/**
 * Realiza una solicitud para filtrar ubicaciones según los parámetros proporcionados.
 * @param {Object} options - Opciones para la solicitud de filtrado.
 * @param {string} options.name - Nombre de la ubicación a filtrar.
 * @param {string} options.type - Tipo de la ubicación a filtrar.
 * @param {string} options.dimension - Dimensión de la ubicación a filtrar.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de las ubicaciones filtradas.
 */
const getFilterLocation = ({ name, type, dimension }) => {
  return fetch(`${URL_API_FILTER_LOCATION}name=${name}&type=${type}&dimension=${dimension}`)
    .then(res => res.json())
    .then(fromApiResponseToLocation)
    .catch(e => {
        const data = {
            results:[],
            first:'',
            prev: '',
            next: '',
            last: '',
            totalPages: '',
            pages: []
        }
           return data
    })
}

export default getFilterLocation