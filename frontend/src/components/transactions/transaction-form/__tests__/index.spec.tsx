import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TransactionForm } from '@app/components/transactions/transaction-form'
import { Transaction } from '@app/components/transactions/transaction'
import '@testing-library/jest-dom/extend-expect'

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

test('should call onSaveTransaction', async () => {
  let wasCalled = false
  let transaction: Transaction = {
    value: 0,
    description: '',
    date: new Date(),
  }
  const onSaveTransaction = (t: Transaction) => {
    wasCalled = true
    transaction = t
  }
  render(<TransactionForm onSaveTransaction={onSaveTransaction} />)

  const valueInput = await screen.getByLabelText('value in cents')
  const descriptionInput = await screen.getByLabelText('description')
  const dateInput = await screen.getByLabelText('date')
  const button = await screen.getByRole('button')

  fireEvent.change(valueInput, { target: { value: '400' } })
  fireEvent.change(descriptionInput, { target: { value: 'Description' } })
  fireEvent.change(dateInput, { target: { value: '2010-10-22' } })
  fireEvent.click(button)

  expect(wasCalled).toBeTruthy()
  expect(transaction).toEqual({
    value: 400,
    description: 'Description',
    date: new Date('2010-10-22'),
  })
})

test('should not call onSaveTransaction when value is empty', async () => {
  let wasCalled = false
  let transaction: Transaction = {
    value: 0,
    description: '',
    date: new Date('2011-03-20'),
  }
  const onSaveTransaction = (t: Transaction) => {
    wasCalled = true
    transaction = t
  }
  render(<TransactionForm onSaveTransaction={onSaveTransaction} />)

  const valueInput = await screen.getByLabelText('value in cents')
  const descriptionInput = await screen.getByLabelText('description')
  const dateInput = await screen.getByLabelText('date')
  const button = await screen.getByRole('button')

  fireEvent.change(valueInput, { target: { value: '' } })
  fireEvent.change(descriptionInput, { target: { value: 'Description' } })
  fireEvent.change(dateInput, { target: { value: '2010-10-22' } })
  fireEvent.click(button)

  expect(wasCalled).toBeFalsy()
  expect(transaction).toEqual({
    value: 0,
    description: '',
    date: new Date('2011-03-20'),
  })
})

// eslint-disable-next-line max-len
test('should not call onSaveTransaction when description is empty', async () => {
  let wasCalled = false
  let transaction: Transaction = {
    value: 0,
    description: '',
    date: new Date('2011-03-20'),
  }
  const onSaveTransaction = (t: Transaction) => {
    wasCalled = true
    transaction = t
  }
  render(<TransactionForm onSaveTransaction={onSaveTransaction} />)

  const valueInput = await screen.getByLabelText('value in cents')
  const descriptionInput = await screen.getByLabelText('description')
  const dateInput = await screen.getByLabelText('date')
  const button = await screen.getByRole('button')

  fireEvent.change(valueInput, { target: { value: '400' } })
  fireEvent.change(descriptionInput, { target: { value: '' } })
  fireEvent.change(dateInput, { target: { value: '2010-10-22' } })
  fireEvent.click(button)

  expect(wasCalled).toBeFalsy()
  expect(transaction).toEqual({
    value: 0,
    description: '',
    date: new Date('2011-03-20'),
  })
})
