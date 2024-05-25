import * as React from "react"
import Svg, {Path, Polyline, Polygon, G} from 'react-native-svg'

/**
 * Icono de cuenta.
 * @param {string} color - Color del icono.
 * @returns {JSX.Element} Elemento SVG del icono de remover de favorito.
 */
const IconRemoveHeart = ({color}) => (
    <Svg fill={color} id="Isolation_Mode" data-name="Isolation Mode" viewBox="0 0 24 24" width="25" height="25">
        <Polygon points="19.061 7.061 16.939 4.939 12 9.879 7.061 4.939 4.939 7.061 9.879 12 4.939 16.939 7.061 19.061 12 14.121 16.939 19.061 19.061 16.939 14.121 12 19.061 7.061"/>
    </Svg>
)

export default IconRemoveHeart
