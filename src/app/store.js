import { configureStore } from "@reduxjs/toolkit"
import characterReducer from "../features/characters/characterSlice"
import locationReducer from "../features/locations/locationSlice"
import episodeReducer from "../features/episodes/episodeSlice"
import authUserReducer from "../features/authUser/authUserSlice"

/**
 * Configura y crea una store Redux con los reducers proporcionados.
 * @param {Object} options - Opciones para configurar la store Redux.
 * @param {Object} options.reducer - Reducers que definen el estado de la store.
 * @returns {Object} La sotore Redux configurada.
 */
const store = configureStore({
    reducer:{
        characters: characterReducer,
        locations: locationReducer,
        episodes: episodeReducer,
        authUsers: authUserReducer
    }
})

export default store