import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { faded, white } from '../style/colors'

const ClubListItem = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: white,
    borderBottomWidth: 1,
    borderBottomColor: faded,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default ClubListItem
