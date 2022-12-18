import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import AppNavigator from './navigation/navigator'

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'black'}
        barStyle={'light-content'}
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  )
}

export default App
