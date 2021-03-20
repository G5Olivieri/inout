import React from 'react'
import { fireEvent, render } from '@app/tests/setup'
import { Expenses } from '@app/ui/pages/expenses'
import '@testing-library/jest-dom/extend-expect'

describe('Page - Expenses', () => {
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

    const form = await result.findByRole('form')

    const [descriptionInput, valueInput, dateInput] = Array.from(
      form.querySelectorAll('input')
    )
    const button = form.querySelector('button') as HTMLButtonElement

    fireEvent.change(valueInput, { target: { value: '400' } })
    fireEvent.change(descriptionInput, { target: { value: 'Description' } })
    fireEvent.change(dateInput, { target: { value: '2010-10-22' } })
    fireEvent.click(button)

    const list = await result.findByRole('list')

    expect(form).not.toBeInTheDocument()
    expect(addButton).toHaveTextContent('add')
    expect(list).toBeInTheDocument()
    expect(list.children).toHaveLength(1)
  })
})
