import Summary from './components/summary'
import Cash from './components/cash'
import style from './style.module.scss'

export default function Home() {
  return (
    <div className={style.container}>
      <Cash />
      <Summary />
    </div>
  )
}
