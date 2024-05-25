import Main from './src/Main'
import store from './src/app/store'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
   return (
     <Provider store={store}>
        <Main />
     </Provider>
   )
}
