import * as React from "react"
import Svg, {Path, Circle} from 'react-native-svg'

/**
 * Icono de cuenta.
 * @param {string} color - Color del icono.
 * @returns {JSX.Element} Elemento SVG del icono de cuenta.
 */

const IconAccount = ({ color }) => (
    <Svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></Path>
    <Circle cx="12" cy="7" r="4"></Circle>
    </Svg>
)

export default IconAccount 
