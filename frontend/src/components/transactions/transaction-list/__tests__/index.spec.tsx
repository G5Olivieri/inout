import React from 'react'
import { render } from '@app/tests/setup'
import { TransactionList } from '@app/components/transactions/transaction-list'
import '@testing-library/jest-dom/extend-expect'
import { Transaction } from '@app/core/transactions/transaction'
import { createTransactions } from '@app/tests/create-transaction'

describe('Component - TransactionList', () => {
  test('should call transaction-list-item to each transaction', async () => {
    const transactions: Array<Transaction> = createTransactions()
    const result = render(<TransactionList transactions={transactions} />)
    const list = result.getByRole('list')
    expect(list.children.length).toEqual(transactions.length)
  })

  test('should be empty', async () => {
    const transactions: Array<Transaction> = []
    const result = render(<TransactionList transactions={transactions} />)
    const list = result.queryByRole('list')
    expect(list).not.toBeInTheDocument()
  })
})
