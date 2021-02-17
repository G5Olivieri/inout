import React, { useState } from "react"
import { format } from "date-fns"
import { Transaction } from "@app/components/transactions/transaction"
import { useTranslation } from "react-i18next"

interface FormProps {
  onSaveTransaction: (transaction: Transaction) => void
}

export const TransactionForm: React.FC<FormProps> =
  ({ onSaveTransaction }): JSX.Element => {
  const { t } = useTranslation()
  const [value, setValue] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState(new Date())

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (value === "") {
      return
    }

    if (description === "") {
      return
    }

    onSaveTransaction({
      value: parseInt(value),
      description,
      date,
    })
  }

  const onValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const onDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value)
  }

  const onDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(new Date(event.target.value))
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="number"
        aria-label={t("value in cents")}
        placeholder={t("value in cents")}
        min={1}
        value={value}
        onChange={onValueChange}
        required
        autoFocus />
      <input
        type="text"
        aria-label={t("description")}
        placeholder={t("description")}
        value={description}
        onChange={onDescriptionChange}
        required />
      <input
        type="date"
        aria-label={t("date")}
        placeholder={t("date")}
        value={format(date, "yyyy-MM-dd")}
        onChange={onDateChange}
        required />
      <button>Salvar</button>
    </form>
  )
}
