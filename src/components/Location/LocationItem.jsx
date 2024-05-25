import React from "react"
import { Image, Text, TouchableOpacity, StyleSheet , View } from "react-native"
import { useNavigation } from "@react-navigation/native"

const LocationItem = ({location, img}) => {
    const navigation = useNavigation() 
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('IdLocation', {id: location.id})}>
                <View style={styles.items}>
                    <View>
                        <Image
                            style={styles.img}
                            source={img}
                        />
                    </View>
                    <View style={styles.datos}>
                        <View style={styles.name}>
                            <Text style={styles.textName}>{location.name}</Text>
                        </View>
                        <View style={styles.typeDimension}>
                            <View style={{paddingLeft:5,}}>
                                <Text style={styles.textTitleTypeDimension}>Tipo </Text>
                                <Text style={styles.textTypeDimension}>{location.type}</Text>
                            </View>
                            <View style={{paddingLeft:8}}>
                                <Text style={styles.textTitleTypeDimension}>Dimensión</Text>
                                <Text style={styles.textTypeDimension}>{location.dimension}</Text>
                            </View>
                        </View>
                    </View>
                </View> 
            </TouchableOpacity>  
        </View>
    )
}

export default LocationItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        margin:20,
        marginLeft:40,
    },
    items:{
        flexDirection: 'row'
    },
    img:{
        width: 66,
        height: 58,
    },
    datos:{
        paddingLeft:10,
    },
    name:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        paddingLeft:5,
    },
    textName:{
        color:'white'
    },
    typeDimension:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    textTitleTypeDimension:{
        color:'white', 
        opacity:0.5
    },
    textTypeDimension:{
        color:'white'
    }

})