import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState } from 'react'
import useThemeColor from '@/hooks/useThemeColor'
import { ThemedText } from './ThemedText'

const Tags = () => {
  const pink = useThemeColor('pink')
  const grey = useThemeColor('grey')
  const greySecondary = useThemeColor('greySecondary')

  // State for selected category
  const [selected, setSelected] = useState('Trending Now')
  // Category list item
  const tags = ['Trending Now', 'All', 'New', 'Fashion', 'Mens']
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tags}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => setSelected(item)}>
              <ThemedText
                type='mdBold'
                style={[
                  styles.tagText,
                  item == selected
                    ? { backgroundColor: pink, color: 'white' }
                    : { backgroundColor: greySecondary, color: grey },
                ]}
              >
                {item}
              </ThemedText>
            </TouchableOpacity>
          )
        }}
        contentContainerStyle={styles.container}
      />
    </View>
  )
}

export default Tags

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  tagText: {
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10, // Here for the gap between each item
  },
})
