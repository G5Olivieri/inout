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
  const [month, setMonth] = useState(new Date())
  const [revenues, setRevenues] = useState(0)
  const [expenses, setExpenses] = useState(0)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value)
    setMonth(date)
    command.execute({ year: date.getFullYear(), month: date.getMonth() })
  }

  useEffect(() => {
    const subscription = domainEvents.on(
      TransactionsSummaryFetchedEvent,
      ({ summary }) => {
        setRevenues(summary.revenues.value)
        setExpenses(summary.expenses.value)
      }
    )
    command.execute({ year: month.getFullYear(), month: month.getMonth() })
    return () => subscription.cancel()
  }, [])

  return (
    <div>
      <input
        type="month"
        onChange={onChange}
        value={format(month, 'yyyy-MM')}
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
