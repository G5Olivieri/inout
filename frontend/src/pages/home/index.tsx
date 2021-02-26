import React, { useState } from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { useInternacionalization } from '@app/internacionalizations/use-internacionalization'

export const Home: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const i18n = useInternacionalization()
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'))

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value)
  }

  return (
    <div>
      <input
        type="month"
        onChange={onChange}
        value={month}
        aria-label={t('month')}
      />
      <div>
        {_.capitalize(t('revenue_plural'))}: {i18n.formatCurrency(0)}
      </div>
      <div>
        {_.capitalize(t('expense_plural'))}: {i18n.formatCurrency(0)}
      </div>
    </div>
  )
}
