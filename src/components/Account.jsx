import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native"

import useUser from "../hooks/useUser"

import Footer from "./Footer"
import Page404 from "./Page404"
import Login from "./Account/Login"
import Register from "./Account/Register"
import Perfil from "./Account/Perfil"

const Account = ({navigation}) => {
    //Obtener datos del hook
    const { isLogin, register, login, logout, stateRegister ,stateLogin, isError } = useUser()
    /**
    * Estado local para almacenar los datos del email, la contraseña y la confirmación de la contraseña 
    * del usuario.
    */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirPassword, setConfirPassword] = useState('')
    //Estado local para controlar vista de login y register.
    const [signIn, setSignIn] = useState(true)
    //Estado local para controlar la vista de la contraseña y la confirmaciónd e la contraseña.
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirPassword, setShowConfirPassword] = useState(false)

    //Resetea los valores de los estados locales
    const resetInput = () => {
        setEmail('')
        setPassword('')
        setConfirPassword('')
        setShowPassword(false)
        setShowConfirPassword(false)
    }

    //Registra un usuario nuevo
    const handleRegister = () => {
        register({email, password, confirPassword})
        if(stateRegister.successfully === true){
            navigation.navigate('Successfully')
            setSignIn(true)
            resetInput()
            return
        }
    }

    //Cambia entre vista de login y register
    const handleChange = () => {
        resetInput()
        setSignIn(!signIn)
    }

    //Inicia sesión para un usuario.
    const handleLogin = () => {
        login({email, password})
        if(stateLogin.successfully === true){
            resetInput()
        }
    }

    //Cerrar sesión para el usuario.
    const handleLogout = async() => {
        logout()
        resetInput()
    }

    return (
        <>
        { isError ? 
            <Page404 /> 
          :
            <>
            <View style={styles.container}>
                { isLogin ? 
                    <Perfil handleLogout={handleLogout}/>
                 :
                    <>
                    { signIn ? 
                        <Login 
                            stateLogin={stateLogin} 
                            email={email} 
                            setEmail={setEmail} 
                            password={password} 
                            setPassword={setPassword} 
                            handleLogin={handleLogin}
                            handleChange={handleChange}
                            showPassword={showPassword}
                            setShowPassword={() => setShowPassword(!showPassword)}
                        /> 
                      : 
                        <Register 
                            stateRegister={stateRegister} 
                            email={email} 
                            setEmail={setEmail} 
                            password={password} 
                            setPassword={setPassword} 
                            confirPassword={confirPassword}
                            setConfirPassword={setConfirPassword}
                            handleRegister={handleRegister}
                            handleChange={handleChange}
                            showPassword={showPassword}
                            setShowPassword={() => setShowPassword(!showPassword)}
                            showConfirPassword={showConfirPassword}
                            setShowConfirPassword={() => setShowConfirPassword(!showConfirPassword)}
                        /> 
                    }
                    </>
                }
            </View>

            <Footer/>
            </>
        }
        </>
    )
}

export default Account

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3E3B3B',
        justifyContent:'center',
        alignItems:'center',
    }
})