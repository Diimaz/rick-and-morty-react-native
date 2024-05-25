import React, { useState, useEffect, useRef} from "react"
import { View,Text, Image, StyleSheet, TouchableOpacity, FlatList, Modal, Dimensions } from "react-native"
import { useNavigation } from "@react-navigation/native"
import Constanst from 'expo-constants'

import getSingleEpisode from "../../services/getSingleEpisode"

import IconLive from "../Icons/IconLive"
import Loading from "../Loading"
import Page404 from "../Page404"
import ButtonSeason from "./ButtonSeason"
import IconClosed from "../Icons/IconClosed"
import Fav from "../Account/Fav"

const DetailChracterItem = ({ character, seasons,idEpisode, id }) => {
    const navigation = useNavigation()
    //Estado local para almacenar el nombre del primer episodio en donde aparece el personaje
    const [first, setFirst] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    //Estado local para controlar la vista del modal
    const [viewModal, setViewModal] = useState(false)
    //Estado local para almacenar la información correspondiente a las temporadass
    const [titleSeason, setTitleSeason] = useState('')
    const [episodesSeason, setEpisodesSeason] = useState([])

    //Efecto para obtener el nombre del primer episodio cuando cambie el ID del episodio
    useEffect(() => {
        if(idEpisode){
        setIsLoading(true)
        const id = idEpisode.split('/').pop()
        getSingleEpisode({id})
        .then(episode => {
            setFirst(episode.name)
            setIsLoading(false)
        }).catch(e => {
            setIsLoading(false)
            setIsError(true)
        })
    }
    },[idEpisode])

    /**
     * Mostrar el modal y la información correspondiente a la temporada seleccionada.
     * @param {} options - Opciones para poder mostrar en el modal.
     * @param {string} options.season - Titulo de la temporada.
     * @param {Array} options.episodes - Todos los episodios correspondiente a la temporada.
     */
    const handleModal = (season, episodes) => {
        setViewModal(true)
        setTitleSeason(season)
        setEpisodesSeason(episodes)
    }
    
    //Poder hacer el gesto hacía atras
    handleBackPress = () => {
        setViewModal(false)
        return true
    }

    //Las cadenas que son mayores a 25 caracteres las acorta
    const parsearCadena = (cadena) => {
        if(!cadena){
            return
        }
        if (cadena.length > 25) {
            return cadena.substring(0, 20) + "..."
        } else {
            return cadena;
        }
    }

    return (
        <View style={styles.container}>
            {
                isError ? 
                <Page404 />
                :
                isLoading ?
                <Loading />
                :
                <>
                    <View style={styles.containerImg}>
                        <Fav id={id}/>
                        <Image
                            style={styles.img}
                            source={{uri: character?.image}}
                        />
                    </View>
                        <View style={styles.containerIconAndLive}>
                            <IconLive color={
                                character?.status === 'Alive' ? 'green' :
                                character?.status === 'Dead' ? 'red' :
                                character?.status === 'Unknown' ? 'grey' : 'white'
                            }/>
                            <Text style={styles.textContainerIconAndLive}>{character?.status}</Text>
                            <Text style={styles.textContainerIconAndLive}> - </Text>
                            <Text style={styles.textContainerIconAndLive}>{character?.species}</Text>
                        </View>
                        <View style={styles.containerDatos}>
                            <Text style={styles.textContainerDatos}>{parsearCadena(character?.name)}</Text>
                            <Text style={{color:'white'}}> - </Text>
                            <Text style={styles.textContainerDatos}>{character?.gender}</Text>
                        </View>

                    <View style={styles.location}> 
                        <Text style={{opacity:0.5, color:'white'}}>Última ubicación conocida</Text>
                        <Text style={styles.textLocation}>{character?.location?.name}</Text>
                    </View>

                        <View style={styles.firstAparition}>
                            <Text style={{opacity:0.5, color:'white'}}>Primera aparición en</Text>
                            <Text style={styles.textFirstAparition}>{first}</Text>
                        </View> 

                        <Text style={styles.textTitleEpisodes}>Episodios en que aparece</Text>
                            <View style={styles.season}>
                                { seasons.season1.active ? <ButtonSeason season={'Temporada 1'} onPressButton={() => handleModal('Temporada 1', seasons.season1.episodes)} /> : null }
                                { seasons.season2.active ? <ButtonSeason season={'Temporada 2'} onPressButton={() => handleModal('Temporada 2', seasons.season2.episodes)} /> : null }
                                { seasons.season3.active ? <ButtonSeason season={'Temporada 3'} onPressButton={() => handleModal('Temporada 3', seasons.season3.episodes)} /> : null }
                                { seasons.season4.active ? <ButtonSeason season={'Temporada 4'} onPressButton={() => handleModal('Temporada 4', seasons.season4.episodes)} /> : null }
                                { seasons.season5.active ? <ButtonSeason season={'Temporada 5'} onPressButton={() => handleModal('Temporada 5', seasons.season5.episodes)} /> : null }   
                            </View>
                    </>
            }

            <Modal 
                animationType="slide"
                transparent
                visible={viewModal}
                onRequestClose={this.handleBackPress}
            >
                <View style={styles.containerModal}>
                    <View style={styles.iconModal}>
                        <TouchableOpacity onPress={() => setViewModal(false)}>
                            <IconClosed color={'red'}/>
                        </TouchableOpacity>
                    </View>
                        <Text style={styles.textTitleSeason}>{titleSeason}</Text>
                        <FlatList 
                            data={episodesSeason}
                            renderItem={({item:episode, index}) => (
                                <View style={styles.episode}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('IdEpisode', {id: episode})
                                        setViewModal(false)
                                        }}
                                    >
                                        <Text>Episodio {episode}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                </View>         
            </Modal>
        </View>
    )
}

