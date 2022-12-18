import React from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={'black'}
        barStyle={'dark-content'}
      />
      <Text>STC</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default App
