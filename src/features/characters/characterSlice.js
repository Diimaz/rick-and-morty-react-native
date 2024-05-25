import { createSlice } from "@reduxjs/toolkit"

/**
 * Estado inicial del slice de personajes.
 * @type {Object}
 */
initialState = {
    characters:[],
    first:'',
    prev:'',
    next:'',
    last:'',
    totalPages: 0,
    pages: [],
    filterCharacters:[],
    totalPagesFilter:0,
    pagesFilter:[]
}

/**
 * Slice de Redux para el manejo del estado de los personajes.
 */
export const characterSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        /**
         * Agrega personajes al estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los datos de los personajes.
         */
        addCharacter: (state, action) => {
            state.characters = action.payload.results
            state.first = action.payload.first
            state.prev = action.payload.prev
            state.next = action.payload.next
            state.last = action.payload.last
            state.totalPages = action.payload.totalPages
            state.pages = action.payload.pages 
            state.filterCharacters = action.payload.results 
        },
        /**
         * Cambia los personajes en el estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los datos de los personajes.
         */
        changeCharacter: (state, action) => {
            state.characters = action.payload.results
        },
        /**
         * Cambia los personajes filtrados en el estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los datos de los personajes filtrados.
         */
        changeFilterCharacter: (state, action) => {
            state.filterCharacters = action.payload.results
        },
        /**
         * Filtra y actualiza los personajes en el estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los datos de los personajes filtrados.
         */
        filtersCharacters: (state, action) => {
            state.filterCharacters = action.payload.results
            state.first = action.payload.first
            state.prev = action.payload.prev
            state.next = action.payload.next
            state.last = action.payload.last
            state.totalPagesFilter = action.payload.totalPages
            state.pagesFilter = action.payload.pages
        }
    },
})

export const { addCharacter, changeCharacter, changeFilterCharacter,filtersCharacters} = characterSlice.actions
export default characterSlice.reducer