import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { filtersCharacters } from "../features/characters/characterSlice"
import getFilterCharacter from "../services/getFilterCharacter"

/**
 * Hook personalizado para filtrar personajes.
 * @param {Object} options - Opciones de filtro: nombre, estado, género y especie.
 * @param {string} options.name - Nombre del personaje a filtrar.
 * @param {string} options.status - Estado del personaje a filtrar.
 * @param {string} options.gender - Género del personaje a filtrar.
 * @param {string} options.species - Especie del personaje a filtrar.
 * @returns {Object} Objeto que contiene informacion sobre los personajes filtrados
 * @property {Array<Object>} characters - Lista de personajes filtrados.
 * @property {boolean} isLoading - Indica si se está cargando la información de los personajes favoritos.
 * @property {boolean} isError - Indica si ha ocurrido un error al cargar la información de los personajes favoritos.
 * @property {number} pages - Indica el número total de paginas del filtro 
 */
const useFilterCharacter = ({name, status, gender, species}) => {
  //Seleccionar los personajes del estado de Redux
  const characters = useSelector(state => state.characters)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  //Efecto para cargar los personajes al cambiar el name, status, gender y species  
  useEffect(() =>{
    setIsLoading(true)
    getFilterCharacter({name, status, gender, species})
    .then(data => {
        dispatch(filtersCharacters(data))
        setIsLoading(false)
    }).catch( e => {
        setIsLoading(false)
        setIsError(true)
    })
  },[name,status, gender, species])

  return {characters: characters.filterCharacters, isLoading, isError, pages: characters.pagesFilter } 
}

export default useFilterCharacter