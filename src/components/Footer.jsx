import React, {useEffect, useState} from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { useFocusEffect, useNavigation , useRoute} from "@react-navigation/native"

import IconHome from "./Icons/IconHome"
import IconFilter from "./Icons/IconFilter"
import IconFavorite from "./Icons/IconFavorite"
import IconAccount from "./Icons/IconAccount"

const FooterTab = ({onPressButton, typeIcon }) => {
    const route = useRoute()
    //Estado local para almacenar el nombre de la ruta activa.
    const [active, setActive] = useState('')
    /** 
    * Efecto que se activa cuando el componente obtiene el enfoque.
    * Actualiza el estado activo para que coincida con el nombre de la ruta actual.
    */
    useFocusEffect(() => {
        setActive(route.name)
    })
    return(
        <TouchableOpacity style={styles.footer} onPress={onPressButton} >
            <View style={styles.containerIcon}>
                {
                    typeIcon === 'Home' ? <IconHome color={active === typeIcon ? 'white' : '#F9775E'}/> : 
                    typeIcon === 'Filters' ? <IconFilter color={active === typeIcon ? 'white' : '#F9775E'} /> :
                    typeIcon === 'Favorites' ? <IconFavorite color={active === typeIcon ? 'white' : '#F9775E'} /> :
                    typeIcon === 'Account' ? <IconAccount color={active === typeIcon ? 'white' : '#F9775E'} /> :
                    null
                }
            </View>
        </TouchableOpacity>
    )    
}

const Footer = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.footer}>
            <FooterTab typeIcon={'Home'} onPressButton={()=> navigation.navigate('Home')} />
            <FooterTab typeIcon={'Filters'} onPressButton={()=> navigation.navigate('Filters')} />
            <FooterTab typeIcon={'Favorites'} onPressButton={()=> navigation.navigate('Favorites')} />
            <FooterTab typeIcon={'Account'} onPressButton={()=> navigation.navigate('Account')} />
        </View>
    )
}

export default Footer

const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        justifyContent:'space-around',
        paddingVertical:5,
        backgroundColor:'#060605'
    },
    containerIcon:{
        width:45,
        height:45,
        padding: 5,
        backgroundColor: '#9C9897',
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 10,
    },
})