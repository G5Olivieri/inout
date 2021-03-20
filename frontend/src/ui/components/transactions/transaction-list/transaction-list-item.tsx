import React from 'react'
import { Transaction } from '@app/domain/transactions/transaction'
import { useInternacionalization } from '@app/ui/internacionalizations/use-internacionalization'

interface TransactionListItemProps {
  transaction: Transaction
}

export const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
}): JSX.Element => {
  const i18n = useInternacionalization()
  return (
    <li>
      {transaction.description}:&#160;
      {i18n.formatCurrency(transaction.value / 100)} -&#160;
      {i18n.formatDate(transaction.date)}
    </li>
  )
}
