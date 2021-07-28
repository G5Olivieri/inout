import style from './style.module.scss'

import SaleList from './components/sale-list'
// TODO: use service
import { Product, Sale } from './sale'

export default function Sales() {
  // TODO: fetch this list from API
  const sales = [
    new Sale(
      [
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
      ]
    ),
    new Sale(
      [
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
      ]
    ),
  ]

  return (
  <div className={style.container}>
    <SaleList sales={sales} />
  </div>
  )
}
