import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"

import useSingleCharacter from "../../hooks/useSingleCharacter"

import Loading from "../Loading"
import DetailChracterItem from "./DetailCharacterItem"
import Page404 from "../Page404"

const DetailCharacter = () => {
    const route = useRoute()
    const {id} = route.params
    //Obtener datos del hook
    const { character, isLoading, isError, seasons, idEpisode } = useSingleCharacter({ id })
    
    return (
        <View style={styles.container}>
            { isError ?
                <Page404 /> 
              :
                isLoading ? 
                    <Loading /> 
                :  
                    <DetailChracterItem 
                        idEpisode={idEpisode} 
                        character={character} 
                        seasons={seasons} 
                        id={id}
                    /> 
            }
        </View>
    )
}

export default React.memo(DetailCharacter)

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})