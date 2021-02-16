import React, { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Form } from "@app/pages/revenues/form"
import { Modal } from "@app/components/modal"
import { Revenue } from "@app/pages/revenues/revenue"

const locales: Record<string, Locale> = {
  'pt-BR': ptBR
}

export const Revenues: React.FC = (): JSX.Element => {
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"))
  const [revenues, setRevenues] = useState<Array<Revenue>>([])
  const [isOpen, setIsOpen] = useState(false)

  const onChange = (event: any) => {
    setMonth(event.target.value)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  const saveRevenue = (revenue: Revenue) => {
    setRevenues([...revenues, revenue])
    setIsOpen(false)
  }

  const currencyFormat = (number: number): string =>
    new Intl.NumberFormat(navigator.language, { style: 'currency', currency: 'BRL' }).format(number)

  const revenueItem = (revenue: Revenue, key: number): JSX.Element =>
    <li key={key}>
      { revenue.description }:&#160;
      { currencyFormat(revenue.value / 100) } -&#160;
      { format(revenue.date, "PP", { locale: locales[navigator.language] }) }
    </li>

  return (
    <div>
      <button onClick={openModal}>Adicionar</button>
      <input type="month" onChange={onChange} value={month} aria-label="month" />
      <ul>
        {revenues.map(revenueItem)}
      </ul>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Form onSaveRevenue={saveRevenue}/>
      </Modal>
    </div>
  )
}
