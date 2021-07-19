import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { Product, useProducts } from '../../services/products'
import NavigationBar from '../_components/navigation-bar'
import { NavigationBarPages } from '../_components/navigation-bar/navigation-pages'
import style from './style.module.scss'
import { ProductList } from './_components/product-list'

export default function Products() {
  const router = useRouter()
  const { products, error } = useProducts()

  if (error) return <div>failed to load</div>
  if (!products) return <div>loading...</div>

  const onClickProduct = (product: Product) => {
    router.push(`/products/edit/${product.id}`)
  }

  return (
    <div className={style.container}>
      <Head>
        <title>Produtos</title>
      </Head>

      <ProductList onClickProduct={onClickProduct} products={products}/>
      <NavigationBar activePage={NavigationBarPages.products} />
    </div>
  )
}
