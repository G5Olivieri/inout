import style from './style.module.scss'

// TOOD: remove default
export default function Cash() {
  return (
    <div className={style.cash}>
      <h2>Caixa</h2>
      <div className={style.balance}>
        <span>R$</span>
        <h1>2.000,00</h1>
      </div>
    </div>
  )
}
