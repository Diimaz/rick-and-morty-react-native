import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native"
import { LinearGradient } from "expo-linear-gradient" 

import IconLogout from "../Icons/IconLogout"

const Perfil = ({ handleLogout }) => {
    return ( 
        <>
        <View style={styles.container}>
            <View style={styles.icon}>
            <TouchableOpacity onPress={handleLogout}>
                <IconLogout color={'red'}/>
            </TouchableOpacity>
            </View>
            <LinearGradient colors={['#070EF0','#07ADF0','#07DBF0']} style={styles.containerAvatar}>
                <Image 
                    style={styles.avatar}
                    source={require('../../../assets/avatar.png')}
                />
            </LinearGradient>
            <View style={styles.containerDatos}>
                 <Text style={styles.textTitleDatos}>Nombre</Text>
                 <Text style={styles.textDatos}>Nombre ejemplo</Text>
                 <Text style={styles.textTitleDatos}>Apellido</Text>
                 <Text style={styles.textDatos}>Apellido ejemplo</Text>
                 <Text style={styles.textTitleDatos}>Correo electrónico</Text>
                 <Text style={styles.textDatos}>ejemplo@gmail.com</Text>
            </View>
        </View>
        </>
    )
}

export default Perfil

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:Dimensions.get('screen').width,
        justifyContent:'space-around',
        alignItems:'center'
    },
    icon:{
        position:'absolute',
        right:15,
        top:15,
        zIndex:1,
    },
    containerAvatar:{
        width:Dimensions.get('screen').width,
        height: Dimensions.get('screen').height*0.5,
        backgroundColor:'#0D8AF2',
        justifyContent:'center',
        alignItems:'center'
    },
    avatar:{
        width: 250,
        height:250
    },
    containerDatos:{
        width:Dimensions.get('screen').width,
        height: Dimensions.get('screen').height*0.45,
        justifyContent:'center',
        alignItems:'flex-start',
        paddingLeft:20,
    },
    textTitleDatos:{
        color:'white',
        opacity: 0.5
    },
    textDatos:{
        color:'white',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        marginBottom:15,
        width:300,
    }
})