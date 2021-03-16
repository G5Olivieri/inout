import React from 'react'
import { render, screen } from '@app/tests/setup'
import { TransactionList } from '@app/components/transactions/transaction-list'
import '@testing-library/jest-dom/extend-expect'
import { Transaction } from '@app/components/transactions/transaction'
import { createTransactions } from '@app/tests/create-transaction'

test('should call transaction-list-item to each transaction', async () => {
  const transactions: Array<Transaction> = createTransactions()
  render(<TransactionList transactions={transactions} />)
  const list = await screen.getByRole('list')
  expect(list.children.length).toEqual(transactions.length)
})

test('should be empty', async () => {
  const transactions: Array<Transaction> = []
  render(<TransactionList transactions={transactions} />)
  const list = await screen.queryByRole('list')
  expect(list).not.toBeInTheDocument()
})
