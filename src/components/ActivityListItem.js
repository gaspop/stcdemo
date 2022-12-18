import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { faded, white } from '../style/colors'

const ActivityListItem = ({ duration, name, slots }) => {
  const startsAt = new Date(duration.start)

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.time}>
        {'Kl '} {format(startsAt, 'HH:mm')}
      </Text>
      <Text style={styles.bookings}>
        {getBookedPercentage(slots)}
        {'% bokad'}
      </Text>
    </View>
  )
}

const getBookedPercentage = slots => {
  if (!slots) {
    return 0
  }

  const remainingSlots = slots.totalBookable - slots.leftToBook
  return Math.round((remainingSlots / slots.totalBookable) * 100)
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: white,
    borderBottomWidth: 1,
    borderBottomColor: faded,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  time: {
    fontSize: 14,
    marginBottom: 16,
  },
  bookings: {
    fontWeight: '500',
  },
})

export default ActivityListItem
