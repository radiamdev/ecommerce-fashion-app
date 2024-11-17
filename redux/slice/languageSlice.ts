import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Interface décrivant l'état relatif à la langue dans Redux
interface LanguageState {
  [x: string]: any
  locale: string // Type de la locale actuelle (par exemple, "fr" pour français)
}

// État initial de la slice de langue
const initialState: LanguageState = {
  locale: 'en', // Locale par défaut
}

// Création d'une slice Redux pour gérer la langue de l'application
const languageSlice = createSlice({
  name: 'language', // Nom de la slice
  initialState, // État initial de la slice
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      state.locale = action.payload // Reducer pour changer la locale en fonction de l'action dispatchée
    },
  },
})

// Exportation des actions et du reducer de la slice de langue
export const { changeLanguage } = languageSlice.actions // Action changeLanguage pour changer la langue
export default languageSlice.reducer // Reducer par défaut de la slice de langue