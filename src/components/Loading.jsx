import React from "react";
import { View, Text, Image, StyleSheet } from "react-native"

const Loading = () => {
    return (
        <View style={styles.container}>
            <View style={styles.containerImg}>
                <Image 
                    style={styles.img}
                    source={require('../../assets/LoadingRickAndMorty.gif')}
                />
            </View>
            <Text style={styles.text}>Loading...</Text>
        </View>
    )
}

export default Loading

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#3E3B3B'
    },
    text:{
        fontSize:45,
    },
    containerImg:{
        borderRadius:20,
        overflow: 'hidden',
        paddingBottom: 10,
    },
    img:{
        width: 300,
        height: 300,
    },
})