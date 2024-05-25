const SPECIES = [
    'Alien', 'Animal', 'Cronenberg', 'Disease', 'Human', 'Humanoid', 'Mythological', 'Planet', 'Poopybutthole', 'Robot', 'Unknown'
]

const STATUS = [
    'Alive', 'Dead', 'Unknown'
]

const GENDER = [
    'Female', 'Genderless', 'Male', 'Unknown'
]

/**
 * Recurso que tiene información sobre los personajes.
 * @return {Object} Objeto que contiene información de los personajes.
 * @property {Array} SPECIESLIST - Indica las especies de personajes.
 * @property {Array} STATUSLIST - Indica el estado actual de los personajes.
 * @property {Array} GENDERLIST - Indica el género de los personajes. 
 */
const listCharacter = () => {
    const SPECIESLISTORDEN = SPECIES.sort()
    const STATUSLISTORDEN = STATUS.sort()
    const GENDERLISTORDEN = GENDER.sort()
    return {SPECIESLIST: SPECIESLISTORDEN, STATUSLIST: STATUSLISTORDEN, GENDERLIST: GENDERLISTORDEN}
}
export default listCharacter
