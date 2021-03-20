import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { useInternacionalization } from '@app/ui/internacionalizations/use-internacionalization'
import { GetTransactionsSummaryCommand } from '@app/domain/transactions/summary/get-transactions-summary-command'
import { useDomainEvents } from '@app/ui/events/use-domain-events'
import { TransactionsSummaryFetchedEvent } from '@app/domain/transactions/summary/transactions-summary-fetched-event'

interface HomeProps {
  command: GetTransactionsSummaryCommand
}

export const Home: React.FC<HomeProps> = ({ command }): JSX.Element => {
  const { t } = useTranslation()
  const i18n = useInternacionalization()
  const domainEvents = useDomainEvents()
  const [month, setMonth] = useState(format(new Date(), 'yyyy-MM'))
  const [revenues, setRevenues] = useState(0)
  const [expenses, setExpenses] = useState(0)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value)
  }

  domainEvents.on(TransactionsSummaryFetchedEvent, ({ summary }) => {
    setRevenues(summary.revenues.value)
    setExpenses(summary.expenses.value)
  })

  useEffect(() => {
    command.execute({ year: 1 })
  }, [revenues, expenses])

  return (
    <div>
      <input
        type="month"
        onChange={onChange}
        value={month}
        aria-label={t('month')}
      />
      <div>
        {_.capitalize(t('revenue_plural'))}: {i18n.formatCurrency(revenues)}
      </div>
      <div>
        {_.capitalize(t('expense_plural'))}: {i18n.formatCurrency(expenses)}
      </div>
    </div>
  )
}
