import React from "react"
import { View,Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native"

import IconEye from "../Icons/IconEye"
import IconNoEye from "../Icons/IconNoEye"

const Login = ({ stateLogin,
                 email, 
                 setEmail, 
                 password, 
                 setPassword, 
                 handleLogin, 
                 handleChange,
                 showPassword, 
                 setShowPassword }) => {

    //Cambio de estado para vista de contraseña                
    const [
        icon
    ] = showPassword ? [
        <IconNoEye color={'white'}/>
    ] : [
        <IconEye color={'white'}/>
    ]

    return (
        <View style={styles.containerLogin}>
            <View style={styles.containerTitle}>
            <Text style={styles.textTitle}>¡Bienvenido de nuevo! me alegra verte</Text>
            </View>
                <View style={styles.containerInput}>
            <TextInput
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Correo electrónico"
            />
            </View>
            <View style={styles.containerInput}>
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={showPassword ? false : true}
                placeholder="Contraseña"
            />
            <TouchableOpacity onPress={setShowPassword} style={{position:'absolute', right:24,top:27,}}>
                {icon}
            </TouchableOpacity>
            </View>
            {
                stateLogin.isError ? <Text style={{color:'white'}}>{stateLogin.error}</Text> : null
            }
            {
                stateLogin.loading ? <Text style={{color:'white'}}>Check credentials...</Text> : null
            }
            {
                stateLogin.loading ? 
                <View style={styles.buttonSignIn}>
                <TouchableOpacity>
                <Text style={styles.textSignIn}>Iniciar Sesión</Text>
            </TouchableOpacity>
            </View> 
            : 
            <View style={styles.buttonSignIn}>
            <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.textSignIn}>Iniciar Sesión</Text>
            </TouchableOpacity>
            </View>
            }
            <View style={styles.footer}>
                <Text style={{color:'white'}}>¿No tienes una cuenta?</Text>
                <TouchableOpacity onPress={handleChange}>
                    <Text style={{color:'#33FFF0'}}> Regístrate ahora.</Text>
                </TouchableOpacity>
            </View>
            </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3E3B3B',
        justifyContent:'center',
        alignItems:'center',
    },
    containerTitle:{
        paddingHorizontal: 25,
    },
    textTitle:{
        fontSize: 25,
        fontFamily: 'monospace',
        fontWeight:'bold',
        color:'white',
        textAlign:'center'
    },
    input:{
        height: 30,
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.5,
        backgroundColor: '#646261',
        borderRadius: 15,
        paddingLeft: 5,
        paddingRight: 5,
        color:'white',
        width:250,
        height: 50,
        fontSize: 23,
    },
    containerLogin:{
        paddingTop:200,
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    containerInput:{
        padding:15
    },
    buttonSignIn:{
        width: 200,
        backgroundColor: '#1570EC',
        alignItems:'center',
        justifyContent:'center',
        height:45,
        borderRadius: 20,
    },
    textSignIn:{
        fontSize: 21,
        fontFamily:'monospace',
        color:'white'
    },
    footer:{
        paddingTop:220,
        flexDirection: 'row',
    }
})