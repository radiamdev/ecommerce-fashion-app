import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fonts } from '@/constants/Fonts'
import { useRouter } from 'expo-router'
import { ThemedText } from './ThemedText'
import { Image } from 'expo-image'
import useThemeColor from '@/hooks/useThemeColor'
import { Entypo } from '@expo/vector-icons'

interface HeaderProps {
  isCart: boolean
  title?: string
}

const Header = ({ isCart, title }: HeaderProps) => {
  const background = useThemeColor('background')
  const pink = useThemeColor('pink')

  const navigation = useRouter()

  return (
    <View style={styles.header}>
      {isCart ? (
        <TouchableOpacity
          style={[styles.appDrawerContainer, { backgroundColor: background }]}
          onPress={() => {
            navigation.back()
          }}
        >
          <Entypo name='chevron-left' size={28} color={pink} />
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
          {title}
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
    alignItems: 'center',
  },
  appDrawerContainer: {
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
