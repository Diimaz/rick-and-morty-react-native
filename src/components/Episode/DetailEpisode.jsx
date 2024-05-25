import React from "react"
import { View, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"

import useSingleEpisode from "../../hooks/useSingleEpisode"

import Loading from "../Loading"
import Page404 from "../Page404"
import DetailEpisodeItem from '../Episode/DetailEpisodeItem'

const DetailEpisode = () => {
    const route = useRoute()
    const {id} = route.params
    //Obtener datos del hook
    const { episode, isLoading, isError, charactersEpisode } = useSingleEpisode({ id })
   
    return (
        <View style={styles.container}>
            { isError ?
                <Page404 />  
              :
                isLoading ? 
                    <Loading /> 
                :  
                    <DetailEpisodeItem 
                        episode={episode} 
                        characters={charactersEpisode}
                    /> 
            }
        </View>
    )
}

export default DetailEpisode

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})