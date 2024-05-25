import React from "react"
import { View,Text, StyleSheet, Dimensions, FlatList } from "react-native"

import CharacterItem from "../Character/CharacterItem"

const DetailEpisodeItem = ({ episode, characters }) => {
    return (
        <View style={styles.container}>
            <View style={styles.datos}>
                <View style={styles.name}>
                    <Text style={styles.textName}>{episode?.name}</Text>
                </View>
                <View style={styles.typeDimension}>
                    <View>
                        <Text style={{opacity:0.5, textAlign:'center', color:'white'}}>Fecha de lanzamiento</Text>
                        <Text style={styles.textTypeDimension}>{episode?.air_date}</Text>
                    </View>
                </View>
            </View>

            { characters?.length > 0 ?
                <View style={{paddingBottom:20}}>
                    <Text style={{textAlign:'center', paddingBottom: 10, color:'white'}}> Personajes que aparecen en este episodio</Text>
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
                    <Text style={styles.textNoCharacter}>No aparecieron ningun personaje en este episodio</Text>
                </View>
            }
        </View>
    )
}
export default DetailEpisodeItem

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
    textNoCharacter:{
        textAlign:'center', 
        color:'white'
    }
})