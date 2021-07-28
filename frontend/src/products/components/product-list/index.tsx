import style from './style.module.scss'
import ProductListItem from '../product-list-item'
import { Product } from '../../../services/products'

type ProductListProps = {
  products: Array<Product>
  onClickProduct: (product: Product) => Promise<void> | void
}

export const ProductList: React.FC<ProductListProps> = ({products, onClickProduct}) => {
  return (
    <ul className={style.productList}>
      {products.map(p => <ProductListItem product={p} key={p.id} onClick={onClickProduct} />)}
    </ul>
  )
}
