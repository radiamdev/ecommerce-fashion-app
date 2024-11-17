import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { I18n } from 'i18n-js'

const useTranslate = (test: Record<string, any>) => {
  const i18n = new I18n(test) // Initialise i18n avec les fichiers de traduction (test)

  const locale = useSelector((state: RootState) => state.language.locale) // Sélectionne la langue depuis Redux

  i18n.locale = locale // Met à jour la langue lorsque la locale change

  const translate = (key: string) => {
    return i18n.t(key) // Fonction de traduction qui utilise i18n-js pour traduire la clé donnée
  }

  return translate // Retourne la fonction de traduction
}

export default useTranslate
