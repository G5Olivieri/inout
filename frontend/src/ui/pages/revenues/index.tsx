import React, { useState } from 'react'
import { Modal } from '@app/ui/components/modal'
import { Transaction } from '@app/domain/transactions/transaction'
import { TransactionForm } from '@app/ui/components/transactions/transaction-form'
import { TransactionList } from '@app/ui/components/transactions/transaction-list'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'

export const Revenues: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [revenues, setRevenues] = useState<Array<Transaction>>([])
  const [isOpen, setIsOpen] = useState(false)

  const openModal = (): void => {
    setIsOpen(true)
  }

  const saveRevenue = (revenue: Transaction) => {
    setRevenues([...revenues, revenue])
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>{t('add')}</button>
      <input
        type="month"
        value={format(new Date(), 'yyyy-MM')}
        aria-label={t('month')}
        readOnly
      />
      <TransactionList transactions={revenues} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TransactionForm onSaveTransaction={saveRevenue} />
      </Modal>
    </div>
  )
}
