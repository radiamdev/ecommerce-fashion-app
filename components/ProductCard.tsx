import { Image } from 'expo-image'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ThemedText } from './ThemedText'

const { width, height } = Dimensions.get('window')

type Product = {
  id: number
  image: string
  title: string
  price: number
  isFavorite?: boolean
}

type ProductCardProps = {
  item: Product
  handleProductClick: (item: Product) => void
  toggleFavorite: (item: Product) => void
}

const ProductCard = ({
  item,
  handleProductClick,
  toggleFavorite,
}: ProductCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleProductClick(item)}
    >
      {/* Product photo */}
      <Image source={{ uri: item.image }} style={styles.coverImage} />
      {/* Product description info */}
      <View style={styles.contentContainer}>
        <ThemedText type='lgBold' c='blackSecondary'>
          {item.title}
        </ThemedText>
        <ThemedText type='lg' c='blackSecondary'>
          ${item.price.toFixed(2)}
        </ThemedText>
      </View>
      {/* Like rating for product */}
      <View style={[styles.likeContainer, { backgroundColor: 'white' }]}>
        <TouchableOpacity onPress={() => toggleFavorite(item)}>
          <Image
            source={
              item.isFavorite
                ? require('@/assets/images/favoriteFilled.png')
                : require('@/assets/images/favorite.png')
            }
            style={styles.favorite}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  coverImage: {
    height: height * 0.3,
    width: '100%',
    borderRadius: 20,
  },
  contentContainer: {
    padding: 10,
  },
  likeContainer: {
    position: 'absolute',
    padding: 5,
    borderRadius: 20,
    right: 10,
    top: 10,
  },
  favorite: {
    width: 20,
    aspectRatio: 1,
  },
})
