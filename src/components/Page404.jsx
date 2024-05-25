import React from "react";
import { View, Text, StyleSheet } from "react-native"

const Page404 = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>404</Text>
            <Text style={styles.text}>PAGE NOT FOUND</Text>
        </View>
    )
}

export default Page404

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:45,
    },
})