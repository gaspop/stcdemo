import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { black } from '../style/colors'

const Placeholder = ({ loading, errorText, text }) => {
  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator
          animating={true}
          color={black}
          size={'small'}
        />
      )}
      {!loading && errorText && (
        <Text style={styles.errorText}>{errorText}</Text>
      )}
      {!loading && !errorText && (
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
  errorText: {
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
