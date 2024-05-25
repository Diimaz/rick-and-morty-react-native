import AsyncStorage from '@react-native-async-storage/async-storage'

/**
 * Obtiene un dato de AsyncStorage con una clave específica.
 * @returns {Promise<string|null>} Una promesa que se resuelve con el dato almacenado en AsyncStorage o null si no hay ningún dato almacenado.
 */
export const getDataAsyncStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('myToken');
      if (token !== null) {
        return token
      }
    } catch (error) {
      console.error('Error al obtener el dato de AsyncStorage:', error)
      return null
    }
}

/**
 * Guarda un token en AsyncStorage.
 * @param {string} token - El token que se va a guardar.
 */
export const saveToken = async (token) => {
    try{
        await AsyncStorage.setItem('myToken', token)
        console.log('Token guardado')
    }catch(e) {
        console.log('Error al guardar token' , e)
    }
} 

/**
 * Elimina un dato de AsyncStorage.
 */
export const removeToken = async () => {
    try {
        await AsyncStorage.removeItem('myToken')
        console.log('Datos eliminados correctamente')
    } catch (error) {
        console.error('Error al eliminar los datos:', error)
    }

    //ELIMINACION DE TODOS LOS DATOS
        /*try {
            await AsyncStorage.clear();
            console.log('Todos los datos eliminados correctamente');
        } catch (error) {
            console.error('Error al eliminar todos los datos:', error);
        }*/
}