import { URL_API_LOGIN } from "@env"

/**
 * Realiza una solicitud de inicio de sesión.
 * @param {Object} credentials - Credenciales de inicio de sesión.
 * @param {string} credentials.email - Correo electrónico del usuario.
 * @param {string} credentials.password - Contraseña del usuario.
 * @returns {Promise<Object>} Una promesa que se resuelve con el token de autenticación si el inicio de sesión es exitoso, o un objeto con el error si falla.
 */
const getLogin = ({email, password}) => {
    return fetch(`${URL_API_LOGIN}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
          }),
    }).then(res => res.json()).then(data => {
        if(data.error){
            const { error } = data
            const dataToken = {
                error,
                isError: true
            }
            return dataToken
        }else if(data.errors){
            const { errors } = data
            const dataToken = {
                error: errors[0].msg,
                isError: true
            }
            return dataToken
        }
        const { token } = data
        const dataToken = {
            token,
            isError: false
        }
        return dataToken
    })
}

export default getLogin