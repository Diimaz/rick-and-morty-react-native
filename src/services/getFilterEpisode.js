import { URL_API_FILTER_EPISODE } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de episodios.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos de los episodio.
 */
const fromApiResponseToEpisode = apiResponse => {
    const {info,results } = apiResponse
    const first = `${URL_API_FILTER_EPISODE}1`
    const last = `${URL_API_FILTER_EPISODE}${info.pages}`
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
 * Realiza una solicitud para filtrar episodios según el nombre proporcionado.
 * @param {Object} options - Opciones para la solicitud de filtrado.
 * @param {string} options.name - Nombre del episodio a filtrar.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de los episodios filtrados.
 */
const getFilterEpisode = ({ name }) => {
  return fetch(`${URL_API_FILTER_EPISODE}name=${name}`)
    .then(res => res.json())
    .then(fromApiResponseToEpisode)
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

export default getFilterEpisode