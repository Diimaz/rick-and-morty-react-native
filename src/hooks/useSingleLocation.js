import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import getSingleLocation from "../services/getSingleLocation"

/**
 * Hook personalizado para obtener datos de una ubicación individual. 
 * @param {Object} options - Parámetros de búsqueda de la ubicación.
 * @param {number} options.id - ID de la ubicación.
 * @returns {Object} Objeto que contiene información sobre la ubicación.
 * @property {Object} location - Información de la ubicación.
 * @property {boolean} isLoading - Indica si se está cargando la información de la ubicación.
 * @property {boolean} isError - Indica si ha ocurrido un error al cargar la información de la ubicación.
 * @property {Array<Object>} charactersLocation - Indica la información de los personajes de esa ubicación. 
 */
const useSingleLocation = ({id}) => {
  //Seleccionar las ubicaciones del estado de Redux
  const locations = useSelector( state => state.locations)
  //Buscar la ubicación individual de la lista de ubicaciones
  const locationSearch = locations.locations.find(singleLocation => singleLocation.id === id)
  //Estado local para almacenar los datos de la ubicación
  const [location, setLocation] = useState(locationSearch)
  const [isLoading, setIsLoading] = useState (false)
  const [isError, setIsError] = useState(false)
  //Estado local para almacenar los datos de los personajes que pertenecen a la ubicación
  const [charactersLocation, setCharactersLocation] = useState(null)

  //Efecto para cargar las ubicaciones cuando cambie la ubicación y el ID
  useEffect(() =>{
    if (id !== location?.id || !location) {
        setIsLoading(true)
        getSingleLocation({id})
        .then(location => {
            setLocation(location)
            setIsLoading(false)
            setIsError(false)
        })
        .catch(e => {
            setIsLoading(false)
            setIsError(true)
        })
      }else {
        setIsLoading(true)
        const {arrayCharacters} = loadData(location)
        if(arrayCharacters.length > 0){
        getMultiCharacter(arrayCharacters)
        .then(data => {
            setCharactersLocation(data)
            setIsLoading(false)
        }).catch(e => {
          console.log(e)
          setCharactersLocation([])
          setIsLoading(false)
          //setIsError(true)
        })
      }else{
        setIsLoading(false)
      }
      }
  },[locations, id])

  return {location, isLoading, isError, charactersLocation} 
}

export default useSingleLocation

/**
 * Carga los datos de los personajes de la ubicación.
 * @param {} options - Opciones para la funcion 
 * @param {Array} options.data - Todos los personajes de la ubicación.
 * @return {Object} - Objeto que contiene información sobre la ubicación.
 * @property {Array} arrayCharacters - Información sobre los personajes que pertenecen a la ubicación.
 */
const loadData = (data) => {
    let arrayCharacters = []
    data.residents.map(resident => {
        arrayCharacters.push(resident.split('/').pop())
    })

    return { arrayCharacters }
} 