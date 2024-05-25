import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addCharacter } from "../features/characters/characterSlice"
import getAllCharacter from "../services/getAllCharacter"

/**
 * Hook personalizado para obtener datos de los personajes.
 * @returns {Object} Objeto que contiene información sobre los personajes.
 * @property {Array<Object>} characters - Lista de personajes.
 * @property {boolean} isLoading - Indica si se está cargando la información de los personajes.
 * @property {boolean} isError - Indica si ha ocurrido un error al cargar la información de los personajes.
 * @property {number} pages -Indica el número total de páginas
 */
const useCharacter = () => { 
  //Seleccionar los personajes del estado de Redux
  const characters = useSelector(state => state.characters)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  //Efecto para cargar los personajes
  useEffect(() =>{
    setIsLoading(true)
    getAllCharacter().then(data => {
      dispatch(addCharacter(data))
      setIsLoading(false)
    }).catch(e => {
      console.log(e)
      setIsLoading(false)
      setIsError(true)
    })
  },[])

  return {characters: characters.characters, isLoading, isError, pages: characters.pages } 
}

export default useCharacter