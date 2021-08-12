import style from './style.module.scss'
import SummaryList from './summary-list'

// TODO: fetch summary data from API
// TODO: change to const and remove default
export default function Summary() {
  return (
      <div className={style.summary}>
        <SummaryList summaryList={[]} />
      </div>
  )
}
