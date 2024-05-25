import React, {useEffect} from "react"
import { StyleSheet, View, BackHandler } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useDispatch } from "react-redux"
import { getDataInitialAsync } from "./features/authUser/authUserSlice"

import Constanst from 'expo-constants'

import CharacterList from "./components/Character/CharacterList"
import Filters from "./components/Filters/Filters"
import Favorites from "./components/Favorites"
import Account from "./components/Account"
import DetailCharacter from "./components/Character/DetailCharacter"
import Ejemplo from './components/Ejemplo'
import FilterCharacter from "./components/Filters/FilterCharacter"
import FilterLocation from "./components/Filters/FilterLocation"
import FilterEpisode from "./components/Filters/FilterEpisode"
import DetailLocation from "./components/Location/DetailLocation"
import DetailEpisode from "./components/Episode/DetailEpisode"
import SuccessfullyRegister from "./components/Account/SuccessfullyRegister"

const Main = () => {
    const dispatch = useDispatch()
    const Stack = createNativeStackNavigator();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)

    useEffect(() => {
        dispatch(getDataInitialAsync())
    },[dispatch])

    return ( 
        <View style={styles.container}>
        <View style={styles.main}>
            <NavigationContainer>
            <Stack.Navigator
                screenOptions={
                    {
                        headerShown:false,
                    }
                }
            >
                <Stack.Screen name='Home' component={CharacterList} />
                <Stack.Screen name='Filters' component={Filters} />
                <Stack.Screen name='Favorites' component={Favorites} />
                <Stack.Screen name='Account' component={Account} />
                <Stack.Screen name='Id' component={DetailCharacter} />
                <Stack.Screen name='IdLocation' component={DetailLocation} />
                <Stack.Screen name='IdEpisode' component={DetailEpisode} />
                <Stack.Screen name='Ejemplo' component={Ejemplo} />
                <Stack.Screen name='FilterCharacter' component={FilterCharacter} />
                <Stack.Screen name='FilterLocation' component={FilterLocation} />
                <Stack.Screen name='FilterEpisode' component={FilterEpisode} />
                <Stack.Screen name='Successfully' component={SuccessfullyRegister} />

            </Stack.Navigator>
            </NavigationContainer>
        </View>
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#060605',
    },
    main:{
        flex:1,
        marginTop: Constanst.statusBarHeight,
        justifyContent: 'space-between'
    }
  });