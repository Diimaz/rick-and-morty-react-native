import React from "react"
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native"

import CharacterItem from "../Character/CharacterItem"

const DetailLocationItem = ({location, characters}) => {
    return (
        <View style={styles.container}>
            <View style={styles.datos}>
                <View style={styles.name}>
                    <Text style={styles.textName}>{location.name}</Text>
                </View>
                <View style={styles.typeDimension}>
                    <View>
                        <Text style={{opacity:0.5, textAlign:'center', color:'white'}}>Tipo</Text>
                        <Text style={styles.textTypeDimension}>{location.type}</Text>
                    </View>
                    <View>
                        <Text style={{opacity:0.5, textAlign:'center', color:'white'}}>Dimension</Text>
                        <Text style={styles.textTypeDimension}>{location.dimension}</Text>
                    </View>
                </View>
            </View>

            { characters?.length > 0 ?
                <View style={{paddingBottom:20}}>
                    <Text style={{textAlign:'center', paddingBottom: 10, color:'white'}}> Personajes que pertenecen a esta ubicación</Text>
                    <FlatList 
                        data={characters}
                        renderItem={({item: character}) => (
                            <CharacterItem {...character} />
                        )}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                </View> 
              : 
                <View>
                    <Text style={styles.textNotFoundResult}>No hay ningún personaje para esta ubicación</Text>
                </View>
            }
        </View>
    )
}

export default DetailLocationItem

const styles = StyleSheet.create({
    container:{
        flex:1,
        width: Dimensions.get('window').width,
        paddingRight: 25,
        backgroundColor:'#3E3B3B',
        paddingBottom:120
    },
    containerTitle:{
        paddingTop: 15,
        alignItems: 'center'
    },
    datos:{
        paddingTop:15,
        paddingBottom:20,
    },
    name:{
        paddingHorizontal: 15,
        justifyContent:'center',
        alignItems:'center',
        paddingBottom:5,
    },
    textName:{
        fontSize: 25,
        fontWeight:'bold',
        fontFamily:'monospace',
        color:'white'
    },
    typeDimension:{
        flexDirection:'row',
        paddingHorizontal: 15,
        justifyContent: 'space-around'
    },
    textTypeDimension:{
        fontSize: 15,
        color:'white'
    },
    textNotFoundResult:{
        textAlign:'center', 
        color:'white'
    }
})