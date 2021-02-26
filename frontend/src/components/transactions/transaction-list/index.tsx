import { Transaction } from '@app/components/transactions/transaction'
import { TransactionListItem } from '@app/components/transactions/transaction-list/transaction-list-item'

interface TransactionListProps {
  transactions: Transaction[]
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
}): JSX.Element => (
  <ul>
    {transactions.map((t, i) => (
      <TransactionListItem key={i} transaction={t} />
    ))}
  </ul>
)
