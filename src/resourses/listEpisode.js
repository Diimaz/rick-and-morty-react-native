const EPISODELIST = [
    "Pilot",
    "Lawnmower Dog",
    "Anatomy Park",
    "M. Night Shaym-Aliens!",
    "Meeseeks and Destroy",
    "Rick Potion #9",
    "Raising Gazorpazorp",
    "Rixty Minutes",
    "Something Ricked This Way Comes",
    "Close Rick-counters of the Rick Kind",
    "Ricksy Business",
    "A Rickle in Time",
    "Mortynight Run",
    "Auto Erotic Assimilation",
    "Total Rickall",
    "Get Schwifty",
    "The Ricks Must Be Crazy",
    "Big Trouble in Little Sanchez",
    "Interdimensional Cable 2: Tempting Fate",
    "Look Who's Purging Now",
    "The Wedding Squanchers",
    "The Rickshank Rickdemption",
    "Rickmancing the Stone",
    "Pickle Rick",
    "Vindicators 3: The Return of Worldender",
    "The Whirly Dirly Conspiracy",
    "Rest and Ricklaxation",
    "The Ricklantis Mixup",
    "Morty's Mind Blowers",
    "The ABC's of Beth",
    "The Rickchurian Mortydate",
    "Edge of Tomorty: Rick, Die, Rickpeat",
    "The Old Man and the Seat",
    "One Crew Over the Crewcoo's Morty",
    "Claw and Hoarder: Special Ricktim's Morty",
    "Rattlestar Ricklactica",
    "Never Ricking Morty",
    "Promortyus",
    "The Vat of Acid Episode",
    "Childrick of Mort",
    "Star Mort: Rickturn of the Jerri",
    "Mort Dinner Rick Andre",
    "Mortyplicity",
    "A Rickconvenient Mort",
    "Rickdependence Spray",
    "Amortycan Grickfitti",
    "Rick & Morty's Thanksploitation Spectacular",
    "Gotron Jerrysis Rickvangelion",
    "Rickternal Friendshine of the Spotless Mort",
    "Forgetting Sarick Mortshall",
    "Rickmurai Jack"
]

/**
 * Recurso que tiene información de todos los episodios.
 * @return {Object} Objeto que contiene información de los episodios.
 * @property {Array} EPISODELIST- Indica el array con los nombres de los episodios 
 */
const listEpisode = () => {
    const EPISODELISTORDEN = EPISODELIST.sort()
    return {EPISODELIST: EPISODELISTORDEN}
}

export default listEpisode