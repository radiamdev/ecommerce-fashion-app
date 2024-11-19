import { StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import useThemeColor from '@/hooks/useThemeColor'
import { ThemedText } from '@/components/ThemedText'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { StatusBar } from 'expo-status-bar'

export default function AccountScreen() {
  const theme = useSelector((state: RootState) => state.theme.theme)

  const backgroundColor = useThemeColor('backgroundScreen')

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />

      <ThemedText>Coming soon</ThemedText>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
