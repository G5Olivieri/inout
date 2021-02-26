import React from 'react'
import { NavigationMenu } from '@app/components/navigation-menu'
import { render, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { Router } from 'react-router-dom'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () =>
          new Promise(() => {
            /* empty */
          }),
      },
    }
  },
}))

test('should have links to pages', async () => {
  const history = createMemoryHistory()
  render(
    <Router history={history}>
      <NavigationMenu />
    </Router>
  )

  const links = screen.getAllByRole('link')
  expect(links[0]).toHaveTextContent('Home screen')
  expect(links[0]).toHaveAttribute('href', '/')

  expect(links[1]).toHaveTextContent('Expense_plural')
  expect(links[1]).toHaveAttribute('href', '/expenses')

  expect(links[2]).toHaveTextContent('Revenue_plural')
  expect(links[2]).toHaveAttribute('href', '/revenues')
})
