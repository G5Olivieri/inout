import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import style from './style.module.scss'
import NewProductForm from './_components/new-product-form'
import NavigationBar from '../../_components/navigation-bar'
import { NavigationBarPages } from '../../_components/navigation-bar/navigation-pages'
import { CreateProduct, createProduct } from '../../../services/products'

export default function NewProduct() {
  const router = useRouter()
  const onNewProduct = (product: CreateProduct) => {
    createProduct(product).then(() => router.push("/products"))
  }

  return (
    <div className={style.container}>
      <Head>
        <title>Novo Produtos</title>
      </Head>

      <NewProductForm onSubmit={onNewProduct}/>
      <NavigationBar activePage={NavigationBarPages.products}/>
    </div>
  )
}
