import { useEffect, useState } from "react"
import getSingleCharacter from "../services/getSingleCharacter"
import { useSelector } from "react-redux"

/**
 * Hook personalizado para obtener datos de un personaje individual. 
 * @param {Object} options - Parámetros de búsqueda del personaje.
 * @param {number} options.id - ID del personaje.
 * @returns {Object} Objeto que contiene información sobre el personaje.
 * @property {Array<Object>} character - Información del personaje.
 * @property {boolean} isLoading - Indica si se está cargando la información del personaje.
 * @property {boolean} isError - Indica si ha ocurrido un error al cargar la información del personaje.
 * @property {Object} seasons - Indica el objeto que contiene las diferentes temporadas del peronsaje.
 * @property {numer} idEpisode - Indica el ID del primer episodio que aparece el personaje. 
 */
const useSingleCharacter = ({id}) => {
  //Seleccionar los personajes del estado de Redux
  const characters = useSelector( state => state.characters)
  //Inicializar el objeto de temporadas
  const inicialSeasons = {
    season1: { active: false,episodes: [] },
    season2: { active: false,episodes: [] },
    season3: { active: false,episodes: [] },
    season4: { active: false,episodes: [] },
    season5: { active: false,episodes: [] }
  }
  //Buscar el personaje individual en la lista de todos los personajes
  const characterSearch = characters.characters.find(singleCharacter => singleCharacter.id === id)
  //Estado local para almacenar los datos del personaje
  const [character, setCharacter] = useState(characterSearch)
  const [isLoading, setIsLoading] = useState (false)
  const [isError, setIsError] = useState(false)
  //Estado local para almacenar los datos de las temporadas
  const [seasons, setSeasons] = useState(inicialSeasons)
  //Estado local para almacenar el ID del primer episodio del personaje
  const [idEpisode, setIdEpisode] = useState(character && character ? character.episode[0] : null) 

  //Efecto para cargar los datos del personaje cuando cambie el personaje o el id
  useEffect(() =>{
    if(id !== character?.id){
      const newCharacter = characters.characters.find(singleCharacter => singleCharacter.id === id)
      setCharacter(newCharacter)
    }
    if (!character) {
        setIsLoading(true)
        getSingleCharacter({id})
        .then(characterData => {
            setCharacter(characterData)
            const { objetoSeasons } = loadData(characterData)
            setSeasons({...objetoSeasons})
            setIdEpisode(characterData.episode[0])
            setIsLoading(false)
            setIsError(false)
        }).catch(e => {
            setIsLoading(false)
            setIsError(true)
        })
      }else {
        setIsLoading(true)
        const { objetoSeasons } = loadData(character)
        setSeasons({...objetoSeasons})
        setIdEpisode(character?.episode[0])
        setIsLoading(false)
      }
  },[character, id])

  return {character, isLoading, isError, seasons, idEpisode} 
}

export default useSingleCharacter

/**
 * Carga los datos de las temporadas del personaje.
 * @param {} options - Opciones para la función.
 * @param {Array} options.data - Todos los episodios.
 * @returns {Object} Objeto que contiene la información de las temporadas.
 * @property {Object} objetoSeasons - Contiene las temporadas en dónde aparece el personaje.
 */
const loadData = (data) => {
  //Un array y un objeto inciial para las temporadas
  let arrayEpisodes = []
  let objetoSeasons = { 
    season1: { active: false, episodes: [] },
    season2: { active: false, episodes: [] },
    season3: { active: false, episodes: [] },
    season4: { active: false, episodes: [] },
    season5: { active: false, episodes: [] }
  }
  //Si el parámetro data que le pasan existe
  if (data) {
    //Divide la cadena de cada dato que le pasen por el parámetro data en / y luego el ultimo lo inserta
    //en el array de episodios
    data.episode.map(episodes => {
      arrayEpisodes.push(episodes.split('/').pop())
    })

    //En ese array de episodios verifica a que temporada pertenece y luego lo va agregando al objeto 
    //de temporadas
    arrayEpisodes.map(episode => {
      if(episode <= 11){
        objetoSeasons.season1.active = true
        objetoSeasons.season1.episodes.push(episode)
      }else if(episode >= 12 && episode <= 21){
        objetoSeasons.season2.active = true
        objetoSeasons.season2.episodes.push(episode)
      }else if(episode >= 22 && episode <= 31){
        objetoSeasons.season3.active = true
        objetoSeasons.season3.episodes.push(episode)
      }else if(episode >= 32 && episode <= 41){
        objetoSeasons.season4.active = true
        objetoSeasons.season4.episodes.push(episode)
      }else if(episode >= 42 && episode <= 51){
        objetoSeasons.season5.active = true
        objetoSeasons.season5.episodes.push(episode)
      }
    })
  }
  return { objetoSeasons }
}