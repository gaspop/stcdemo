import React, { useCallback, useEffect, useState } from 'react'
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { addDays, endOfDay, format, isAfter } from 'date-fns'
import { sv } from 'date-fns/locale'

import Placeholder from '../components/Placeholder'
import Api from '../services/api'
import { faded, white } from '../style/colors'
import ClubDetails from '../components/ClubDetails'
import ActivityListItem from '../components/ActivityListItem'

const Club = ({ route }) => {
  const [club] = useState(route.params?.club)
  const [contentHeight, setContentHeight] = useState()
  const [data, setData] = useState([])
  const [hasError, setHasError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [sections, setSections] = useState([])

  const handleLayout = ({ nativeEvent }) =>
    setContentHeight(nativeEvent.layout.height)

  const getGroupActivities = useCallback(async () => {
    setLoading(true)
    try {
      const now = new Date()
      const periodStart = encodeURIComponent(now.toISOString())
      const periodEnd = encodeURIComponent(
        endOfDay(addDays(now, 7)).toISOString()
      )

      const params = `?period.start=${periodStart}&period.end=${periodEnd}`
      const url = `businessunits/${club.id}/groupactivities${params}`
      const response = await Api.get(url)

      if (response.ok && Array.isArray(response.data)) {
        setData(response.data)
        setHasError(false)
      } else {
        throw new Error('Invalid data')
      }
    } catch (error) {
      setHasError(true)
    } finally {
      setLoading(false)
    }
  }, [club])

  const renderDate = date => (
    <View style={styles.dateContainer}>
      <Text style={styles.date}>
        {format(new Date(date), 'eeee, yyyy-MM-dd', { locale: sv })}
      </Text>
    </View>
  )

  const renderActivity = activity => (
    <ActivityListItem
      duration={activity.duration}
      name={activity.name}
      slots={activity.slots}
    />
  )

  useEffect(() => {
    getGroupActivities()
  }, [getGroupActivities])

  useEffect(() => {
    const activitiesByDate = sectionActivitiesByDate(data)
    setSections(activitiesByDate)
  }, [data])

  const listContentStyle = StyleSheet.flatten([
    styles.listContent,
    {
      minHeight: contentHeight || 0,
    },
  ])

  return (
    <View onLayout={handleLayout} style={styles.container}>
      <SectionList
        contentContainerStyle={listContentStyle}
        sections={sections}
        ListEmptyComponent={() => (
          <Placeholder
            errorText={hasError && 'Kunde inte hämta data'}
            loading={isLoading}
            text={`Hittade inga pass för ${club.name}`}
          />
        )}
        ListHeaderComponent={() => (
          <ClubDetails address={club?.address} name={club?.name} />
        )}
        renderItem={({ item }) => renderActivity(item)}
        renderSectionHeader={({ section }) => renderDate(section.key)}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
      />
    </View>
  )
}

const sectionActivitiesByDate = activities => {
  if (!activities?.length) {
    return []
  }

  const activityMap = activities
    .filter(activity =>
      isAfter(new Date(activity.duration.start), new Date())
    )
    .reduce((sections, activity) => {
      const date = new Date(activity.duration.start)
      const key = format(date, 'yyyy-MM-dd')

      return {
        ...sections,
        [key]: (sections[key] || []).concat([activity]),
      }
    }, [])

  return Object.entries(activityMap).map(([key, value]) => ({
    data: value,
    key,
  }))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 64,
  },
  dateContainer: {
    padding: 16,
    backgroundColor: white,
    borderBottomColor: faded,
    borderBottomWidth: 1,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
})

export default Club
