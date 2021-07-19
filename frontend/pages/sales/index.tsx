import Head from 'next/head'
import style from './style.module.scss'

import SaleList from './_components/sale-list'
import NavigationBar from '../_components/navigation-bar'
import { Product, Sale } from './sale'
import { NavigationBarPages } from '../_components/navigation-bar/navigation-pages'

export default function Sales() {
  // TODO: fetch this list from API
  const sales = [
    new Sale(
      [
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
      ]
    ),
    new Sale(
      [
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
        new Product('Zomo de morango', 1000, 1),
      ]
    ),
  ]

  return (
  <div className={style.container}>
    <Head>
      <title>Vendas</title>
    </Head>

    <SaleList sales={sales} />
    <NavigationBar activePage={NavigationBarPages.sales} />
  </div>
  )
}
