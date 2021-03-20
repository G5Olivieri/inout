import { InternacionalizationContext } from '@app/ui/internacionalizations/internacionalization-context'
import { useInternacionalization } from '@app/ui/internacionalizations/use-internacionalization'
import { TranslationProvider } from '@app/ui/internacionalizations/translations/translation-provider'

export const InternacionalizationProvider: React.FC = ({
  children,
}): JSX.Element => {
  const internacionalization = useInternacionalization()
  return (
    <InternacionalizationContext.Provider value={internacionalization}>
      <TranslationProvider>{children}</TranslationProvider>
    </InternacionalizationContext.Provider>
  )
}
