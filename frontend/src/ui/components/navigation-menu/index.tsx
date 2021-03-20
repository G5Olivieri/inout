import React from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

export const NavigationMenu: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">{_.capitalize(t('home screen'))}</Link>
        </li>
        <li>
          <Link to="/expenses">{_.capitalize(t('expense_plural'))}</Link>
        </li>
        <li>
          <Link to="/revenues">{_.capitalize(t('revenue_plural'))}</Link>
        </li>
      </ul>
    </nav>
  )
}
