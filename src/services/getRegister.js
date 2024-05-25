import { URL_API_REGISTER } from "@env"

/**
 * Realiza un registro de usuario mediante una solicitud a la API.
 * @param {Object} userData - Datos del usuario para el registro.
 * @param {string} userData.email - Correo electrónico del usuario.
 * @param {string} userData.password - Contraseña del usuario.
 * @returns {Promise<Object>} Una promesa que se resuelve con los datos del registro, incluido un posible error.
 */
const getRegister = ({email, password}) => {
    return fetch(`${URL_API_REGISTER}`,{
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
            const dataRegister = {
                error,
                isError: true
            }
            return dataRegister
        }else if(data.errors){
            const { errors } = data
            const dataRegister = {
                error: errors[0].msg,
                isError: true
            }
            return dataRegister
        }
        const dataRegister = {
            data,
            isError: false
        }
        return dataRegister
    })
}

export default getRegister