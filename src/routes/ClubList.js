import React, {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import ClubListItem from '../components/ClubListItem'
import Placeholder from '../components/Placeholder'
import { CLUB } from '../navigation/constants'
import Api from '../services/api'

const ClubList = ({ navigation }) => {
  const [contentHeight, setContentHeight] = useState()
  const [data, setData] = useState()
  const [hasError, setHasError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const handleLayout = ({ nativeEvent }) =>
    setContentHeight(nativeEvent.layout.height)

  const getClubs = useCallback(async () => {
    setLoading(true)
    const response = await Api.get('businessunits')

    try {
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
  }, [])

  const goToClub = id => {
    if (!id) {
      return
    }

    navigation.navigate(CLUB, { id })
  }

  const renderClub = item => (
    <ClubListItem
      address={item?.address}
      name={item?.name}
      onPress={() => goToClub(item?.id)}
    />
  )

  useEffect(() => {
    getClubs()
  }, [getClubs])

  const listContentStyle = StyleSheet.flatten([
    styles.listContent,
    {
      minHeight: contentHeight || 0,
    },
  ])

  return (
    <View onLayout={handleLayout} style={styles.container}>
      <FlatList
        contentContainerStyle={listContentStyle}
        data={data}
        ListEmptyComponent={() => (
          <Placeholder
            errorText={hasError && 'Kunde inte hämta data'}
            loading={isLoading}
            text={'Hittade inga klubbar'}
          />
        )}
        renderItem={({ item }) => renderClub(item)}
        showsVerticalScrollIndicator={false}
        style={styles.listContainer}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingTop: 24,
    paddingBottom: 64,
  },
})

export default ClubList
