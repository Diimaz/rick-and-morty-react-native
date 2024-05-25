import { URL_API_MULTI_CHARACTER } from "@env"


/**
 * Convierte la respuesta de la API en un formato de datos de personajes.
 * @param {Object|Array<Object>} apiResponse - Respuesta de la API.
 * @returns {Array<Object>} Datos de los personajes.
 */
const fromApiResponseToCharacters = apiResponse => {
  if(!Array.isArray(apiResponse)){
    const apiResponseArray = []
    apiResponseArray.push(apiResponse)
   return  apiResponseArray
  }else if(Array.isArray(apiResponse)){
    return apiResponse
  }
}

/**
 * Realiza una solicitud para obtener información sobre varios personajes.
 * @param {string} characters - IDs de los personajes.
 * @returns {Promise<Array<Object>>} Una promesa que se resuelve con los datos de los personajes.
 */
const getMultiCharacter = (characters) => {
  return fetch(`${URL_API_MULTI_CHARACTER}${characters}`)
    .then(res => res.json())
    .then(fromApiResponseToCharacters)
}

export default getMultiCharacter