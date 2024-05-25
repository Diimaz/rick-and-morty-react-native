import { createSlice } from "@reduxjs/toolkit"

/**
 * Estado inicial del slice de episodios.
 * @type {Object}
 */
initialState = {
    episodes:[],
    charactersOneEpisode:[],
    first:'',
    prev:'',
    next:'',
    last:'',
    totalPages: 0,
    pages: [],
}

/**
 * Slice de Redux para el manejo del estado de los episodios.
 */
export const episodeSlice = createSlice({
    name: 'episodes',
    initialState,
    reducers: {
        /**
        * Cambia los episodios en el estado.
        * @param {Object} state - Estado actual del slice.
        * @param {Object} action - Acción que contiene los datos de los episodios.
        */
        changeEpisode: (state, action) => {
            state.episodes = action.payload.results
        },
        /**
         * Filtra y actualiza los episodios en el estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los datos de los episodios filtrados.
         */
        filtersEpisode: (state, action) => {
            state.episodes = action.payload.results
            state.first = action.payload.first
            state.prev = action.payload.prev
            state.next = action.payload.next
            state.last = action.payload.last
            state.totalPages = action.payload.totalPages
            state.pages = action.payload.pages
        },
        /**
         * Agrega personajes de un episodio al estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los personajes de un episodio.
         */
        addCharacterEpisode: (state, action) => {
            state.charactersOneLocation = action.payload
        }
    },
})

export const { changeEpisode, filtersEpisode, addCharacterEpisode} = episodeSlice.actions
export default episodeSlice.reducer