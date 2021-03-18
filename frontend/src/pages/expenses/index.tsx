import React, { useState } from 'react'
import { TransactionForm } from '@app/components/transactions/transaction-form'
import { Modal } from '@app/components/modal'
import { Transaction } from '@app/components/transactions/transaction'
import { TransactionList } from '@app/components/transactions/transaction-list'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'

export const Expenses: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [expenses, setExpenses] = useState<Array<Transaction>>([])
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => {
    setIsOpen(true)
  }

  const saveTransaction = (expense: Transaction) => {
    setExpenses([...expenses, expense])
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>{t('add')}</button>
      <input
        type="month"
        value={format(new Date(), 'yyyy-MM')}
        aria-label={t('month')}
      />
      <TransactionList transactions={expenses} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TransactionForm onSaveTransaction={saveTransaction} />
      </Modal>
    </div>
  )
}
