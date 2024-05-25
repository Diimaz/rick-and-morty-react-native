import React from "react"
import { View,Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import IconEye from "../Icons/IconEye"
import IconNoEye from "../Icons/IconNoEye"

const Register = ({ stateRegister,
                    email, 
                    setEmail, 
                    password, 
                    setPassword, 
                    confirPassword, 
                    setConfirPassword, 
                    handleRegister, 
                    handleChange, 
                    showPassword, 
                    setShowPassword, 
                    showConfirPassword, 
                    setShowConfirPassword }) => {

    //Cambio de estado para vista de contraseña                    
    const [
        iconPassword
    ] = showPassword ? [
        <IconNoEye color={'white'}/>
    ] : [
        <IconEye color={'white'}/>
    ]

    //Cambio de estado para vista de confirmar contraseña
    const [
        iconConfirPassword
    ] = showConfirPassword ? [
        <IconNoEye color={'white'}/>
    ] : [
        <IconEye color={'white'}/>
    ]

    return (
        <View style={styles.containerLogin}>
            <Text style={styles.textTitle}>Regístrate para empezar</Text>
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
                {iconPassword}
            </TouchableOpacity>
            </View>
            <View style={styles.containerInput}>
            <TextInput
                style={styles.input}
                onChangeText={setConfirPassword}
                value={confirPassword}
                secureTextEntry={showConfirPassword ? false : true}
                placeholder="Confirmar contraseña"
            />
            <TouchableOpacity onPress={setShowConfirPassword} style={{position:'absolute', right:24,top:27,}}>
                {iconConfirPassword}
            </TouchableOpacity>
            </View>
            {
                stateRegister.isError ? <Text style={{color:'white'}}>{stateRegister.error}</Text> : null
            }
            {
                stateRegister.loading ? 
                <View style={styles.buttonSignIn}>
                <TouchableOpacity>
                <Text style={styles.textSignIn}>Regístrate</Text>
            </TouchableOpacity>
            </View> 
            : 
            <View style={styles.buttonSignIn}>
            <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.textSignIn}>Regístrate</Text>
            </TouchableOpacity>
            </View>
            }
            <View style={styles.footer}>
                <Text style={{color:'white'}}>Ya tienes una cuenta.</Text>
                <TouchableOpacity onPress={handleChange}>
                    <Text style={{color:'#33FFF0'}}> Inicia sesión.</Text>
                </TouchableOpacity>
            </View>
            </View>
    )
}

export default Register

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#3E3B3B',
        justifyContent:'center',
        alignItems:'center',
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
        alignItems:'center'
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
        //marginTop:100,
        paddingTop:180,
        flexDirection: 'row',
    }
})