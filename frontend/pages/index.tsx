import Head from 'next/head'

import style from './style.module.scss'
import SummaryPage from './_components/summary'
import Cash from './_components/cash'
import NavigationBar from './_components/navigation-bar'
import { NavigationBarPages } from './_components/navigation-bar/navigation-pages'

export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title>Inicial</title>
      </Head>

      <Cash />
      <SummaryPage />
      <NavigationBar activePage={NavigationBarPages.home}/>
    </div>
  )
}
