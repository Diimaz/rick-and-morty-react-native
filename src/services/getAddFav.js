import { URL_API_ADD_FAV } from "@env"

/**
 * Realiza una solicitud para agregar un favorito.
 * @param {Object} options - Opciones para la solicitud.
 * @param {string} options.id - ID del elemento que se agregará como favorito.
 * @param {string} options.jwt - JWT del usuario para la autorización.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la respuesta.
 */
const getAddFav = ({id, jwt}) => {
    return fetch(`${URL_API_ADD_FAV}`,{
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            idFav: id,
          }),
    }).then(res => res.json()).then(data => {
        return data
    })
}

export default getAddFav