import { useHistory } from 'react-router-dom'
import { Product, useProducts } from '../services/products'
import style from './style.module.scss'
import { ProductList } from './components/product-list'

export default function Products() {
  const router = useHistory()
  const { products, error } = useProducts()

  if (error) return <div>failed to load</div>
  if (!products) return <div>loading...</div>

  const onClickProduct = (product: Product) => {
    router.push(`/products/edit/${product.id}`)
  }

  return (
    <div className={style.container}>
      <ProductList onClickProduct={onClickProduct} products={products}/>
    </div>
  )
}
