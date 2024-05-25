import React from "react"
import { View, StyleSheet, FlatList } from "react-native"
import { useDispatch } from "react-redux"

import { changeCharacter, changeFilterCharacter } from "../features/characters/characterSlice"
import { changeLocation } from "../features/locations/locationSlice"
import { changeEpisode } from "../features/episodes/episodeSlice"

import getPage from "../services/getPage"
import getPageFilter from "../services/getPageFilter"
import getPageFilterLocation from "../services/getPageFilterLocation"
import getPageFilterEpisode from "../services/getPageFilterEpisode"

import Pages from "./Pages"

const Pagination = ({ pages, typePage,  name, species, gender, status, type, dimension }) => {
    const dispatch = useDispatch()

    /**
     * Obtiene y actualiza los datos de las páginas según el tipo de página especificado.
     * @param {number} index - El índice de la página a obtener.
     */
    const getPages = (index) => {
         if(typePage === 'filter'){
             getPageFilter({index, name, species, gender, status}).then(data => {
                 dispatch(changeFilterCharacter(data))
             })
        }else if(typePage === 'location'){
            getPageFilterLocation({index,name,type,dimension}).then(data=> {
                dispatch(changeLocation(data))
            })
        }else if(typePage === 'home'){
            getPage({index}).then(data => {
                dispatch(changeCharacter(data))
        })
        }else if(typePage === 'episode'){
            getPageFilterEpisode({index, name}).then(data => {
                dispatch(changeEpisode(data))
            }).catch(e => console.log(e))
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerPages}>
                <FlatList 
                    data={pages}
                    renderItem={({item:pages, index}) => (
                        <View style={styles.pages}>
                            <Pages pages={pages}  getPage={() => getPages(index + 1)} />
                        </View>
                    )}
                    horizontal={true}
                />
            </View>
        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    container:{
        //flex: 1,
        //backgroundColor: '#F33107'
    },
    containerPages:{
        backgroundColor: '#1C1B1A',
        padding:5,
        paddingVertical: 2,
        paddingBottom: 5,
        marginRight: 15,
    },
    containerButtons:{
        flexDirection:'row',
        justifyContent: 'space-around',
        margin: 10,
    },
    pages:{
        backgroundColor: '#643126',
        borderRadius: 10,
        margin: 10
    }
})