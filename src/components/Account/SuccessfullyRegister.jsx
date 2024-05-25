import { useNavigation } from "@react-navigation/native"
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const SuccessfullyRegister = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Usuario regístrado con éxito</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Account')}>
                <Text>Regresar al login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SuccessfullyRegister

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:45,
        textAlign:'centers'
    },
    containerImg:{
        borderRadius:20,
        overflow: 'hidden'
    },
    img:{
        width: 300,
        height: 300,
    },
})