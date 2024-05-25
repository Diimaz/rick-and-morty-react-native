import { createSlice } from "@reduxjs/toolkit"

/**
 * Estado inicial del slice de ubicaciones.
 * @type {Object}
 */
initialState = {
    locations:[],
    charactersOneLocation:[],
    first:'',
    prev:'',
    next:'',
    last:'',
    totalPages: 0,
    pages: [],
}

/**
 * Slice de Redux para el manejo del estado de las ubicaciones.
 */
export const locationSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        /**
         * Cambia las ubicaciones en el estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los datos de las ubicaciones.
         */
        changeLocation: (state, action) => {
            state.locations = action.payload.results
        },
        /**
         * Filtra y actualiza las ubicaciones en el estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los datos de las ubicaciones filtradas.
         */
        filtersLocation: (state, action) => {
            state.locations = action.payload.results
            state.first = action.payload.first
            state.prev = action.payload.prev
            state.next = action.payload.next
            state.last = action.payload.last
            state.totalPages = action.payload.totalPages
            state.pages = action.payload.pages
        },
        /**
         * Agrega personajes de una ubicación al estado.
         * @param {Object} state - Estado actual del slice.
         * @param {Object} action - Acción que contiene los personajes de una ubicación.
         */
        addCharacterLocation: (state, action) => {
            state.charactersOneLocation = action.payload
        }
    },
})

export const { changeLocation, filtersLocation, addCharacterLocation} = locationSlice.actions
export default locationSlice.reducer