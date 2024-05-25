import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"
import IconHeart from "../Icons/IconHeart"
import { useSelector } from "react-redux"
import Fav from "../Account/Fav"

const CharacterItem = (props) => {
    const navigation = useNavigation()

    return (   
        <View  style={styles.main}>
            <TouchableOpacity onPress={() => navigation.navigate('Id', {id: props.id})}>
                <View style={styles.container}>
                    <View>
                        <Fav id={props.id}/>
                        <Image
                            style={styles.img}
                            source={{uri: props.image}}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{props.name}</Text> 
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )   
}

export default React.memo(CharacterItem)

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'colum',
        alignItems: 'center',
        paddingRight:70,
        with:300,
    },
    img: {
        width: 96,
        height: 88,
        borderRadius: 10,
    },
    textContainer: {
        marginLeft: 10, 
    },
    text: {
        color: 'white',
    },
    main:{
        flex:1,
        flexDirection:'row',
        margin:20,
        marginLeft:40,
        justifyContent:'space-between'
    }
})