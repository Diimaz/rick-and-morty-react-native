import React from "react"
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"

const ButtonSeason = ({ season, onPressButton }) => {
    return (
        <>
            <View style={{backgroundColor:'#585353', borderRadius:10, margin:10,}}>
            <TouchableOpacity onPress={onPressButton}>
                <Text style={styles.textTitleSeason}>{season}</Text>
            </TouchableOpacity>
            </View>
        </>
    )
}

export default ButtonSeason

const styles = StyleSheet.create({
    textTitleSeason: {
        padding: 10,
        color:'white',
    }
})