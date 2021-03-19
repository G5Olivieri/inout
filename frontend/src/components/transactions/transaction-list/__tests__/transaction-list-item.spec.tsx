import React from 'react'
import { render, screen } from '@app/tests/setup'
import { TransactionListItem } from '@app/components/transactions/transaction-list/transaction-list-item'
import '@testing-library/jest-dom/extend-expect'
import { createTransaction } from '@app/tests/create-transaction'
import format from 'date-fns/format'

describe('Component - TransactionListItem', () => {
  test('should render transaction', async () => {
    const transaction = createTransaction()
    render(<TransactionListItem transaction={transaction} />)
    const item = await screen.getByRole('listitem')
    expect(item).toHaveTextContent(
      `${transaction.description}: $${transaction.value / 100} - ${format(
        transaction.date,
        'yyyy-MM-dd'
      )}`
    )
  })
})
