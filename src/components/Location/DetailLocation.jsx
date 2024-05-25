import React from "react"
import { View, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"

import useSingleLocation from "../../hooks/useSingleLocation"

import DetailLocationItem from "./DetailLocationItem"
import Loading from "../Loading"
import Page404 from "../Page404"

const DetailLocation = () => {
    const route = useRoute()
    const {id} = route.params
    //Obtener datos del hook
    const { location, isLoading, isError, charactersLocation } = useSingleLocation({id})
    
    return (
        <View style={styles.container}>
            { isError ?
                <Page404 />  
              :
                isLoading ? 
                    <Loading /> 
                 :  
                    <DetailLocationItem location={location} characters={charactersLocation}/> 
            }
        </View>
    )
}

export default DetailLocation

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})