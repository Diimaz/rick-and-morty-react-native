import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import getMultiCharacter from "../services/getMultiCharacter"

/**
 * Hook personalizado para gestionar la lógica relacionada con los personajes favoritos del usuario.
 * @param {Object} options - Opciones para el hook.
 * @param {Array} options.characters - Lista de personajes.
 * @returns {Object} Objeto que contiene información sobre los personajes favoritos.
 * @property {Array<Object>} characterFavs - Lista de personajes favoritos.
 * @property {boolean} isLoadingFavs - Indica si se está cargando la información de los personajes favoritos.
 * @property {boolean} isError - Indica si ha ocurrido un error al cargar la información de los personajes favoritos.
 */

const useFavsCharacter = ({characters}) => {
  // Seleccionar el usuario autenticado del estado de Redux
    const authUser = useSelector(state => state.authUsers)
    //Estado local para almacenar los personajes favoritos del usuario
    const [characterFavs, setCharacterFavs] = useState(authUser.favsUsers ? authUser.favsUsers : [])
    const [isLoadingFavs, setIsLoadingFavs] = useState(false)
    const [isError, setIsError] = useState(false)
    
    // Efecto para cargar los personajes favoritos al cambiar la lista de personajes
    useEffect(() =>{
      //Si el Array de characters no viene vacio
      if(characters.length > 0){ 
        setIsLoadingFavs(true)
        getMultiCharacter(characters).then(data => {
          setCharacterFavs(data)
          setIsLoadingFavs(false)
        }).catch(e => {
          console.log(e)
          setIsLoadingFavs(false)
          setIsError(true)
        })
      }else {
        setCharacterFavs([])
      }
    },[characters])

  return { characterFavs, isLoadingFavs, isError } 
}

export default useFavsCharacter