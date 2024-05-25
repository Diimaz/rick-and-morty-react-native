import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Pages = ({ pages, getPage }) => {
    return (
        <TouchableOpacity onPress={getPage}>
            <View style={styles.pages}>
                <Text style={styles.text}>{pages}</Text>
            </View>  
        </TouchableOpacity>
    )
}

export default Pages

const styles = StyleSheet.create({
    pages: {
        padding:5,
        paddingHorizontal: 10,
        backgroundColor: '#643126',
        borderRadius: 10,
        margin: 10
    },
    text:{
    }
})