export default React.memo(DetailChracterItem)

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        width: Dimensions.get('window').width,
        alignItems:'center',
        backgroundColor:'#3E3B3B'
    },
    containerImg:{
        borderRadius:20,
        overflow: 'hidden',
    },
    img:{
        width: 200,
        height: 200,
    },
    containerIconAndLive:{
        flexDirection: 'row',
        alignSelf: 'flex-start',
        paddingLeft: 90,
    },
    textContainerIconAndLive:{
        padding:3,
        color:'white'
    },
    containerDatos:{
        flexDirection:'row',
        alignSelf:'flex-end',
        paddingRight:90,
    },
    textContainerDatos:{
        color:'white'
    },
    location:{
        paddingVertical:10,
        alignSelf:'flex-start',
        paddingHorizontal: 50,
    },
    textLocation:{
       fontWeight:'bold',
       textAlign:'center',
       color:'white'
    },
    containerEpisodies: {
        flex:1,
        justifyContent: 'flex-start',
    },
    firstAparition:{
        paddingVertical:10,
        alignSelf:'flex-start',
        paddingHorizontal: 50,
    },
    textFirstAparition:{
        fontWeight:'bold',
       textAlign:'center',
       color:'white'
    },
    textTitleEpisodes:{
        paddingVertical:10,
        fontFamily:'monospace',
        color:'white'
    },
    season:{
        padding:10,
    },
    episode:{
        borderRadius: 10,
        margin: 10,
        paddingHorizontal: 10,
        backgroundColor:'#585353',
        paddingVertical:5,
    },
    containerModal:{
        //flex:1,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        height: Dimensions.get('window').height * 1.2,
    },
    iconModal:{
        height:45,
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        paddingHorizontal:25,
        marginTop: Constanst.statusBarHeight,
    },
    textTitleSeason:{
        fontSize:20,
        fontFamily:'monospace',
        fontWeight:'bold',
        paddingBottom:10,
    }
})