import { ThemeColors } from '@/constants/Colors'
import { RootState } from '@/redux/store'
import { useSelector } from 'react-redux'

const useThemeColor = (colorKey: keyof ThemeColors) => {
  // Définit le hook useThemeColor avec un paramètre colorKey de type keyof ThemeColors
  const theme = useSelector((state: RootState) => state.theme.theme) // Sélectionne le thème actuel depuis l'état global Redux
  const colors = useSelector((state: RootState) => state.theme.colors) // Sélectionne les couleurs définies depuis l'état global Redux

  // Retourne la couleur spécifique en fonction du thème actuel et de la clé de couleur (colorKey)
  return colors[theme][colorKey]
}

export default useThemeColor