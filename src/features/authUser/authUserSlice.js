import { createSlice } from "@reduxjs/toolkit"
import { getDataAsyncStorage } from "../../services/getAsyncStorage"
import getAllFavs from "../../services/getAllFavs"

/**
 * Estado inicial del slice de autenticación de usuario.
 * @type {Object}
 */
initialState = {
    jwt:null,
    favs:[],
    favsUsers:[]
}

/**
 * Slice de Redux para el manejo del estado de autenticación del usuario.
 */
export const authUserSlice = createSlice({
    name: 'authUser',
    initialState,
    reducers: {
        /**
         * Establece el JWT inicial.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene el payload del JWT.
         */
        initialJwt: (state, action) => {
            state.jwt = action.payload
        },
        /**
         * Agrega un JWT al estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene el payload del JWT.
         */
        addJwt: (state, action) => {
            state.jwt = action.payload
        },
        /**
         * Restablece el JWT a null.
         * @param {Object} state - Estado actual del slice.
         */
        resetJwt: (state, action) => {
            state.jwt = null
        },
        /**
         * Agrega favoritos al estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los favoritos.
         */
        addFavs: (state, action) => {
            state.favs = action.payload
        },
        /**
         * Restablece los favoritos a una matriz vacía.
         * @param {Object} state - Estado actual del slice.
         */
        resetFavs: (state, action) => {
            state.favs = []
        }
    },
})

export const { initialJwt, addJwt, resetJwt, addFavs, resetFavs } = authUserSlice.actions
export default authUserSlice.reducer

/**
 * Obtiene datos iniciales de forma asíncrona y los almacena en el estado.
 * @returns {function} Una función de acción asíncrona que puede ser dispatch en Redux.
 */
export const getDataInitialAsync = () => async (dispatch) => {
    try {
      const jwt = await getDataAsyncStorage()
      if (jwt) {
        dispatch(initialJwt(jwt))
        const favs = await getAllFavs({jwt})
        dispatch(addFavs(favs))
      }
    } catch (error) {
      console.error('Error al obtener el dato inicial desde AsyncStorage:', error)
    }
}
