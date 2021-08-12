import React, { useState } from 'react'
import { ProductsIcon, SalesIcon, PurchasesIcon, HomeIcon } from './icons'
import { NavigationBarPages } from './navigation-pages'
import { NavigationLink } from './navigation-link'
import style from './style.module.scss'

type NavigationBarProps = {
  page: NavigationBarPages
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ page }) => {
  const [addFocus, setAddFocus] = useState(false)

  const onClick = () => {
    setAddFocus(!addFocus)
  }

  return (
    <nav className={style.navigation}>
      <ul>
        <li>
          <NavigationLink
            pageClassName={style.home}
            isAddFocus={addFocus}
            active={page === NavigationBarPages.home}
            icon={<HomeIcon />}
            pagePath="/"
            onClick={() => setAddFocus(false)}
          />
        </li>
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
          <button className={style.plusButton} onClick={onClick}><span>+</span></button>
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
          <NavigationLink
            pageClassName={style.purchases}
            isAddFocus={addFocus}
            active={page === NavigationBarPages.purchases}
            icon={<PurchasesIcon />}
            pagePath="/purchases"
            onClick={() => setAddFocus(false)}
          />
        </li>
      </ul>
    </nav>
  )
}
