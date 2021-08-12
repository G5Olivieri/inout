// import Summary from './components/summary'
import { useCash } from '../services/cash'
import { Cash } from './components/cash'
import style from './style.module.scss'

export default function Home() {
  const { cash, error } = useCash()

  if (error) {
    console.error(error)
    return <div>failed to load</div>
  }
  if (!cash) return <div>loading...</div>

  return (
    <div className={style.container}>
      <Cash amount={cash.amount} />
      {/* <Summary /> */}
    </div>
  )
}
