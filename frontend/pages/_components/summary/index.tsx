import style from './style.module.scss'
import SummaryList from './summary-list'
import { Summary } from './summary'
import { Transaction, TransactionType } from './transation'

export default function SummaryPage() {
  // TODO: fetch this list from API
  const summary = [
    new Summary(
      'Hoje',
      100_00,
      [
        new Transaction(
          TransactionType.IN,
          1500,
          'Zomo de Morango',
          1
        ),
        new Transaction(
          TransactionType.IN,
          1500,
          'Zomo de Morango',
          1
        ),
        new Transaction(
          TransactionType.OUT,
          1500,
          'Carvão',
          10
        ),
      ]
    ),
    new Summary(
      'Ontem',
      150_00,
      [
        new Transaction(
          TransactionType.IN,
          1500,
          'Zomo de Morango',
          1
        ),
        new Transaction(
          TransactionType.IN,
          1500,
          'Zomo de Morango',
          1
        ),
        new Transaction(
          TransactionType.OUT,
          1500,
          'Carvão',
          10
        ),
      ]
    ),
  ]
  return (
      <div className={style.summary}>
        <SummaryList summaryList={summary} />
      </div>
  )
}
