import style from './style.module.scss'

import SaleList from './components/sale-list'
import { useSales } from '../services/sales'

export default function Sales() {
  const { sales, error } = useSales()

  if (error) {
    console.error(error)
    return <div>failed to load</div>
  }
  if (!sales) return <div>loading...</div>

  return (
  <div className={style.container}>
    <SaleList sales={sales} />
  </div>
  )
}
