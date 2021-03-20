import { format } from 'date-fns'
import {
  formatCurrency,
  getDefaultCurrency,
} from '@app/ui/internacionalizations/currency'
import {
  getDateFormat,
  getDateTimeLocaleFromLanguage,
} from '@app/ui/internacionalizations/datetime'
import { Internacionalization } from '@app/ui/internacionalizations/internacionalization'
import { getBrowserLanguage } from '@app/ui/internacionalizations/language'

export class DefaultInternacionalization implements Internacionalization {
  public getDateTimeLocale(): Locale {
    return getDateTimeLocaleFromLanguage(this.getLanguage())
  }

  public getLanguage(): string {
    return getBrowserLanguage()
  }

  public formatCurrency(number: number): string {
    return formatCurrency(number, {
      language: this.getLanguage(),
      currency: getDefaultCurrency(),
    })
  }

  public formatDate(date: Date): string {
    return format(date, getDateFormat(this.getLanguage()))
  }
}
