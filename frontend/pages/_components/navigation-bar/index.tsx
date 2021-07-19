import Link from 'next/link'

import style from './style.module.scss'
import ProductsIcon from './icons/products-icon'
import SalesIcon from './icons/sales-icon'
import PurchasesIcon from './icons/purchases-icon'
import TicketsIcon from './icons/tickets-icon'
import { useState } from 'react'
import { NavigationBarPages } from './navigation-pages'

type NavigationBarProps = {
  activePage: NavigationBarPages
}

type NavigationLinkProps = {
  pagePath: string,
  isAddFocus: boolean,
  active: boolean,
  icon: JSX.Element,
  pageClassName: string
}

const getPath = (path: string, isAddFocus: boolean) => {
  if(isAddFocus) {
    return `${path}/new`
  }
  return path
}

// TODO: change to const
function getClassName(pageClassName: string, isAddFocus: boolean, active: boolean) {
  const classNamesTuples: Array<[string, boolean]> = [[pageClassName, true], [style.add, isAddFocus], [style.active, active]]
  return classNamesTuples
          .filter((tuple) => tuple[1])
          .map(tuple => tuple[0])
          .join(' ')
}

// TODO: change to const
function NavigationLink({pagePath, isAddFocus, active, icon, pageClassName}: NavigationLinkProps) {
  return (
    <Link href={getPath(pagePath, isAddFocus)} passHref>
      <a className={getClassName(pageClassName, isAddFocus, active)}>
        {icon}
      </a>
    </Link>
  )
}

// TODO: remove default and change to const
export default function NavigationBar({ activePage }: NavigationBarProps) {
  const [addFocus, setAddFocus] = useState(false)

  // TODO: change to const
  function onClick() {
    setAddFocus(!addFocus)
  }

  return (
    <nav className={style.navigation}>
      <ul>
        <li>
          <NavigationLink
            pageClassName={style.products}
            isAddFocus={addFocus}
            active={activePage === NavigationBarPages.products}
            icon={<ProductsIcon />}
            pagePath="/products"
            />
        </li>
        <li>
          <NavigationLink
            pageClassName={style.sales}
            isAddFocus={addFocus}
            active={activePage === NavigationBarPages.sales}
            icon={<SalesIcon />}
            pagePath="/sales"
            />
        </li>
        <li>
          <button className={style.plusButton} onClick={onClick}><span>+</span></button>
        </li>
        <li>
          <NavigationLink
            pageClassName={style.purchases}
            isAddFocus={addFocus}
            active={activePage === NavigationBarPages.purchases}
            icon={<PurchasesIcon />}
            pagePath="/purchases"
            />
        </li>
        <li>
          <NavigationLink
            pageClassName={style.tickets}
            isAddFocus={addFocus}
            active={activePage === NavigationBarPages.tickets}
            icon={<TicketsIcon />}
            pagePath="/tickets"
            />
        </li>
      </ul>
    </nav>
  )
}
