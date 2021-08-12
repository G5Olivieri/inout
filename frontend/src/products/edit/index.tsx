import { useHistory, useParams } from 'react-router';
import { deleteProduct, UpdateProduct, updateProduct, useProduct } from '../../services/products';
import { EditProductForm } from './components/edit-product-form';
import style from './style.module.scss';

type PathParams = {
  id: string
}

export default function EditProduct() {
  const router = useHistory()
  const { id } = useParams<PathParams>()
  // TODO: check if id is number
  const { product, error } = useProduct(parseInt(id))

  if (error) return <div>failed to load</div>
  if (!product) return <div>loading...</div>

  const onUpdateProduct = (id: number, product: UpdateProduct) => {
    updateProduct(id, product).then(() => {
      router.push("/products")
    })
  }

  const onDelete = () => {
    deleteProduct(product.id).then(() => {
      router.push("/products")
    })
  }

  return (
    <div className={style.container}>
      <EditProductForm onDelete={onDelete} onUpdate={onUpdateProduct} product={product}/>
    </div>
  )
}
