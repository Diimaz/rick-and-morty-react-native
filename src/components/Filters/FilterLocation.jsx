import React, { useEffect, useRef, useState } from "react"
import { View, Text,StyleSheet, TouchableOpacity, FlatList, Modal, Dimensions } from "react-native"
import { Picker } from "@react-native-picker/picker"
import Constanst from 'expo-constants'

import useFilterLocation from "../../hooks/useFilterLocation"

import LocationItem from "../Location/LocationItem"
import Loading from "../Loading"
import Pagination from "../Pagination"

import IconFilter from "../Icons/IconFilter"
import IconClosed from "../Icons/IconClosed"

import listLocation from "../../resourses/listLocation"

const IMG = require('../../../assets/ImgNotFound.png')

const FilterLocation = () => {
    //Estado global para almacenar el nombre, tipo y dimension de la ubicación
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [dimension, setDimension] = useState('')
    //Estado global para controlar la vista del modal
    const [viewModal, setViewModal] = useState(false)
    //Estado global para controlar la selección de los botones
    const [selectName, setSelectName] = useState()
    const [selectType, setSelectType] = useState()
    const [selectDimension, setSelectDimension] = useState()
    //Obtener información del hook
    const {locations, isLoading, pages } = useFilterLocation({name, type, dimension})
    //Obtener la lista de los nombres, tipos y dimensiones de las ubicaciones
    const { NAMELIST, TYPELIST, DIMENSIONLIST } = listLocation()

    //Visualizar el modal
    const handleModal = () => {
        setViewModal(true)
    }

    //Poder hacer el gesto hacía atras
    handleBackPress = () =>{
        setViewModal(false)
        return true
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerTitle}>
                <Text style={styles.text} >Filtrado de ubicación</Text>
            </View>

            <View style={styles.containerInput}>
                <View style={{paddingBottom:15}}>
                    <Text style={{textAlign:'center', color:'white'}}>Nombre</Text>
                        <Picker style={{width:200, backgroundColor:'#3E2626', height:15}}
                            selectedValue={selectName}
                            onValueChange={(itemValue, itemIndex) => {
                                setName(itemValue)
                                setSelectName(itemValue)
                            }}
                        >
                            <Picker.Item style={{color:'white'}} label="Todos los nombres" value={''}/>
                            { NAMELIST.map((name,index) => 
                                <Picker.Item style={{color:'white'}} key={index} label={name} value={name} />
                              )
                            }
                        </Picker>                      
                </View>
                <View>
                    <TouchableOpacity onPress={handleModal}>
                        <IconFilter color={'#F9775E'}/> 
                    </TouchableOpacity>
                </View>
            </View>

            { isLoading ? 
                <Loading /> 
              :
                locations.length > 0 ?
                    <>
                    <FlatList
                        data={locations}
                        renderItem={({item:location}) => (
                            <LocationItem location={location} img={IMG}/>  
                        )}
                    /> 
                    { pages.length > 1 ? 
                     <View style={styles.pagination}>
                            <Pagination 
                                typePage={'location'} 
                                name={name}  
                                type={type} 
                                dimension={dimension} 
                                pages={pages}
                            />   
                        </View> 
                      : 
                        null
                    }
                    </>  
                 : 
                    <View style={styles.containerSinResultados}>
                        <Text style={{textAlign:'center', color:'white'}}>No se encontraron resultados</Text>
                    </View>
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

                        <View style={styles.pickerModal}>
                            <View style={styles.picker}>
                                <Text style={{textAlign:'center'}}>Tipo</Text>
                                <View style={{paddingVertical:10}}>
                                    <Picker style={{width:200, backgroundColor:'rgb(85, 134, 224)'}}
                                        selectedValue={selectType}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setType(itemValue)
                                            setSelectType(itemValue)
                                            }}
                                    >
                                        <Picker.Item label="Todos los tipos" value={''}/>
                                        { TYPELIST.map((type,index) => 
                                            <Picker.Item key={index} label={type} value={type} />
                                          )
                                        }
                                    </Picker>                      
                                </View>
                            </View>

                            <View style={styles.picker}>
                                <Text style={{textAlign:'center'}}>Dimensión</Text>
                                <View style={{paddingVertical:10}}>
                                    <Picker style={{width:200, backgroundColor:'rgb(85, 134, 224)'}}
                                        selectedValue={selectDimension}
                                        onValueChange={(itemValue, itemIndex) => {
                                            setDimension(itemValue)
                                            setSelectDimension(itemValue)
                                        }}
                                    >
                                        <Picker.Item label="Todas las dimensiones" value={''}/>
                                        { DIMENSIONLIST.map((dimension,index) => 
                                            <Picker.Item key={index} label={dimension} value={dimension} />
                                          )
                                        }
                                    </Picker>                      
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
        </View>
    )
}

export default FilterLocation

const styles = StyleSheet.create({
    container:{
        flex:1,
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
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        paddingRight: 45,
        paddingBottom: 15,
        paddingTop:15,
    },
    pagination:{
        backgroundColor: '#1C1B1A',
        flexDirection:'column',
        justifyContent:'flex-end',
        padding:5,
    },
    containerModal:{
        backgroundColor:'white',
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
        marginTop: Constanst.statusBarHeight
    },
    pickerModal:{
        alignSelf:'center',
        justifyContent:'center',
        paddingTop:Dimensions.get('screen').height * 0.20,
    },
    picker:{
        padding:10,
    }
})