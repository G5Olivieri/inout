import { I18nextProvider } from 'react-i18next'
import i18n from '@app/ui/internacionalizations/translations/i18n'
import { useInternacionalization } from '@app/ui/internacionalizations/use-internacionalization'

export const TranslationProvider: React.FC = ({ children }): JSX.Element => {
  const internacionalization = useInternacionalization()
  i18n.changeLanguage(internacionalization.getLanguage())
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
