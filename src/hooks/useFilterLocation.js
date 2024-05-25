import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import getFilterLocation from "../services/getFilterLocation"
import { filtersLocation } from "../features/locations/locationSlice"

/**
 * Hook personalizado para filtrar ubicaciones.
 * @param {Object} options - Opciones de filtro: nombre, tipo y dimension.
 * @param {string} options.name - Nombre de la ubicación a filtrar.
 * @param {string} options.type - Tipo de la ubicación a filtrar.
 * @param {string} options.dimension - Dimension de la ubicación a filtrar.
 * @returns {Object} Objeto que contiene informacion sobre las ubicaciones filtradas.
 * @property {Array<Object>} locations - Lista de ubicaciones filtradas.
 * @property {boolean} isLoading - Indica si se está cargando la información de las ubicaciones.
 * @property {boolean} isError - Indica si ha ocurrido un error al cargar la información de las ubicaciones.
 * @property {number} pages - Indica el número total de paginas del filtro.
 */
const useFilterLocation = ({name, type, dimension}) => {
  //Seleccionar las ubicaciones del estado de Redux
  const locations = useSelector(state => state.locations)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  
  //Efecto para cargar las ubicaciones al cambiar el name, type y dimension
  useEffect(() =>{
    setIsLoading(true)
    getFilterLocation({name, type, dimension})
    .then(data => {
        dispatch(filtersLocation(data))
        setIsLoading(false)
    }).catch( e => {
        setIsLoading(false)
        setIsError(true)
    })
  },[name,type, dimension])

  return {locations: locations.locations, isLoading, isError, pages: locations.pages } 
}

export default useFilterLocation