import { useState } from 'react'
// TODO: use service
import { Sale, Product } from '../../sale'
import style from './style.module.scss'

type ProductSaleProps = {
  product: Product
}

const ProductSale: React.FC<ProductSaleProps> = ({ product }) => {
  return (
    <li>
      <span>{product.name} ({product.quantity}x)</span>
      <span>
        {/* TODO: move this to currency service */}
        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.amount / 100)}
      </span>
    </li>
  )
}

type SaleListItemProps = {
  sale: Sale
}

// TODO: remove default and change to const
export default function SaleListItem({ sale }: SaleListItemProps) {
  const [colapse, setColapse] = useState(true)

  const onClickMore = () => {
    if (sale.products.length > 3) {
      setColapse(!colapse)
    }
  }

  return (
    <li className={style.saleListItem}>
      <header>
        <h2>7 Abril, 2021</h2>
      </header>
      <main>
        <ul className={colapse ? style.colapse : style.expand}>
          {sale.products.map((p, i) => <ProductSale product={p} key={i} />)}
        </ul>
      </main>
      <footer onClick={onClickMore}>
        <label>Total</label>
        {
          sale.products.length > 3 &&
          <svg className={`${style.expandIcon} ${!colapse ? style.expand : ''}`} height="32" viewBox="0 0 48 48" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z" /><path d="M0 0h48v48h-48z" fill="none" /></svg>
        }
        <span>
          {/* TODO: move this to currency service */}
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(sale.total / 100)}
        </span>
      </footer>
    </li>
  )
}
