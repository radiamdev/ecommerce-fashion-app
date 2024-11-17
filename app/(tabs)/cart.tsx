import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useContext } from 'react'
import Header from '@/components/Header'
import { fonts } from '@/constants/Fonts'
import CartCard from '@/components/CartCard'
import { CartContext } from '@/context/CartContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import useThemeColor from '@/hooks/useThemeColor'
import { StatusBar } from 'expo-status-bar'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'
import { ThemedText } from '@/components/ThemedText'

export default function CartScreen() {
  const theme = useSelector((state: RootState) => state.theme.theme)

  const backgroundColor = useThemeColor('backgroundScreen')
  const pink = useThemeColor('pink')

  const { cartItems, deleteCartItem, totalPrice } = useContext(CartContext)

  const handleDeleteItem = async (id) => {
    await deleteCartItem(id)
  }
  return (
    <SafeAreaView style={[styles.container, { flex: 1, backgroundColor }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      {/* Header */}
      <View style={styles.header}>
        <Header isCart={true} title='My cart' />
      </View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartCard item={item} handleDelete={handleDeleteItem} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}
        ListFooterComponent={
          <>
            <View style={styles.bottomContentContainer}>
              <View style={styles.flexRowContainer}>
                <ThemedText type='lg' c='greyTertiary'>
                  Total:
                </ThemedText>
                <ThemedText type='lg' c='greyTertiary'>
                  ${totalPrice}
                </ThemedText>
              </View>
              <View style={styles.flexRowContainer}>
                <ThemedText type='lg' c='greyTertiary'>
                  Shipping:
                </ThemedText>
                <ThemedText type='lg' c='greyTertiary'>
                  $0.0
                </ThemedText>
              </View>
              <View style={[styles.divider, { borderColor: '#C0C0C0' }]} />
              <View style={styles.flexRowContainer}>
                <ThemedText type='lg' c='greyTertiary'>
                  Grand Total:
                </ThemedText>
                <ThemedText type='lgBold' c='blackTertiary'>
                  ${totalPrice}
                </ThemedText>
              </View>
            </View>

            {/* Checkout button */}
            <TouchableOpacity style={[styles.button, {backgroundColor: pink}]}>
              <ThemedText
                type='xlBold'
                c='white'
                ta='center'
                style={{ fontFamily: fonts.regular }}
              >
                Checkout
              </ThemedText>
            </TouchableOpacity>
          </>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  header: {
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  wrapper: {
    paddingVertical: 10,
    paddingBottom: 50,
  },
  flexRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
  },
  divider: {
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 5,
  },
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginVertical: 30,
  },
})
