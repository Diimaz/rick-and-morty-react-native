import { URL_API_FILTER_CHARACTER, URL_API_PAGINATION_FILTER_CHARACTER } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos del personaje.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos del personaje.
 */
const fromApiResponseToCharacter = (apiResponse) => {
    const {info,results } = apiResponse
    const first = `${URL_API_PAGINATION_FILTER_CHARACTER}1`
    const last = `${URL_API_PAGINATION_FILTER_CHARACTER}${info.pages}`
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
 * Realiza una solicitud para filtrar personajes según los parámetros proporcionados.
 * @param {Object} options - Opciones para la solicitud de filtrado.
 * @param {string} options.name - Nombre del personaje a filtrar.
 * @param {string} options.status - Estado del personaje a filtrar.
 * @param {string} options.species - Especie del personaje a filtrar.
 * @param {string} options.gender - Género del personaje a filtrar.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de los personajes filtrados.
 */
const getFilterCharacter = ({ name, status, species, gender }) => {
  return fetch(`${URL_API_FILTER_CHARACTER}name=${name}&status=${status}&gender=${gender}&species=${species}`)
    .then(res => res.json())
    .then(fromApiResponseToCharacter)
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

export default getFilterCharacter