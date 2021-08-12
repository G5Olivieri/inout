import style from './style.module.scss'
import SummaryListItem from '../summary-item'
import { Summary } from '../summary'

type SummaryListProps = {
  summaryList: Array<Summary>
}

// TODO: remove default and change to const
export default function SummaryList({ summaryList }: SummaryListProps) {
  return (
    <ul className={style.summaryList}>
      {summaryList.map((s, i) => <SummaryListItem summary={s} key={i} />)}
    </ul>
  )
}
