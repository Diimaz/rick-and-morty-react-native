import { useState, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addFavs, addJwt, resetFavs, resetJwt } from "../features/authUser/authUserSlice"
import getLogin from "../services/getLogin"
import { removeToken, saveToken } from "../services/getAsyncStorage"
import getAddFav from "../services/getAddFav"
import getDeleteFav from "../services/getDeleteFav"
import getAllFavs from "../services/getAllFavs"
import getRegister from "../services/getRegister"


/**
 * Hook personalizado para gestionar la autenticación de usuario y las operaciones relacionadas.
 * @returns {Object} Objeto que contiene funciones y estados relacionados con la autenticación y la gestión de favoritos del usuario.
 * @property {boolean} isLogin - Indica si el usuario está autenticado.
 * @property {Function} register - Función para registrar un nuevo usuario.
 * @property {Function} login - Función para iniciar sesión de usuario.
 * @property {Function} logout - Función para cerrar sesión de usuario.
 * @property {Function} addFav - Función para agregar un favorito.
 * @property {Function} deleteFav - Función para eliminar un favorito.
 * @property {Function} resetFav - Función para restablecer los favoritos del usuario.
 * @property {Object} stateRegister - Estado relacionado con el registro de usuario.
 * @property {Object} stateLogin - Estado relacionado con el inicio de sesión de usuario.
 * @property {Object} stateFavs - Estado relacionado con los favoritos del usuario.
 * @property {boolean} isError - Indica si ha ocurrido un error en alguna operación.
 */
const useUser = () => {
    //Seleccionar los datos del usuario del estado de Redux
    const authUser = useSelector(state => state.authUsers)
    const dispatch = useDispatch()
    const [isError, setIsError] = useState(false)
    //Estado local para almacenar la informacion sobre login, registro y los favoritos del usuario
    const [stateLogin, setStateLogin] = useState({loading: false, isError: false, error:'', successfully:false})
    const [stateRegister, setStateRegister] = useState({loading: false, isError: false, error:'', successfully: false })
    const [stateFavs, setStateFavs] = useState({loading: false, isError: false})

    /**
     * Registra un nuevo usuario.
     * @param {Object} options - Datos del usuario para el registro.
     * @param {string} options.email - Correo electrónico del usuario.
     * @param {string} options.password - Contraseña del usuario.
     * @param {string} options.confirPassword - Confirmación de la contraseña del usuario.
    */
    const register = useCallback(({email, password, confirPassword }) => {
        if(password !== confirPassword){
            setStateRegister({isError: true, error:'Las contraseñas no coinciden'})
            return
        }
        setStateRegister({loading: true, isError:false})
        getRegister({email,password})
        .then(dataRegister => {
            if(dataRegister.isError === true){
                setStateRegister({loading:false, isError:true, error: dataRegister.error})
                return
            }
            setStateRegister({loading:false, isError:false, successfully:true})
            return 
        })
        .catch(e => {
            console.log(e)
            setIsError(true)
        })
    },[])

    /**
     * Poder iniciar sesión el usuario.
     * @param {Object} credentials - Credenciales del usuario para el inicio de sesión.
     * @param {string} credentials.email - Correo electrónico del usuario.
     * @param {string} credentials.password - Contraseña del usuario.
    */
    const login = useCallback(({email, password}) => {
        setStateLogin({ loading:true, isError:false })
        getLogin({email, password}).then(dataToken => {
            console.log(dataToken)
            if(dataToken.isError === true){
                setStateLogin({ loading:false, isError:true, error: dataToken.error })
                return
            }
            dispatch(addJwt(dataToken.token))
            saveToken(dataToken.token)
            const jwt = dataToken.token
            getAllFavs({jwt}).then(data => {
            dispatch(addFavs(data))
            }).catch(e => {
                console.log(e)
                dispatch(resetJwt())
                setIsError(true)
            })
            setIsError(false)
            setStateLogin({ loading:false, isError:false, successfully:true })
        }).catch(e => {
            console.log(e)
            dispatch(resetJwt())
            setIsError(true)
        })
    },[])

    /**
     * Cerrar sesión del usuario.
     **/
    const logout = useCallback(()=> {
        removeToken()
        dispatch(resetJwt())
        resetFav()
    },[])

    /**
     * Agregar un personaje favorito para el usuario.
     * @param {Object} options - Datos para agregar el favorito.
     * @param {number} options.id - ID del personaje favorito.
     * @param {string} options.jwt - JWT del usuario para la autorización.
    */
    const addFav = useCallback(({id, jwt})=> {
        setStateFavs({loading: true, isError:false})
        getAddFav({id, jwt})
        .then(data => {
            const favs = data.updateFavs.favs
            dispatch(addFavs(favs))
            setStateFavs({loading: false, isError:false})
        })
        .catch(e => {
            console.log(e)
            setStateFavs({loading: false, isError:true})
        })
    },[])

    /**
     * Eliminar un personaje favorito para el usuario.
     * @param {Object} options - Datos para eliminar el favorito.
     * @param {number} options.id - ID del personaje favorito.
     * @param {string} options.jwt - JWT del usuario para la autorización.
    */
    const deleteFav = useCallback(({id,jwt}) => {
        getDeleteFav({id,jwt})
        .then(data => {
            const favs = data.deleteFavs.favs
            console.log(favs)
            dispatch(addFavs(favs))
        })
        .catch(e => console.log(e))
    },[])
    
    /**
     * Resetear los favoritos guardados en el estado de Redux.
    */
    const resetFav = useCallback(() => {
        dispatch(resetFavs())
    },[])

    return {
        isLogin: Boolean(authUser.jwt),
        register,
        login,
        logout,
        addFav,
        deleteFav,
        resetFav,
        stateRegister,
        stateLogin,
        stateFavs,
        isError
     } 
}

export default useUser