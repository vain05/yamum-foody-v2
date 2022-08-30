import React from 'react'

import 'react-native-gesture-handler'

import { createStackNavigator } from '@react-navigation/stack'

import { NavigationContainer } from '@react-navigation/native'

import CustomDrawer from './navigation/DrawerNavigation/CustomDrawer'

import { useFonts } from 'expo-font'

import {
  Wallet,
  Maps,
  CartTab,
  Favourite,
  Notification,
  Restaurant,
} from './screens'

import { createStore, applyMiddleware } from 'redux'

import { Provider } from 'react-redux'

import thunk from 'redux-thunk'

import rootReducer from './stores/rootReducer'

const Stack = createStackNavigator()

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  const [loaded] = useFonts({
    'Poppins-Black': require('./assets/fonts/Poppins-Black.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Home'}
        >
          {/* Home */}
          <Stack.Screen name='Home' component={CustomDrawer} />

          {/* My Wallet*/}
          <Stack.Screen name='My Wallet' component={Wallet} />

          {/* Maps */}
          <Stack.Screen name='Maps' component={Maps} />

          {/* Cart */}
          <Stack.Screen name='Cart' component={CartTab} />

          {/* Favourite */}
          <Stack.Screen name='Favourite' component={Favourite} />

          {/* Notification */}
          <Stack.Screen name='Notification' component={Notification} />

          {/* Restaurant */}
          <Stack.Screen name='Restaurant' component={Restaurant} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
