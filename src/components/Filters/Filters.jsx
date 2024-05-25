import React, {useRef, useEffect, useState} from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import PagerView from 'react-native-pager-view'

import Footer from "../Footer"

const Filters = () => {
    const navigation = useNavigation()

    //Hook para gestionar la paginación automática de un conjunto de páginas.
    const pagerViewRefs = useRef([null,null,null])
    //Estado local para almacenar la página actual.
    const [currentPage, setCurrentPage] = useState(0)
    //Número total de páginas.
    const totalPages = 3
    //Duración del intervalo para cambiar de página automáticamente (en milisegundos).
    const intervalDuration = 2000

    //Efecto para cambiar automáticamente a la siguiente página cada cierto intervalo.
    useEffect(() => {
        const interval = setInterval(() => {
            const nextPage = (currentPage + 1) % totalPages
            setCurrentPage(nextPage)
        }, intervalDuration)
        return () => clearInterval(interval)
    }, [currentPage])

    //Efecto para actualizar las páginas visibles en las referencias cuando cambia la página actual.
    useEffect(() => {
        pagerViewRefs.current.forEach(ref => {
            if (ref) {
                ref.setPage(currentPage)
            }
        });
    }, [currentPage]);

    const dataImagenes = [
        {
          filtro: 'Personajes',
          imagenes: [
            { id: 1, title:'Personajes', page: 'FilterCharacter' ,imgUrl: require('../../../assets/filters/Characters1RickAndMorty.jpg') },
            { id: 2, title:'Personajes', page: 'FilterCharacter' ,imgUrl: require('../../../assets/filters/Characters2RickAndMorty.webp') },
            { id: 3, title:'Personajes', page: 'FilterCharacter' ,imgUrl: require('../../../assets/filters/Characters3RickAndMorty.jpg') }
          ]
        },
        {
          filtro: 'Ubicación',
          imagenes: [
            { id: 4, title:'Ubicación', page: 'FilterLocation' ,imgUrl: require('../../../assets/filters/Location1RickAndMorty.webp') },
            { id: 5, title:'Ubicación', page: 'FilterLocation' ,imgUrl: require('../../../assets/filters/Location2RickAndMorty.webp') },
            { id: 6, title:'Ubicación', page: 'FilterLocation' ,imgUrl: require('../../../assets/filters/Location3RickAndMorty.webp') }
          ]
        },
        {
          filtro: 'Episodios',
          imagenes: [
            { id: 7, title:'Episodios', page: 'FilterEpisode' ,imgUrl: require('../../../assets/filters/Episode1RickAndMorty.webp') },
            { id: 8, title:'Episodios', page: 'FilterEpisode' ,imgUrl: require('../../../assets/filters/Episode2RickAndMorty.jpg')},
            { id: 9, title:'Episodios', page: 'FilterEpisode' ,imgUrl: require('../../../assets/filters/Episode3RickAndMorty.webp') }
          ]
        }
    ]
    return (
        <>
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>Filtros</Text>
            </View>
            { dataImagenes.map((imagenes, imagenesIndex) => 
                <PagerView key={imagenesIndex} style={styles.containerOfImg} initialPage={0} ref={pagerViewRef => (pagerViewRefs.current[imagenesIndex] = pagerViewRef)}>
                    { imagenes.imagenes.map((imagen,imagenIndex) =>
                        <View key={imagenIndex} style={styles.textAndImg}>
                            <Text style={styles.text}>{imagen.title}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate(imagen.page)}>
                                <View key={imagenIndex} style={styles.containerImg}>
                                    <Image 
                                        style={styles.img}
                                        source={imagen.imgUrl}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </PagerView>
              )
            }
        </View>
        
        <Footer/>
        </>
    )
}

export default Filters

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3E3B3B'
    },
    containerTitle:{
        padding: 10,
        alignItems:'center',
        justifyContent:'center',
        paddingTop:20,
    },
    textTitle:{
        fontSize:25,
        paddingBottom:10,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        color:'white'
    },
    containerOfImg:{
        flex: 1,
    },
    textAndImg:{
        alignItems:'center',
        justifyContent:'center',
    },
    text:{
        fontSize: 15,
        paddingBottom:10,
        color:'white'
    },
    containerImg:{
        borderRadius:20,
        overflow: 'hidden',
         height: 180,
         width: 280,
        justifyContent:'center',
        alignItems:'center',
    },
    img:{
        width: '100%',
        height: '100%',
        resizeMode:'stretch',
    },
})