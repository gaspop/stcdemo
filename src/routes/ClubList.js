import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import ClubListItem from '../components/ClubListItem'
import Placeholder from '../components/Placeholder'
import SearchBar from '../components/SearchBar'
import { CLUB } from '../navigation/constants'
import Api from '../services/api'
import { white } from '../style/colors'

const ClubList = ({ navigation }) => {
  const [contentHeight, setContentHeight] = useState()
  const [data, setData] = useState()
  const [filter, setFilter] = useState(false)
  const [filteredData, setFilteredData] = useState()
  const [hasError, setHasError] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const handleLayout = ({ nativeEvent }) =>
    setContentHeight(nativeEvent.layout.height)

  const getClubs = useCallback(async () => {
    setLoading(true)
    const response = await Api.get('businessunits')

    try {
      if (response.ok && Array.isArray(response.data)) {
        setData(response.data.map(club => parseSearchable(club)))
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

  const goToClub = club => {
    if (!club?.id) {
      return
    }

    navigation.navigate(CLUB, { club })
  }

  const renderClub = item => (
    <ClubListItem name={item?.name} onPress={() => goToClub(item)} />
  )

  useEffect(() => {
    getClubs()
  }, [getClubs])

  useEffect(() => {
    setFilteredData(
      filter?.length > 0
        ? data?.filter(club =>
            club.searchableString?.includes(filter.toLowerCase())
          )
        : data
    )
  }, [data, filter])

  const listContentStyle = StyleSheet.flatten([
    styles.listContent,
    {
      minHeight: contentHeight || 0,
    },
  ])

  return (
    <View onLayout={handleLayout} style={styles.container}>
      <FlatList
        bounces={false}
        contentContainerStyle={listContentStyle}
        data={filteredData}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Placeholder
            errorText={hasError && 'Kunde inte hämta data'}
            loading={isLoading}
            text={'Hittade inga klubbar'}
          />
        }
        ListHeaderComponent={
          <SearchBar
            onChangeText={setFilter}
            placeholder={'Sök efter namn eller adress'}
            value={filter}
          />
        }
        renderItem={({ item }) => renderClub(item)}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        style={styles.listContainer}
      />
    </View>
  )
}

const parseSearchable = club => {
  const fields = [
    club?.name,
    club?.address?.postalCode,
    club?.address?.city,
    club?.address?.street,
  ]
    .filter(f => typeof f === 'string' && f.length > 0)
    .map(f => f.toLowerCase())

  return {
    ...club,
    searchableString: fields.join(' '),
  }
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
})

export default ClubList
