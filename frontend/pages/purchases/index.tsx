import Head from 'next/head'
import style from './style.module.scss'

import Search from '../_components/search'
import PurchaseList from './_components/purchase-list'
import NavigationBar from '../_components/navigation-bar'
import { NavigationBarPages } from '../_components/navigation-bar/navigation-pages'

// TODO: I'm thinking of joining this with Sales and to produce Transaction entity
export default function Purchases() {
  return (
  <div className={style.container}>
    <Head>
      <title>Compras</title>
    </Head>

    <h1 className={style.pageTitle}>Compras</h1>
    <Search />

    <PurchaseList />
    <NavigationBar activePage={NavigationBarPages.purchases} />
  </div>
  )
}
