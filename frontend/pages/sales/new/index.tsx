import Head from 'next/head'
import { useProducts } from '../../../services/products'
import NavigationBar from '../../_components/navigation-bar'
import { NavigationBarPages } from '../../_components/navigation-bar/navigation-pages'
import style from './style.module.scss'
import { NewSaleForm } from './_components/new-sale-form'


export default function NewSale() {
  // TODO: move this request to service layer
  const { products, error } = useProducts()

  if (error) return <div>failed to load</div>
  if (!products) return <div>loading...</div>

  return (
    <div className={style.container}>
      <Head>
        <title>Nova venda</title>
      </Head>

      <NewSaleForm products={products} />
      <NavigationBar activePage={NavigationBarPages.sales} />
    </div>
  )
}
