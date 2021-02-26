export const getDefaultLanguage = (): string => 'pt-BR'

export const getBrowserLanguage = (): string =>
  navigator.language || getDefaultLanguage()
