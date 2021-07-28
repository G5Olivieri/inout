import { useState } from 'react'
import ProductsIcon from './icons/products-icon'
import SalesIcon from './icons/sales-icon'
import PurchasesIcon from './icons/purchases-icon'
import TicketsIcon from './icons/tickets-icon'
import { NavigationBarPages } from './navigation-pages'
import { NavigationLink } from './navigation-link'
import style from './style.module.scss'

type NavigationBarProps = {
  page: NavigationBarPages
}

// TODO: remove default and change to const
export default function NavigationBar({ page }: NavigationBarProps) {
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
            active={page === NavigationBarPages.products}
            icon={<ProductsIcon />}
            pagePath="/products"
            onClick={() => setAddFocus(false)}
          />
        </li>
        <li>
          <NavigationLink
            pageClassName={style.sales}
            isAddFocus={addFocus}
            active={page === NavigationBarPages.sales}
            icon={<SalesIcon />}
            pagePath="/sales"
            onClick={() => setAddFocus(false)}
          />
        </li>
        <li>
          <button className={style.plusButton} onClick={onClick}><span>+</span></button>
        </li>
        <li>
          <NavigationLink
            pageClassName={style.purchases}
            isAddFocus={addFocus}
            active={page === NavigationBarPages.purchases}
            icon={<PurchasesIcon />}
            pagePath="/purchases"
            onClick={() => setAddFocus(false)}
          />
        </li>
        <li>
          <NavigationLink
            pageClassName={style.tickets}
            isAddFocus={addFocus}
            active={page === NavigationBarPages.tickets}
            icon={<TicketsIcon />}
            pagePath="/tickets"
            onClick={() => setAddFocus(false)}
          />
        </li>
      </ul>
    </nav>
  )
}
