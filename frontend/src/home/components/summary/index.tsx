import style from './style.module.scss'
import SummaryList from './summary-list'
import { Summary as SummaryType } from './summary'
import { Transaction, TransactionType } from './transation'

export default function Summary() {
  // TODO: fetch this list from API
  const summary = [
    new SummaryType(
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
    new SummaryType(
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
