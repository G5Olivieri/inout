export const getDefaultCurrency = () => 'BRL'

interface Options {
  language: string
  currency: string
}

export const formatCurrency = (
  number: number,
  { language, currency }: Options,
): string => {
  return new Intl.NumberFormat(language, { style: 'currency', currency }).format(number)
}
