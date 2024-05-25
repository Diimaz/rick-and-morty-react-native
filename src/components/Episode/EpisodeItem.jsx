import React from "react"
import { View,Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { useNavigation } from "@react-navigation/native"

const EpisodeItem = ({ episode, img }) => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('IdEpisode', {id: episode.id})}>
                <View style={styles.items}>
                    <View style={styles.containerImg}>
                        <Image
                            style={styles.img}
                            source={img}
                        />
                    </View>
                    <View style={styles.datos}>
                        <View style={styles.name}>
                            <Text style={styles.textTitleDatos}>Nombre del episodio</Text>
                            <Text style={styles.textName}>{episode.name}</Text>
                        </View>
                        <View style={styles.airDate}>
                            <Text style={styles.textTitleDatos}>Fecha de lanzamiento</Text>
                            <Text style={styles.textAirDate}>{episode.air_date}</Text>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>  
        </View>
    )
}

export default EpisodeItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
        marginLeft:40,
    },
    items:{
        flexDirection: 'row'
    },
    containerImg:{
        paddingTop:5
    },
    img:{
        width: 76,
        height: 68,
    },
    datos:{
        flex:1,
        paddingLeft:10,
    },
    textTitleDatos:{
        opacity: 0.5, 
        color:'white'
    },
    name:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
    },
    textName:{
        color:'white'
    },
    airDate:{
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    textAirDate:{
        color:'white'
    }
})