import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '@/redux/slice/themeSlice'
import languageReducer from '@/redux/slice/languageSlice'

// Création du store Redux avec la configuration des reducers
export const store = configureStore({
  reducer: {
    theme: themeReducer, // Gère l'état relatif au thème de l'application
    language: languageReducer, // Gère l'état relatif au système de langue de l'application
  },
})

// Déduction automatique des types RootState et AppDispatch à partir du store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch