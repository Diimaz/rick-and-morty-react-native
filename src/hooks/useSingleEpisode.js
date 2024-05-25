import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import getSingleEpisode from "../services/getSingleEpisode"
import getMultiCharacter from "../services/getMultiCharacter"

/**
 * Hook personalizado para obtener datos de un episodio individual. 
 * @param {Object} options - Parámetros de búsqueda del episodio.
 * @param {number} options.id - ID del episodio.
 * @returns {Object} Objeto que contiene información sobre el episodio.
 * @property {Object} episode - Información del episodio.
 * @property {boolean} isLoading - Indica si se está cargando la información del episodio.
 * @property {boolean} isError - Indica si ha ocurrido un error al cargar la información del episodio.
 * @property {Array<Object>} charactersEpisode - Indica la información de los personajes de ese episodio. 
 */
const useSingleEpisode = ({id}) => {
    //Seleccionar los episodios del estado de Redux
    const episodes = useSelector( state => state.episodes)
    //Buscar el episodio individual en la lista de episodios
    const episodeSearch = episodes.episodes.find(singleEpisode => singleEpisode.id === id)
    //Estado local para almacenar los datos del episodio
    const [episode, setEpisode] = useState(episodeSearch)
    const [isLoading, setIsLoading] = useState (false)
    const [isError, setIsError] = useState(false)
    //Estado local para almacenar los datos de los personajes que pertenecenal episodio
    const [charactersEpisode, setCharactersEpisode] = useState(null)

  //Efecto para cargar los episodios cuando cambie episode y el id
  useEffect(() =>{
    if (id !== episode?.id || !episode) {
        setIsLoading(true)
        getSingleEpisode({id})
        .then(episode => {
            setEpisode(episode)
            const {arrayCharacters} = loadData(episode)
            if(arrayCharacters.length > 0){
                getMultiCharacter(arrayCharacters)
                .then(data => {
                    setCharactersEpisode(data)
                    setIsLoading(false)
                    })
            }else{
                setIsLoading(false)
                setIsError(false)
            }
        })
        .catch(e => {
            setIsLoading(false)
            setIsError(true)
        })

      }else {
        setIsLoading(true)
        const {arrayCharacters} = loadData(episode)
        if(arrayCharacters.length > 0){
            getMultiCharacter(arrayCharacters)
            .then(data => {
                setCharactersEpisode(data)
                setIsLoading(false)
            }).catch(e => {
            console.log(e)
            setCharactersEpisode([])
            setIsLoading(false)
            })
        }else{
            setIsLoading(false)
        }
    }
    },[episodes, id])

  return {episode, isLoading, isError, charactersEpisode} 
}

export default useSingleEpisode

/**
 * Carga los datos de los personajes del episodio.
 * @param {} options - Opciones para la funcion 
 * @param {Array} options.data - Todos los personajes del episodio.
 * @return {Object} - Objeto que contiene información sobre el episodio.
 * @property {Array} arrayCharacters - Información sobre los personajes que pertenecen al episodio.
 */
const loadData = (data) => {
    let arrayCharacters = []
    data.characters?.map(resident => {
        arrayCharacters.push(resident.split('/').pop())
    })

    return { arrayCharacters }
} 