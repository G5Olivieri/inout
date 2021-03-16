import React from 'react'
import { fireEvent, render } from '@app/tests/setup'
import { Expenses } from '@app/pages/expenses'
import '@testing-library/jest-dom/extend-expect'

test('should not render form', async () => {
  const result = render(<Expenses />)
  const addButton = result.getByRole('button')
  const list = result.queryByRole('list')
  expect(addButton).toHaveTextContent('add')
  expect(result.queryByRole('form')).not.toBeInTheDocument()
  expect(list).not.toBeInTheDocument()
})

test('should render form', async () => {
  const result = render(<Expenses />)
  const addButton = result.getByRole('button')
  const list = result.queryByRole('list')
  fireEvent.click(addButton)

  const form = result.container.querySelector('form')

  expect(addButton).toHaveTextContent('add')
  expect(form).toBeInTheDocument()
  expect(list).not.toBeInTheDocument()
})

test('should add transaction in list', async () => {
  const result = render(<Expenses />)
  const addButton = result.getByRole('button')

  fireEvent.click(addButton)

  const form = result.container.querySelector('form')
  const list = result.getByRole('list')

  expect(addButton).toHaveTextContent('add')
  expect(form).toBeInTheDocument()
  expect(list).toBeInTheDocument()
})
