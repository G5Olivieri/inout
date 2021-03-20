import React, { useState } from 'react'
import { format } from 'date-fns'
import { Transaction } from '@app/domain/transactions/transaction'
import { useTranslation } from 'react-i18next'

interface FormProps {
  onSaveTransaction: (transaction: Transaction) => void
}

export const TransactionForm: React.FC<FormProps> = ({
  onSaveTransaction,
}): JSX.Element => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (value === '') {
      return
    }

    if (description === '') {
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
    <form onSubmit={onSubmit} role="form">
      <label htmlFor="description">{t('input description')}:</label>
      <input
        type="text"
        placeholder={t('description')}
        value={description}
        onChange={onDescriptionChange}
        name="description"
        id="description"
        required
      />
      <label htmlFor="amount">{t('input amount in cents')}:</label>
      <input
        type="number"
        placeholder={t('amount in cents')}
        min={1}
        value={value}
        onChange={onValueChange}
        required
        name="amount"
        id="amount"
        autoFocus
      />
      <label htmlFor="date">{t('input date')}:</label>
      <input
        type="date"
        placeholder={t('date')}
        value={format(date, 'yyyy-MM-dd')}
        onChange={onDateChange}
        name="date"
        id="date"
        required
      />
      <button type="submit">{t('to save')}</button>
    </form>
  )
}
