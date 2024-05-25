import * as React from "react"
import Svg, {Path} from 'react-native-svg'

/**
 * Icono de cuenta.
 * @param {string} color - Color del icono.
 * @returns {JSX.Element} Elemento SVG del icono de si esta con vida personaje.
 */
const IconLive = ({color}) => (
    <Svg id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="25" height="25">
        <Path d="M12,19a7,7,0,1,1,7-7A7.008,7.008,0,0,1,12,19Z" fill={color} />
    </Svg>
)

export default IconLive
