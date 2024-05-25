import { URL_API_ALL_FAV } from "@env"

/**
 * Realiza una solicitud para obtener todos los favoritos del usuario.
 * @param {Object} options - Opciones para la solicitud.
 * @param {string} options.jwt - JWT del usuario para la autorización.
 * @returns {Promise<Array<Object>>} Una promesa que se resuelve con la lista de favoritos del usuario.
 */
const getAllFavs = ({jwt}) => {
    return fetch(`${URL_API_ALL_FAV}`,{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
    }).then(res => res.json()).then(data => {
        return data.data.favs
    })
}

export default getAllFavs