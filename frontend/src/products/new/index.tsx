import { useHistory } from 'react-router'
import style from './style.module.scss'
import NewProductForm from './components/new-product-form'
import { CreateProduct, createProduct } from '../../services/products'

export default function NewProduct() {
  const router = useHistory()
  const onNewProduct = (product: CreateProduct) => {
    createProduct(product).then(() => router.push("/products"))
  }

  return (
    <div className={style.container}>
      <NewProductForm onSubmit={onNewProduct}/>
    </div>
  )
}
