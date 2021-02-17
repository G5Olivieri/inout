import {
  formatCurrency,
  getDefaultCurrency
} from "@app/internacionalizations/currency"
import {
  getDateTimeLocaleFromLanguage
} from "@app/internacionalizations/datetime"
import {
  Internacionalization
} from "@app/internacionalizations/internacionalization"
import { getBrowserLanguage } from "@app/internacionalizations/language"

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
}
