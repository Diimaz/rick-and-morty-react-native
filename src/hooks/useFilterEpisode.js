import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import getFilterEpisode from "../services/getFilterEpisode"
import { filtersEpisode } from "../features/episodes/episodeSlice"

/**
 * Hook personalizado para filtrar episodios.
 * @param {Object} options - Opciones de filtro: nombre.
 * @param {string} options.name - Nombre del episodio a filtrar.
 * @returns {Object} Objeto que contiene informacion sobre los episodios filtrados
 * @property {Array<Object>} episodes - Lista de episodios filtrados.
 * @property {boolean} isLoading - Indica si se está cargando la información de los episodios.
 * @property {boolean} isError - Indica si ha ocurrido un error al cargar la información de los episodios.
 * @property {number} pages - Indica el número total de paginas del filtro 
 */
const useFilterEpisode = ({name}) => {
  //Seleccionar los episodios del estado de Redux
  const episodes = useSelector(state => state.episodes)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  
  //Efecto para cargar los episodios al cambiar el name
  useEffect(() =>{
    setIsLoading(true)
    getFilterEpisode({name})
    .then(data => {
        dispatch(filtersEpisode(data))
        setIsLoading(false)
    }).catch( e => {
        setIsLoading(false)
        setIsError(true)
    })
  },[name])

  return {episodes: episodes.episodes, isLoading, isError, pages: episodes.pages } 
}

export default useFilterEpisode