import React, { useState } from "react"
import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Constanst from 'expo-constants'

import useFilterEpisode from "../../hooks/useFilterEpisode"

import Loading from "../Loading"
import Pagination from "../Pagination"
import EpisodeItem from '../Episode/EpisodeItem'
import listEpisode from "../../resourses/listEpisode"

const IMG = require('../../../assets/ImgNotFound.png')
const FilterEpisode = () => {
    //Estado local para almacenar el nombre del episodio
    const [name, setName] = useState('')
    const [selectName, setSelectName] = useState()
    //Obtener datos del hook
    const { episodes, isLoading, pages } = useFilterEpisode({ name })
    //Obtener la lista de episodio
    const { EPISODELIST } = listEpisode()

    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.text} >Filtrado de episodios</Text>
            </View>

            <View style={styles.containerInput}>
                <View style={{paddingBottom:15}}>
                    <Text style={styles.textNamePicker}>Nombre</Text>
                    <Picker style={styles.picker}
                        selectedValue={selectName}
                        onValueChange={(itemValue, itemIndex) => {
                            setName(itemValue)
                            setSelectName(itemValue)
                        }}
                    >
                        <Picker.Item style={styles.labelPicker} label="Todos los episodios" value={''}/>
                                { EPISODELIST.map((episode,index) => 
                                    <Picker.Item style={styles.labelPicker} key={index} label={episode} value={episode} />
                                )
                                }
                    </Picker>                      
                </View>
            </View>

            { isLoading ? 
                <Loading /> 
              :
                episodes.length > 0 ?
                    <>
                    <FlatList
                        data={episodes}
                        renderItem={({item:episode}) => (
                            <EpisodeItem episode={episode} img={IMG}/>
                        )}
                    /> 
                    { pages.length > 1 ? 
                        <View style={styles.pagination}>
                            <Pagination typePage='episode' name={name} pages={pages} />   
                        </View> 
                      : 
                        null
                    }

                    </>  
                 : 
                    <View style={styles.containerNotFoundResult}>
                        <Text style={styles.textNotFoundResult}>No se encontraron resultados</Text>
                    </View>
                }
        </View>
    )
}

export default FilterEpisode

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3E3B3B'
    },
    containerTitle:{
        paddingVertical:10,
        justifyContent:'center',
        alignItems:'center'
      },
      text:{
        fontSize: 25,
        fontFamily: 'monospace',
        fontWeight:'bold',
        color:'white'
      },
      containerInput:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingRight: 45,
        paddingBottom: 15,
        paddingTop:15,
      },
      textNamePicker:{
        textAlign:'center', color:'white'
      },
      picker:{
        width:200, 
        backgroundColor:'#3E2626', 
        height:15
      },
      labelPicker:{
        color:'white'
      },
      pagination:{
          backgroundColor: '#1C1B1A',
          flexDirection:'column',
          justifyContent:'flex-end',
          padding:5,
      },
      containerNotFoundResult:{
        justifyContent:'center',
        alignItems:'center'
      },
      textNotFoundResult:{
        textAlign:'center', 
        color:'white'
      },
})