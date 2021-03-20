export interface Internacionalization {
  getDateTimeLocale(): Locale
  getLanguage(): string
  formatCurrency(number: number): string
  formatDate(date: Date): string
}
