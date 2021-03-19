import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { useInternacionalization } from '@app/internacionalizations/use-internacionalization'
import { DomainEvents } from '@app/core/events/domain-events'
import {
  GetExpensesSummaryCommand,
  ExpensesSummaryFetchedEvent,
} from '@app/core/transactions/commands/get-expenses-summary-command'

export const Home: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const i18n = useInternacionalization()
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [revenue, setRevenue] = useState(0)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value)
  }

  const domainEvents = new DomainEvents()
  const command = new GetExpensesSummaryCommand(domainEvents)

  domainEvents.on(ExpensesSummaryFetchedEvent, (event) =>
    setRevenue(parseFloat(event.summary.value))
  )

  useEffect(() => {
    command.execute({ year: 1 })
  }, [revenue])

  return (
    <div>
      <input
        type="month"
        onChange={onChange}
        value={month}
        aria-label={t('month')}
      />
      <div>
        {_.capitalize(t('revenue_plural'))}: {i18n.formatCurrency(revenue)}
      </div>
      <div>
        {_.capitalize(t('expense_plural'))}: {i18n.formatCurrency(0)}
      </div>
    </div>
  )
}
