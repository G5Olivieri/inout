import style from './style.module.scss'
import PurchaseListItem from '../purchase-list-item'

// TODO: remove default and change to const
export default function PurchaseList() {
  return (
    <ul className={style.purchaseList}>
      <PurchaseListItem />
      <PurchaseListItem />
      <PurchaseListItem />
      <PurchaseListItem />
      <PurchaseListItem />
      <PurchaseListItem />
      <PurchaseListItem />
    </ul>
  )
}
