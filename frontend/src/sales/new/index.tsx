import { useProducts } from '../../services/products'
import style from './style.module.scss'
import { NewSaleForm } from './components/new-sale-form'


export default function NewSale() {
  // TODO: move this request to service layer
  const { products, error } = useProducts()

  if (error) return <div>failed to load</div>
  if (!products) return <div>loading...</div>

  return (
    <div className={style.container}>
      <NewSaleForm products={products} />
    </div>
  )
}
