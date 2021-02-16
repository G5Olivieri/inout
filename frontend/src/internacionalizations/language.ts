export const getDefaultLanguage = () => "pt-BR"

export const getBrowserLanguage = () => navigator.language || getDefaultLanguage()
