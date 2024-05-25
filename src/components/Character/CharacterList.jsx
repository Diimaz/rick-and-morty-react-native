import React, { memo, useEffect } from "react"
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'

import useCharacter from "../../hooks/useCharacter"

import CharacterItem from "./CharacterItem"
import Pagination from '../Pagination'
import Loading from "../Loading"
import Footer from "../Footer"
import Page404 from "../Page404"

const CharacterList = () => {
  //Obtener datos del hook
  const { characters , isLoading, isError, pages } = useCharacter()
     return ( 
      <>
      <View style={{flex:1}}>
        { isError ? 
            <Page404 /> 
          :
            isLoading ? 
              <Loading />
            :  
              <View style={styles.container}>
                <View style={styles.containerText}>
                  <Text style={styles.text}>Personajes</Text>
                </View>
                <FlatList
                  data={characters}
                  renderItem={({item:character}) => (
                    <CharacterItem {...character}/>  
                  )}
                  numColumns={2}
                /> 
                <View style={styles.pagination}>
                  <Pagination typePage='home' pages={pages}/>   
                </View>
              </View> 
        }
      </View>
      
      <Footer />
      </>
     )
}

export default CharacterList

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#3E3B3B'
    },
    containerText:{
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
    pagination:{
        backgroundColor: '#1C1B1A',
        flexDirection:'column',
        justifyContent:'flex-end',
        padding:5,
    },
    paginationPages:{
        flexDirection:'column',
        justifyContent:'flex-end',
        padding:5,
    },
    pages:{
      padding:5,
      paddingHorizontal: 10,
      backgroundColor: '#643126',
      borderRadius: 10,
      margin: 10
    }
});