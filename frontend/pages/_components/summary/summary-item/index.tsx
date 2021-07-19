import { Summary } from '../summary'
import { Transaction } from '../transation'
import style from './style.module.scss'

type SummaryListItemProps = {
  summary: Summary
}

type SummaryTransactionsProps = {
  transactions: Array<Transaction>
}

type SummaryTransactionProps = {
  transaction: Transaction
}

const SummaryTransaction: React.FC<SummaryTransactionProps> = ({ transaction }) => {
  return (
        <li>
          <span className={style.name}>{transaction.productName} ({transaction.quantity}x)</span>
          <span className={style[transaction.type]}>
            {/* TODO: move this to currency service */}
            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(transaction.amount / 100)}
          </span>
        </li>
  )
}
const SummaryTransactions: React.FC<SummaryTransactionsProps> = ({ transactions }) => {
  return (
      <ul className={style.latest}>
        {transactions.map((t, i) => <SummaryTransaction transaction={t} key={i} />)}
      </ul>
  )
}

// TODO: remove default and change to const
export default function SummaryListItem({ summary }: SummaryListItemProps) {
  return (
    <li className={style.summaryListItem}>
      <div className={style.date}>
        <span>{summary.day}</span>
        {/* TODO: move this to currency service */}
        <span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(summary.total / 100)}</span>
      </div>
      <SummaryTransactions transactions={summary.transactions} />
    </li>
  )
}
