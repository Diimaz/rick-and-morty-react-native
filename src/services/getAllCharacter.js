import { URL_API_ALL_CHARACTER, URL_API_PAGINATION } from "@env"

/**
 * Convierte la respuesta de la API en un formato de datos de personajes.
 * @param {Object} apiResponse - Respuesta de la API.
 * @returns {Object} Datos de los personajes.
 */
const fromApiResponseToCharacters = apiResponse => {
  const {info,results } = apiResponse
  const first = `${URL_API_PAGINATION}1`
  const last = `${URL_API_PAGINATION}${info.pages}`
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
 * Realiza una solicitud para obtener todos los personajes de la API.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de los personajes.
 */
const getAllCharacter = () => {
    return fetch(URL_API_ALL_CHARACTER)
          .then(data => data.json())
          .then(fromApiResponseToCharacters)
}

export default getAllCharacter