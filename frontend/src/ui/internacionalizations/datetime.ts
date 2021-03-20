import { ptBR } from 'date-fns/locale'

const locales: Record<string, Locale> = {
  'pt-BR': ptBR,
}

export const getDefaultDateTimeLocale = (): Locale => locales['pt-BR']

export const getDateTimeLocaleFromLanguage = (language: string): Locale =>
  locales[language] || getDefaultDateTimeLocale()

export const getDateFormat = (language: string): string => {
  const dateFormats: Record<string, string> = {
    'pt-BR': 'dd/MM/yyyy',
  }
  return dateFormats[language]
}
