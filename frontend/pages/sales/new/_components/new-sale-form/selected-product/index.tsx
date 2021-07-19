import { Product } from "../../../../../../services/products"
import { Counter } from "../counter"
import style from './style.module.scss'

type SelectedProductProps = {
  product: Product
  onRemove: () => Promise<void> | void
  onQuantityChange: (value: number, product: Product) => Promise<void> | void
  maxQuantity: number
}

export const SelectedProduct: React.FC<SelectedProductProps> = ({ product, onRemove, onQuantityChange, maxQuantity }) => {
  return (
    <li className={style.container}>
      <h3 className={style.name}>{product.name}</h3>
      {/* TODO: move this to service */}
      <span className={style.price}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(product.price / 100)}</span>
      <Counter
        className={style.quantity}
        max={maxQuantity}
        min={1}
        defaultValue={product.quantity}
        onChange={(value) => onQuantityChange(value, product)}
      />
      <button className={style.removeButton} type="button" onClick={onRemove}>X</button>
    </li>
  )
}
