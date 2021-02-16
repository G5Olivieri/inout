import React, { useState } from "react"
import { format } from "date-fns"
import { Revenue } from "@app/pages/revenues/revenue"

interface FormProps {
  onSaveRevenue: (revenue: Revenue) => void
}

export const Form: React.FC<FormProps> = ({ onSaveRevenue }): JSX.Element => {
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

    onSaveRevenue({
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
        aria-label="valor em centavos"
        placeholder="Valor em centavos"
        min={1}
        value={value}
        onChange={onValueChange}
        required
        autoFocus
      />
      <input
        type="text"
        aria-label="descrição"
        placeholder="Descricao"
        value={description}
        onChange={onDescriptionChange}
        required
      />
      <input
        type="date"
        aria-label="dia da receita"
        placeholder="dia da receita"
        value={format(date, "yyyy-MM-dd")}
        onChange={onDateChange}
        required
      />
      <button>Salvar</button>
    </form>
  )
}
