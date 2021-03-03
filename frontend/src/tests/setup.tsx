import React, { ReactElement } from 'react'
import i18n from 'i18next'
import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { Internacionalization } from '@app/internacionalizations/internacionalization'
import { InternacionalizationContext } from '@app/internacionalizations/internacionalization-context'
import { RenderOptions } from '@testing-library/react'
import { render, RenderResult } from '@testing-library/react'

class TestInternacionalization implements Internacionalization {
  public getDateTimeLocale(): Locale {
    return enUS
  }

  public getLanguage(): string {
    return 'en-US'
  }

  public formatCurrency(number: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number)
  }

  public formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd')
  }
}

i18n.use(initReactI18next).init({
  lng: 'en',
  resources: {},
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
})

export const AllTheProviders: React.FC = ({ children }) => {
  const history = createMemoryHistory()
  const internacionalization = new TestInternacionalization()
  return (
    <Router history={history}>
      <InternacionalizationContext.Provider value={internacionalization}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
      </InternacionalizationContext.Provider>
    </Router>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
