import { NextRouter, useRouter } from "next/dist/client/router";
import Head from 'next/head';
import { deleteProduct, UpdateProduct, updateProduct, useProduct } from '../../../services/products';
import NavigationBar from '../../_components/navigation-bar';
import { NavigationBarPages } from '../../_components/navigation-bar/navigation-pages';
import style from './style.module.scss';
import { EditProductForm } from './_components/edit-product-form';

const getPathId = (router: NextRouter): number => {
  const { id } = router.query
  if (!id) {
    throw new Error('ID is missing')
  }
  if(Array.isArray(id)) {
    return parseInt(id[0])
  }
  else if (typeof id === 'string') {
    return parseInt(id)
  }

  throw new Error('Invalid type to ID')
}

export default function EditProduct() {
  const router = useRouter()
  const id = getPathId(router)
  const { product, error } = useProduct(id)

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
      <Head>
        <title>Editar produto</title>
      </Head>

      <EditProductForm onDelete={onDelete} onUpdate={onUpdateProduct} product={product}/>
      <NavigationBar activePage={NavigationBarPages.products}/>
    </div>
  )
}
