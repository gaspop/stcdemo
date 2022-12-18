import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { gray, white } from '../style/colors'

const ClubDetails = ({ address, name }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <View style={styles.addressContainer}>
        <Text style={styles.address}>{address?.street}</Text>
        <Text style={styles.address}>
          <Text>{address?.postalCode} </Text>
          <Text>{address?.city}</Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: white,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addressContainer: {
    marginTop: 8,
  },
  address: {
    fontSize: 16,
    color: gray,
  },
})

export default ClubDetails
