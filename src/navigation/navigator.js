import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Club from '../routes/Club'
import ClubList from '../routes/ClubList'
import { CLUB, CLUB_LIST } from './constants'

const Stack = createNativeStackNavigator()

const AppNavigator = () => (
  <Stack.Navigator initialRouteName={CLUB_LIST}>
    <Stack.Screen name={CLUB_LIST} component={ClubList} />
    <Stack.Screen name={CLUB} component={Club} />
  </Stack.Navigator>
)

export default AppNavigator
