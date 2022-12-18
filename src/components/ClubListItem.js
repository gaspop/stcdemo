import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { faded, gray, white } from '../style/colors'

const ClubListItem = ({ address, name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text numberOfLines={1} style={styles.name}>
          {name || 'Namn saknas'}
        </Text>
        {hasAddress(address) && (
          <>
            <View style={styles.addressContainer}>
              <Text style={styles.address}>
                {address.street}
              </Text>
              <Text style={styles.address}>
                <Text>{address.postalCode} </Text>
                <Text>{address.city}</Text>
              </Text>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  )
}

const hasAddress = address =>
  !!(
    address?.city ||
    address?.postalCode ||
    address?.street
  )

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
  addressContainer: {
    marginTop: 8,
  },
  address: {
    color: gray,
  },
})

export default ClubListItem
