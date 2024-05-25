import * as React from "react"
import Svg, {Path, G, Circle} from 'react-native-svg'

/**
 * Icono de cuenta.
 * @param {string} color - Color del icono.
 * @returns {JSX.Element} Elemento SVG del icono de view.
 */
const IconEye = ({ color }) => (
	<Svg fill={color} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512.19 512.19" style="enable-background:new 0 0 512.19 512.19;" width="25" height="25">
		<G>
			<Circle cx="256.095" cy="256.095" r="85.333"/>
			<Path d="M496.543,201.034C463.455,147.146,388.191,56.735,256.095,56.735S48.735,147.146,15.647,201.034   c-20.862,33.743-20.862,76.379,0,110.123c33.088,53.888,108.352,144.299,240.448,144.299s207.36-90.411,240.448-144.299   C517.405,277.413,517.405,234.777,496.543,201.034z M256.095,384.095c-70.692,0-128-57.308-128-128s57.308-128,128-128   s128,57.308,128,128C384.024,326.758,326.758,384.024,256.095,384.095z"/>
		</G>
	</Svg>
)

export default IconEye
