import { View, type ViewProps } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import React from 'react'

export function ThemedView({ style, ...otherProps }: Readonly<ViewProps>) {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const colors = useSelector((state: RootState) => state.theme.colors)
  const backgroundColor = colors[theme].background

  return <View style={[{ backgroundColor }, style]} {...otherProps} />
}