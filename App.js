import React from 'react'

import 'react-native-gesture-handler'

import { createStackNavigator } from '@react-navigation/stack'

import { NavigationContainer } from '@react-navigation/native'

import CustomDrawer from './navigation/DrawerNavigation/CustomDrawer'

import { useFonts } from 'expo-font'

import { Restaurant, OrderDelivery } from './screens'

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

          {/* Restaurant */}
          <Stack.Screen name='Restaurant' component={Restaurant} />

          {/* Order Delivery */}
          <Stack.Screen name='OrderDelivery' component={OrderDelivery} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
