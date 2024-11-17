import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fonts } from '@/constants/Fonts'
import { useRouter } from 'expo-router'
import { ThemedText } from './ThemedText'
import { Image } from 'expo-image'

const Header = ({ isCart }: { isCart: boolean }) => {
  const navigation = useRouter()

  return (
    <View style={styles.header}>
      {isCart ? (
        <TouchableOpacity
          style={styles.appDrawerContainer}
          onPress={() => {
            navigation.back()
          }}
        >
          <Image
            source={require('@/assets/images/arrowback.png')}
            contentFit='contain'
            style={styles.appBackIcon}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.appDrawerContainer}>
          <Image
            source={require('@/assets/images/apps.png')}
            style={styles.appDrawerIcon}
          />
        </TouchableOpacity>
      )}

      {isCart ? (
        <ThemedText
          type='title'
          c='black'
          style={{ fontFamily: fonts.regular }}
        >
          My Cart
        </ThemedText>
      ) : null}
      <TouchableOpacity>
        <Image
          source={require('@/assets/images/Ellipse2.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appDrawerContainer: {
    backgroundColor: 'white',
    width: 44,
    aspectRatio: 1,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appDrawerIcon: {
    width: 30,
    aspectRatio: 1,
  },
  appBackIcon: {
    height: 24,
    aspectRatio: 1,
  },
  profileImage: {
    width: 44,
    aspectRatio: 1,
  },
})
