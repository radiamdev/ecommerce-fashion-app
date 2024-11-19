import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { fonts } from '@/constants/Fonts'
import { Image } from 'expo-image'
import { ThemedText } from './ThemedText'
import useThemeColor from '@/hooks/useThemeColor'

const { width, height } = Dimensions.get('window')

const CartCard = ({ item, handleDelete }: any) => {
  const background = useThemeColor('background')

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        contentFit='fill'
        style={styles.image}
      />
      <View style={styles.content}>
        {/* Product name  */}
        <ThemedText
          type='lgBold'
          c='blackSecondary'
          style={{ fontFamily: fonts.medium }}
        >
          {item.title}
        </ThemedText>
        {/* Product price */}
        <ThemedText
          type='lgBold'
          c='greyQuadritary'
          style={{ fontFamily: fonts.medium }}
        >
          ${item.price}
        </ThemedText>
        {/* Color and size container */}
        <View style={styles.textCircleContainer}>
          <View
            style={[styles.circle, { backgroundColor: item?.color || 'red' }]}
          />
          <View style={[styles.sizeContainer, { backgroundColor: background }]}>
            <ThemedText type='lgBold' style={{ fontFamily: fonts.medium }}>
              {item.size}
            </ThemedText>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Image
          source={require('@/assets/images/deleteIcon.png')}
          style={styles.deleteIcon}
        />
      </TouchableOpacity>
    </View>
  )
}

export default CartCard

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  image: {
    width: width * 0.3,
    height: height * 0.15,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 10,
    paddingHorizontal: 10,
  },
  circle: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
  },
  sizeContainer: {
    width: 32,
    aspectRatio: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCircleContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  deleteIcon: {
    height: 30,
    width: 30,
  },
})
