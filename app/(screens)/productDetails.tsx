import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useState, useContext } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Header from '@/components/Header'
import { fonts } from '@/constants/Fonts'
import { CartContext } from '@/context/CartContext'
import { Image } from 'expo-image'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import useThemeColor from '@/hooks/useThemeColor'
import { ThemedText } from '@/components/ThemedText'

const { width, height } = Dimensions.get('window')

const colorsArray = [
  '#91A1B0',
  '#B11D1D',
  '#1F44A3',
  '#9F632A',
  '#1D752B',
  '#000000',
]

export default function ProductDetailsScreen() {
  const background = useThemeColor('background')
  const pink = useThemeColor('pink')
  const red = useThemeColor('red')
  const one = useThemeColor('pinkGradientOne')
  const two = useThemeColor('pinkGradientTwo')

  // Safely accessing the CartContext
  const cartContext = useContext(CartContext)
  if (!cartContext) {
    throw new Error('useCart must be used within a CartProvider')
  }
  const { addToCartItem } = cartContext

  const { id, title, price, image } = useLocalSearchParams() // Fetch params from the route
  const router = useRouter()

  // Safely extract values from useLocalSearchParams()
  const productId = Array.isArray(id) ? id[0] : id // Get the first value if it's an array
  const productTitle = Array.isArray(title) ? title[0] : title
  const productPrice = Array.isArray(price) ? price[0] : price
  const productImage = Array.isArray(image) ? image[0] : image

  // Define selected properties
  const [selectedSize, setSelectedSize] = useState('M')
  const [selectedColor, setSelectedColor] = useState('#B11D1D')

  // Add to cart handler
  const handleAddToCart = () => {
    const product = {
      id: productId,
      title: productTitle,
      price: parseFloat(productPrice), // Ensure price is a number
      image: productImage,
      size: selectedSize,
      color: selectedColor,
    }

    addToCartItem(product) // Safely called after checking context
    router.push('/cart')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style='auto' />
      <LinearGradient colors={[one, two]} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <Header isCart={false} />
        </View>
        {/* Product image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: productImage }}
            contentFit='fill'
            style={styles.coverImage}
          />
        </View>
        {/* Product description */}
        <View style={styles.contentContainer}>
          {/* Product name and price */}
          <View style={styles.textContainer}>
            <ThemedText
              type='xlBold'
              c='blackSecondary'
              style={{ fontFamily: fonts.regular }}
            >
              {productTitle}
            </ThemedText>
            <ThemedText
              type='xlBold'
              c='blackSecondary'
              style={{ fontFamily: fonts.regular }}
            >
              $ {productPrice}
            </ThemedText>
          </View>

          {/* Size Container */}
          <View style={styles.sizeContainer}>
            <ThemedText
              type='xlBold'
              c='blackSecondary'
              style={{ fontFamily: fonts.regular, marginRight: 20 }}
            >
              Size
            </ThemedText>
            {['S', 'M', 'L', 'XL'].map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeValueContainer,
                  { backgroundColor: background },
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <ThemedText
                  type='lgBold'
                  style={[
                    { fontFamily: fonts.regular },
                    selectedSize === size && { color: red },
                  ]}
                >
                  {size}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
          {/* Color Container */}
          <View style={styles.colorContainer}>
            {colorsArray.map((color, index) => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
              >
                <View
                  style={[
                    styles.borderColorCircle,
                    selectedColor === color && {
                      borderColor: color,
                      borderWidth: 2,
                      borderRadius: 24,
                    },
                  ]}
                >
                  <View
                    style={[styles.colorCircle, { backgroundColor: color }]}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Add to Cart Button */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: pink }]}
            onPress={handleAddToCart}
          >
            <ThemedText type='xxlBold' c='white'>
              Add to Cart
            </ThemedText>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.5,
  },
  coverImage: {
    flex: 1,
  },
  contentContainer: {
    padding: 15,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    gap: 10,
  },
  sizeValueContainer: {
    width: 40,
    aspectRatio: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
  },
  borderColorCircle: {
    width: 48,
    aspectRatio: 1,
    padding: 5,
  },
  colorCircle: {
    flex: 1,
    borderRadius: 18,
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 30,
  },
})
