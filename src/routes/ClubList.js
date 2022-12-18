import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ClubList = () => {
  return (
    <View style={styles.container}>
      <Text>{'Klubblista'}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ClubList
