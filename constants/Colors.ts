/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    black: '#000',
    white: '#fff',
    backgroundScreen: '#f1f1f1',
    pinkGradientOne: '#FDF0F3',
    pinkGradientTwo: '#FFFBFC',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    black: '#000',
    white: '#fff',
    backgroundScreen: '#f1f1f1',
    pinkGradientOne: '#FDF0F3',
    pinkGradientTwo: '#FFFBFC',
  },
} as const // Utilisation de `as const` pour figer les valeurs et types des couleurs

export type Theme = keyof typeof Colors // Type représentant les clés (thèmes) de l'objet Colors
export type ThemeColors = typeof Colors.light | typeof Colors.dark // Type représentant les palettes de couleurs pour les thèmes clair et sombre
