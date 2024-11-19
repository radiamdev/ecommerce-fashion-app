import React from 'react'
import { Text, type TextProps, StyleSheet, PixelRatio } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import useThemeColor from '@/hooks/useThemeColor' // Import the useThemeColor hook
import { ThemeColors } from '@/constants/Colors'

export type ThemedTextProps = TextProps & {
  type?:
    | 'xs'
    | 'sm'
    | 'smBold'
    | 'default'
    | 'defaultSemiBold'
    | 'md'
    | 'mdBold'
    | 'lg'
    | 'lgBold'
    | 'xl'
    | 'xlBold'
    | 'xxl'
    | 'xxlBold'
    | 'xxxl'
    | 'xxxlBold'
    | 'title'
    | 'link'
    | 'big'
  c?: keyof ThemeColors
  ta?: 'auto' | 'center' | 'left' | 'justify' | 'right'
  tt?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
}

const pixelDensity = PixelRatio.get()

export function ThemedText({
  style,
  type = 'default',
  c,
  ta = 'auto',
  tt = 'none',
  ...rest
}: ThemedTextProps) {
  const theme = useSelector((state: RootState) => state.theme.theme)
  const colors = useSelector((state: RootState) => state.theme.colors)
  const defaultColor = colors[theme].text
  const themeColor = useThemeColor(c ?? 'text')
  const color = c ? themeColor : defaultColor

  return (
    <Text
      style={[
        { color },
        type === 'xs' ? styles.xs : undefined,
        type === 'sm' ? styles.sm : undefined,
        type === 'smBold' ? styles.smBold : undefined,
        type === 'default' ? styles.default : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'md' ? styles.md : undefined,
        type === 'mdBold' ? styles.mdBold : undefined,
        type === 'lg' ? styles.lg : undefined,
        type === 'lgBold' ? styles.lgBold : undefined,
        type === 'xl' ? styles.xl : undefined,
        type === 'xlBold' ? styles.xlBold : undefined,
        type === 'xxl' ? styles.xxl : undefined,
        type === 'xxlBold' ? styles.xxlBold : undefined,
        type === 'xxxl' ? styles.xxl : undefined,
        type === 'xxxlBold' ? styles.xxlBold : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'big' ? styles.big : undefined,
        ta === 'center' ? styles.center : undefined,
        ta === 'auto' ? styles.auto : undefined,
        ta === 'left' ? styles.left : undefined,
        ta === 'justify' ? styles.justify : undefined,
        ta === 'right' ? styles.right : undefined,
        tt === 'none' ? styles.none : undefined,
        tt === 'capitalize' ? styles.capitalize : undefined,
        tt === 'uppercase' ? styles.uppercase : undefined,
        tt === 'lowercase' ? styles.lowercase : undefined,
        style,
      ]}
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  center: {
    textAlign: 'center',
  },
  auto: {
    textAlign: 'auto',
  },
  left: {
    textAlign: 'left',
  },
  justify: {
    textAlign: 'justify',
  },
  right: {
    textAlign: 'right',
  },
  none: {
    textTransform: 'none',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  lowercase: {
    textTransform: 'lowercase',
  },
  xs: {
    fontSize: 10,
    lineHeight: 14,
  },
  sm: {
    fontSize: 12,
    lineHeight: 16,
  },
  smBold: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 16,
  },
  default: {
    fontSize: 14,
    lineHeight: 20,
  },
  defaultSemiBold: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
  },
  md: {
    fontSize: 16,
    fontWeight: 'thin',
  },
  mdBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lg: {
    fontSize: 18,
    lineHeight: 24,
  },
  lgBold: {
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 24,
  },
  xl: {
    fontSize: 20,
    lineHeight: 24,
  },
  xlBold: {
    fontSize: 20,
    fontWeight: 700,
    lineHeight: 24,
  },
  xxl: {
    fontSize: 24,
    lineHeight: 24,
  },
  xxlBold: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  xxxl: {
    fontSize: 28,
    lineHeight: 24,
  },
  xxxlBold: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  big: {
    fontSize: 70,
    lineHeight: 70,
    fontWeight: '600',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
})
