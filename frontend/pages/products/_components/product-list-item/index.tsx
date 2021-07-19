import Image from 'next/image'
import { Product } from '../../../../services/products'
import style from './style.module.scss'

type ProductListItemProps = {
  product: Product
  onClick: (product: Product) => Promise<void> | void
}

// TODO: remove default and change to const
export default function ProductListItem(props: ProductListItemProps) {
  // TODO: add or remove product image
  return (
    <li className={style.productListItem} onClick={() => props.onClick(props.product)}>
      <div className={style.image}>
        <Image src="/zomo-uva.png" alt="Zomo de Uva" width="45" height="45" />
      </div>
      <h3 className={style.name}>{props.product.name}</h3>
      {/* TODO: move this to currency service */}
      <div className={style.price}>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(props.product.price / 100)}</div>
      <label className={style.quantity}>Qtd</label>
      <div className={style.quantityValue}>{props.product.quantity}</div>
    </li>
  )
}
