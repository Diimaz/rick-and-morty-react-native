import React, { useState } from "react"
import { View, Text,StyleSheet, FlatList, TextInput, Dimensions, TouchableOpacity, Modal, ScrollView } from "react-native"
import Constanst from 'expo-constants'

import useFilterCharacter from "../../hooks/useFilterCharacter"

import Pagination from "../Pagination"
import CharacterItem from "../Character/CharacterItem"
import Loading from "../Loading"

import IconFilter from "../Icons/IconFilter"
import IconClosed from "../Icons/IconClosed"
import listCharacter from "../../resourses/listCharacter"

const FilterCharacter = () => {
    //Estado local para controlar los datos del filtrado
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [gender, setGender] = useState('')
    const [species, setSpecies] = useState('')
    //Estado local para controlar la vista del modal
    const [viewModal, setViewModal] = useState(false)
    //Estado local para controlar la selección de los botones
    const [selectButtonStatus, setSelectButtonStatus] = useState(null)
    const [selectButtonGender, setSelectButtonGender] = useState(null)
    const [selectButtonSpecie, setSelectButtonSpecie] = useState(null)
    //const revisar = useSelector(state => state.characters)
    const { characters , isLoading, pages } = useFilterCharacter({ name, status, gender, species })
    //Obtener lista para los filtros
    const { SPECIESLIST, STATUSLIST, GENDERLIST } = listCharacter()

    //Poder hacer el gesto hacía atras
    handleBackPress = () => {
        setViewModal(false)
        return true
    }

    //Mostrar el modal
    const handleModal = () => {
        setViewModal(true)
    }

    /**
     * Cambiar el estado del botón del estatus del personaje.
     * @param {string} status - El estado del personaje.
     * @param {number} index - El identificador para saber que boton se presiono en el estado.
     */
    const handleStatus = (status,index) => {
        if(index === selectButtonStatus){
            setSelectButtonStatus(null)
            setStatus('')
        }else{
            setSelectButtonStatus(index)
            setStatus(status)
        }
    }

    /**
     * Cambiar el estado del botón del género del personaje.
     * @param {string} gender - El género del personaje.
     * @param {number} index - El identificador para saber que botón se presiono en el género.
     */
    const handleGender = (gender,index) => {
        if(index === selectButtonGender){
            setSelectButtonGender(null)
            setGender('')
        }else{
            setSelectButtonGender(index)
            setGender(gender)
        }
    }

    /**
     * Cambiar el estado del botón de la especie del personaje.
     * @param {string} specie - La especie del personaje.
     * @param {number} index - El identificador para saber que botón se presiono en la especie.
     */
    const handleSpecie = (specie,index) => {
        if(index === selectButtonSpecie){
            setSelectButtonSpecie(null)
            setSpecies('')
        }else{
            setSelectButtonSpecie(index)
            setSpecies(specie)
        }
    }

    return (
        <>
        <View style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.text} >Filtrado de personajes</Text>
                </View>
                <View style={styles.containerInput}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setName}
                        value={name}
                        placeholder="Nombre de personaje"
                    />
                    <TouchableOpacity onPress={handleModal}>
                        <IconFilter color={'#F9775E'}/> 
                    </TouchableOpacity>
                </View>
                { isLoading ? 
                    <Loading /> 
                  :
                    characters.length > 0 ?
                        <>
                        <FlatList
                            data={characters}
                            renderItem={({item:character}) => (
                                <CharacterItem {...character}/>  
                            )}
                            numColumns={2}
                        /> 
                        { pages.length > 1 ? 
                            <View style={styles.pagination}>
                                <Pagination 
                                    typePage={'filter'} 
                                    name={name} 
                                    status={status} 
                                    gender={gender} 
                                    species={species} 
                                    pages={pages}
                                />   
                            </View> 
                        : 
                            null
                        }
                        </>  
                  : 
                    <View style={styles.containerSinResultados}>
                        <Text style={styles.textNotFoundResult}>No se encontraron resultados</Text>
                    </View>
                }
            </View> 

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

                    <ScrollView style={{flex:1}}>
                        <Text style={{textAlign:'center', fontSize:20,}}>Estado</Text>
                        <View style={styles.containerStatus}>
                            { STATUSLIST.map((status,index) => 
                                <View key={index} style={styles.status}>
                                    <TouchableOpacity 
                                        key={index} 
                                        onPress={() => handleStatus(status, index)} 
                                        style={[styles.button, 
                                        selectButtonStatus === index && styles.buttonPressed]}
                                    >
                                    <Text style={styles.textModal}>{status}</Text>
                                    </TouchableOpacity>
                                </View>
                             )}
                        </View>

                        <Text style={{textAlign:'center', fontSize:20,}}>Género</Text>
                        <View style={styles.containerStatus}>
                            { GENDERLIST.map((gender,index) => 
                                <View key={index} style={styles.status}>
                                    <TouchableOpacity 
                                        key={index} 
                                        onPress={() => handleGender(gender, index)} 
                                        style={[styles.button, 
                                        selectButtonGender === index && styles.buttonPressed]}
                                    >
                                    <Text style={styles.textModal}>{gender}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <Text style={{textAlign:'center', fontSize:20}}>Especies</Text>
                        <View style={styles.containerStatus}>
                            { SPECIESLIST.map((specie,index) => 
                                <View key={index} style={styles.status}>
                                    <TouchableOpacity 
                                        key={index} 
                                        onPress={() => handleSpecie(specie, index)} 
                                        style={[styles.button, 
                                        selectButtonSpecie === index && styles.buttonPressed]}
                                    >
                                    <Text style={styles.textModal} >{specie}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </ScrollView>

                </View>
            </Modal>
        </View>
        </>
    )
}

export default FilterCharacter

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'#3E3B3B'
    },
    containerTitle:{
      paddingVertical:10,
      justifyContent:'center',
      alignItems:'center'
    },
    text:{
      fontSize: 25,
      fontFamily: 'monospace',
      fontWeight:'bold',
      color:'white'
    },
    containerInput:{
        flexDirection: 'row',
        justifyContent:'space-around',
        paddingBottom: 15,
    },
    input:{
        height: 30,
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.5,
        backgroundColor: '#646261',
        borderRadius: 15,
        paddingLeft: 5,
        paddingRight: 5,
        color:'white'
    },
    pagination:{
        backgroundColor: '#1C1B1A',
        flexDirection:'column',
        justifyContent:'flex-end',
        padding:5,
    },
    containerSinResultados:{
        justifyContent:'center',
        alignItems:'center'
    },
    textNotFoundResult:{
        color:'white', 
        textAlign:'center'
    },
    containerModal:{
        backgroundColor:'#060605',
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
    },
    containerStatus:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems:'center',
        justifyContent:'center',
    },
    status:{
        margin: 10,
        paddingRight: 5,
        paddingLeft:5,
        width: 145,
    },
    button:{
        backgroundColor: 'rgb(85, 134, 224)', 
        padding: 15,
        paddingHorizontal: 20,
    },
    textModal:{
        textAlign:'center'
    },
    buttonPressed: {
        backgroundColor: 'rgb(240, 31, 31)'
    }
})