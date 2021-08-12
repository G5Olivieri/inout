import style from './style.module.scss'
import ProductListItem from '../product-list-item'
import { Product } from '../../../services/products'
import { ChangeEvent, useState } from 'react'

type ProductListProps = {
  products: Array<Product>
  onClickProduct: (product: Product) => Promise<void> | void
  onSearchChange: (search: string) => void
}

export const ProductList: React.FC<ProductListProps> = ({products, onClickProduct, onSearchChange}) => {
  const [search, setSearch] = useState('')

  const onSearchChangeWrapper = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearch(value)
    onSearchChange(value)
  }

  return (
    <div className={style.container}>
      <div className={style.searchInput}>
        <input type="text" onChange={onSearchChangeWrapper} value={search} placeholder="Buscar..." />
      </div>
      <ul className={style.productList}>
        {products.map(p => <ProductListItem product={p} key={p.id} onClick={onClickProduct} />)}
      </ul>
    </div>
  )
}
