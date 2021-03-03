import React from 'react'
import { NavigationMenu } from '@app/components/navigation-menu'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@app/tests/setup'

test('should have links to pages', async () => {
  render(<NavigationMenu />)

  const links = screen.getAllByRole('link')
  expect(links[0]).toHaveTextContent('Home screen')
  expect(links[0]).toHaveAttribute('href', '/')

  expect(links[1]).toHaveTextContent('Expense_plural')
  expect(links[1]).toHaveAttribute('href', '/expenses')

  expect(links[2]).toHaveTextContent('Revenue_plural')
  expect(links[2]).toHaveAttribute('href', '/revenues')
})
