import React, { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Form } from "@app/pages/expenses/form"
import { Modal } from "@app/components/modal"
import { Expense } from "@app/pages/expenses/expense"

const locales: Record<string, Locale> = {
  'pt-BR': ptBR
}

export const Expenses: React.FC = (): JSX.Element => {
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"))
  const [expenses, setExpenses] = useState<Array<Expense>>([])
  const [isOpen, setIsOpen] = useState(false)

  const onChange = (event: any) => {
    setMonth(event.target.value)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const saveExpense = (expense: Expense) => {
    setExpenses([...expenses, expense])
    setIsOpen(false)
  }

  const currencyFormat = (number: number): string =>
    new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'BRL' }).format(number)

  const expenseItem = (expense: Expense, key: number): JSX.Element =>
    <li key={key}>
      { expense.description }:&#160;
      { currencyFormat(expense.value / 100) } -&#160;
      { format(expense.date, "PP", { locale: locales[navigator.language] }) }
    </li>

  return (
    <div>
      <button onClick={openModal}>Adicionar</button>
      <input type="month" onChange={onChange} value={month} aria-label="month" />
      <ul>
        {expenses.map(expenseItem)}
      </ul>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Form onSaveExpense={saveExpense}/>
      </Modal>
    </div>
  )
}

