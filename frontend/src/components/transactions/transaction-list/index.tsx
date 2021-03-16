import React from 'react'
import { Transaction } from '@app/components/transactions/transaction'
import { TransactionListItem } from '@app/components/transactions/transaction-list/transaction-list-item'

interface TransactionListProps {
  transactions: Transaction[]
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}): JSX.Element => {
  if (transactions.length === 0) return <></>
  return (
    <ul>
      {transactions.map((t, i) => (
        <TransactionListItem key={i} transaction={t} />
      ))}
    </ul>
  )
}
