import { Colors, Theme } from '@/constants/Colors'
import { createSlice } from '@reduxjs/toolkit'

// Interface décrivant l'état du thème dans Redux
interface InterfaceThemeState {
  theme: Theme // Type du thème (light ou dark)
  colors: typeof Colors // Type des couleurs définies dans l'application
}

// Détermine le thème par défaut en fonction du schéma de couleur du dispositif
const defaultTheme: Theme = 'light'

// Appearance.getColorScheme() === "dark" ? "dark" : "light"

// État initial de la slice du thème
const initialState: InterfaceThemeState = {
  theme: defaultTheme, // Thème initial déterminé par le schéma de couleur du dispositif
  colors: Colors, // Utilisation des couleurs définies dans le fichier Colors.ts
}

// Création d'une slice Redux pour gérer le thème de l'application
const themeSlice = createSlice({
  name: 'theme', // Nom de la slice
  initialState, // État initial de la slice
  reducers: {
    changeTheme: (state, action) => {
      state.theme = action.payload // Reducer pour changer le thème en fonction de l'action dispatchée
    },
  },
})

// Exportation des actions et du reducer de la slice du thème
export const { changeTheme } = themeSlice.actions
export default themeSlice.reducer
