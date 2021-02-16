import React, { useState } from "react"
import { format } from "date-fns"

export const Home: React.FC = (): JSX.Element => {
  const [month, setMonth] = useState(format(new Date(), "yyyy-MM"))

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value)
  }

  return (
    <div>
      <input type="month" onChange={onChange} value={month} aria-label="month" />
      <div>Receitas: R$ 0,00</div>
      <div>Despesas: R$ 0,00</div>
    </div>
  )
}
