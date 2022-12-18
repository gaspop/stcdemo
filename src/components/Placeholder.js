import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { black } from '../style/colors'

const Placeholder = ({ loading, error, text }) => {
  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator color={black} size={'large'} />
      )}
      {!loading && error && (
        <Text style={styles.error}>{error}</Text>
      )}
      {!loading && !error && (
        <Text style={styles.text}>{text}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 48,
  },
  error: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
})

export default Placeholder
