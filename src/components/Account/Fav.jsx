import React from "react"
import {  View, StyleSheet, TouchableOpacity } from "react-native"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"

import useUser from "../../hooks/useUser"

import IconRemoveHeart from "../Icons/IconRemoveHeart"
import IconHeart from "../Icons/IconHeart"

const Fav = ({ id }) => {
    const navigation = useNavigation()
    //Seleccionar la información del usuario del estado de Redux
    const dataUser = useSelector(state => state.authUsers)
    //Obtener datos del hook
    const { isLogin, addFav, deleteFav, resetFav, stateFavs } = useUser()

    //Verificar si el personaje ya se encuentra en favoito o no
    const isFaved = dataUser.favs.some(favId => favId === id)
    const [
        icon
    ] = isFaved ? [
        <IconRemoveHeart color={'red'}/>
    ] : [
        <IconHeart color={'red'}/>
    ]

    const handleClickFav = () => {
        if (!isLogin){
            resetFav()
            navigation.navigate('Account')
            return
        } 
        const jwt = dataUser.jwt
        isFaved ? deleteFav({id, jwt}) : addFav({id, jwt})
    }
    return (
        <View style={styles.button}>
            { stateFavs.loading ? 
                <TouchableOpacity>
                    {icon}
                </TouchableOpacity> 
              : 
                <TouchableOpacity onPress={handleClickFav}>
                    {icon}
                </TouchableOpacity>
            }
        </View>
    )
}

export default Fav

const styles = StyleSheet.create({
    button:{
        zIndex:3,
        position:'absolute',
        top:0,
        right:0,
        backgroundColor:'#515150',
        borderRadius:100,
        width:35,
        height:35,
        alignItems:'center',
        justifyContent:'center',
        opacity:0.5
    }
})