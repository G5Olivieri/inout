import {
  InternacionalizationContext
} from "@app/internacionalizations/internacionalization-context"
import {
  useInternacionalization
} from "@app/internacionalizations/use-internacionalization"
import {
  TranslationProvider
} from '@app/internacionalizations/translations/translation-provider';

export const InternacionalizationProvider: React.FC =
  ({ children }): JSX.Element => {
  const internacionalization = useInternacionalization()
  return (
    <InternacionalizationContext.Provider value={internacionalization}>
      <TranslationProvider>
        {children}
      </TranslationProvider>
    </InternacionalizationContext.Provider>
  )
}
