import { URL_API_DELETE_FAV } from "@env"

/**
 * Realiza una solicitud para eliminar un favorito.
 * @param {Object} options - Opciones para la solicitud.
 * @param {string} options.id - ID del elemento que se eliminará de favoritos.
 * @param {string} options.jwt - JWT del usuario para la autorización.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos de la respuesta.
 */
const getDeleteFav = ({id, jwt}) => {
    return fetch(`${URL_API_DELETE_FAV}`,{
        method: 'DELETE',
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

export default getDeleteFav