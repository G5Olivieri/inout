import style from './style.module.scss'
import { SaleListItem } from '../sale-list-item'
import { Sale } from '../../../services/sales'

type SaleListProps = {
  sales: Array<Sale>
}

// TODO: remove default and change to const
export default function SaleList({ sales }: SaleListProps) {
  return (
    <ul className={style.saleList}>
      {sales.map((s, i) => <SaleListItem sale={s} key={i} />)}
    </ul>
  )
}
