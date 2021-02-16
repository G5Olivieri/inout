import React, { useState } from "react"
import { format } from "date-fns"
import { TransactionForm } from "@app/components/transactions/transaction-form"
import { Modal } from "@app/components/modal"
import { Transaction } from "@app/components/transactions/transaction"
import { TransactionList } from "@app/components/transactions/transaction-list"
import { useTranslation } from "react-i18next"

export const Expenses: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"))
  const [expenses, setExpenses] = useState<Array<Transaction>>([])
  const [isOpen, setIsOpen] = useState(false)

  const onChange = (event: any) => {
    setMonth(event.target.value)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const saveTransaction = (expense: Transaction) => {
    setExpenses([...expenses, expense])
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>{t("add")}</button>
      <input type="month" onChange={onChange} value={month} aria-label={t("month")} />
      <TransactionList transactions={expenses} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TransactionForm onSaveTransaction={saveTransaction}/>
      </Modal>
    </div>
  )
}

