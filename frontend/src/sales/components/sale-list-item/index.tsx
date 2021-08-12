import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { Sale, SaleProduct } from '../../../services/sales'
import style from './style.module.scss'

type ProductSaleProps = {
  product: SaleProduct
}

const ProductSale: React.FC<ProductSaleProps> = ({ product }) => {
  return (
    <li>
      <span>{product.name} ({product.quantity}x)</span>
      <span>
        {/* TODO: move this to currency service */}
        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / 100)}
      </span>
    </li>
  )
}

type SaleListItemProps = {
  sale: Sale
}

export const SaleListItem: React.FC<SaleListItemProps> = ({ sale }) => {
  const [colapse, setColapse] = useState(true)
  const total = sale.products.reduce((acc, cur) => acc + cur.price * cur.quantity, 0)

  const onClickMore = () => {
    if (sale.products.length > 3) {
      setColapse(!colapse)
    }
  }

  return (
    <li className={style.saleListItem}>
      <header>
        <h2>{format(new Date(sale.date), 'PP', { locale: ptBR })}</h2>
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
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total / 100)}
        </span>
      </footer>
    </li>
  )
}
