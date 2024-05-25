import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import Footer from "./Footer";
import useUser from "../hooks/useUser";
import Loading from "./Loading";
import useFavsCharacter from "../hooks/useFavsCharacter";
import { useSelector } from "react-redux";
import CharacterItem from "./Character/CharacterItem";
import Page404 from "./Page404";
import { useNavigation } from "@react-navigation/native";

const Favorites = () => {
    const navigation = useNavigation()
    //Seleccionar los personajes favoritos del estado de Redux
    const characters = useSelector(state => state.authUsers.favs)
    //Obtener datos de los hooks
    const { isLogin, isLoadingLogin} = useUser()
    const { characterFavs, isLoadingFavs, isError } = useFavsCharacter({ characters })
    return (
        <>
        { isError ? 
            <Page404 /> 
          :
            isLoadingLogin ? 
                <Loading/> 
            :
                isLogin ? 
                    <>
                    <View style={styles.container}>
                        <Text style={styles.text}>Mis personajes favoritos</Text>
                        { isLoadingFavs ? 
                            <Loading/> 
                          :
                            characterFavs.length > 0 ?
                                <FlatList 
                                    data={characterFavs}
                                    renderItem={({item: character}) => (
                                        <CharacterItem {...character} />
                                    )}
                                    numColumns={2}
                                    showsVerticalScrollIndicator={false}
                                /> 
                            : 
                                <Text style={styles.noFavs}> Aun no tienes personajes agregados</Text>
                        }
                    </View>
                    <Footer/>
                    </> 
                : 
                    <>
                    <View style={styles.containerNoSignIn}>
                        <Text style={styles.text}>No has iniciado sesión</Text>
                        <Text style={styles.text}>Debes iniciar sesión para poder visualizar tus personajes favoritos</Text>
                        <View style={styles.buttonSingIn}>
                            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                                <Text style={styles.textSingIn}>Sing In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Footer />
                    </>
        }
        </>
    )
}

export default Favorites

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3E3B3B',
        paddingTop:10,
    },
    text:{
        fontSize:20,
        color:'white',
        textAlign:'center',
        paddingBottom:15,
    },
    containerImg:{
        borderRadius:20,
        overflow: 'hidden'
    },
    img:{
        width: 300,
        height: 300,
    },
    noFavs:{
        color:'white', textAlign:'center'
    },
    containerNoSignIn:{
        flex:1,
        backgroundColor:'#3E3B3B',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:10,
    },
    buttonSingIn:{
        borderRadius:20,
        backgroundColor: '#18B0B0',
        padding:5,
        paddingHorizontal:15,
    },
    textSingIn:{
        fontSize:25,
        fontFamily:'monospace'
    }
})