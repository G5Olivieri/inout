import React, { useState } from "react"
import { format } from "date-fns"
import { Modal } from "@app/components/modal"
import { Transaction } from "@app/components/transactions/transaction"
import { TransactionForm } from "@app/components/transactions/transaction-form"
import { TransactionList } from "@app/components/transactions/transaction-list"
import { useTranslation } from "react-i18next"

export const Revenues: React.FC = (): JSX.Element => {
  const { t } = useTranslation()
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"))
  const [revenues, setRevenues] = useState<Array<Transaction>>([])
  const [isOpen, setIsOpen] = useState(false)

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value)
  }

  const openModal = (): void => {
    setIsOpen(true)
  }

  const saveRevenue = (revenue: Transaction) => {
    setRevenues([...revenues, revenue])
    setIsOpen(false)
  }

  return (
    <div>
      <button onClick={openModal}>{t("add")}</button>
      <input
        type="month"
        onChange={onChange}
        value={month}
        aria-label={t("month")}
      />
      <TransactionList transactions={revenues} />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <TransactionForm onSaveTransaction={saveRevenue}/>
      </Modal>
    </div>
  )
}
