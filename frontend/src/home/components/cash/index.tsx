import React from 'react'
import style from './style.module.scss'

type CashProps = {
  amount: number
}

export const Cash: React.FC<CashProps> = ({ amount }) => {
  return (
    <div className={style.cash}>
      <h2>Caixa</h2>
      <div className={style.balance}>
        <span>R$</span>
        <h1>
          {amount < 0 && '-'}
          {Intl.NumberFormat('pt-BR', { style: 'currency', currency: "BRL" }).format(amount / 100).slice(3)}
        </h1>
      </div>
    </div>
  )
}
