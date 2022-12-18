import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { faded, white } from '../style/colors'

const SearchBar = ({ containerStyle, style, ...props }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput style={[styles.input, style]} {...props} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: white,
    borderBottomColor: faded,
    borderBottomWidth: 1,
  },
  input: {
    backgroundColor: white,
    minHeight: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: faded,
    padding: 4,
  },
})

export default SearchBar
