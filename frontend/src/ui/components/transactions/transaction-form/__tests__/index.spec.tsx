import React from 'react'
import { render, fireEvent } from '@app/tests/setup'
import { TransactionForm } from '@app/ui/components/transactions/transaction-form'
import '@testing-library/jest-dom/extend-expect'

const onSaveTransaction = jest.fn()

type ResultRenderTransaction = {
  valueInput: HTMLElement
  descriptionInput: HTMLElement
  dateInput: HTMLElement
  button: HTMLElement
}

const renderTransactionForm = (): ResultRenderTransaction => {
  const result = render(
    <TransactionForm onSaveTransaction={onSaveTransaction} />
  )
  const valueInput = result.getByLabelText('input amount in cents:')
  const descriptionInput = result.getByLabelText('input description:')
  const dateInput = result.getByLabelText('input date:')
  const button = result.getByRole('button')
  return {
    valueInput,
    descriptionInput,
    dateInput,
    button,
  }
}

describe('Component - TransactionForm', () => {
  beforeEach(() => {
    onSaveTransaction.mockReset()
  })

  test('should render form', async () => {
    const result = render(
      <TransactionForm onSaveTransaction={onSaveTransaction} />
    )

    expect(result.getByRole('form')).toBeInTheDocument()
  })

  test('should call onSaveTransaction', async () => {
    const {
      valueInput,
      descriptionInput,
      dateInput,
      button,
    } = renderTransactionForm()

    fireEvent.change(valueInput, { target: { value: '400' } })
    fireEvent.change(descriptionInput, { target: { value: 'Description' } })
    fireEvent.change(dateInput, { target: { value: '2010-10-22' } })
    fireEvent.click(button)

    expect(onSaveTransaction).toHaveBeenNthCalledWith(1, {
      value: 400,
      description: 'Description',
      date: new Date('2010-10-22'),
    })
  })

  test('should not call onSaveTransaction when value is empty', async () => {
    const {
      valueInput,
      descriptionInput,
      dateInput,
      button,
    } = renderTransactionForm()

    fireEvent.change(valueInput, { target: { value: '' } })
    fireEvent.change(descriptionInput, { target: { value: 'Description' } })
    fireEvent.change(dateInput, { target: { value: '2010-10-22' } })
    fireEvent.click(button)

    expect(onSaveTransaction).not.toHaveBeenCalled()
  })

  // eslint-disable-next-line max-len
  test('should not call onSaveTransaction when description is empty', async () => {
    const {
      valueInput,
      descriptionInput,
      dateInput,
      button,
    } = renderTransactionForm()

    fireEvent.change(valueInput, { target: { value: '400' } })
    fireEvent.change(descriptionInput, { target: { value: '' } })
    fireEvent.change(dateInput, { target: { value: '2010-10-22' } })
    fireEvent.click(button)

    expect(onSaveTransaction).not.toHaveBeenCalled()
  })
})
