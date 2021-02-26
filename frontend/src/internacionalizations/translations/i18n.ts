import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import resources from '@app/internacionalizations/translations/resources'

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
})

export default i18n
