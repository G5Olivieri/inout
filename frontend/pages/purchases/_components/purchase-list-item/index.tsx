import style from './style.module.scss'

const ProductPurchase = () => {
  return (
    <li>
      <span>Zomo de Morango (1x)</span>
      <span>R$ 15,00</span>
    </li>
  )
}

// TODO: remove default and change to const
export default function PurchaseListItem() {
  return (
    <li className={style.purchaseListItem}>
      <header>
        <h2>7 Abril, 2021</h2>
      </header>
      <main>
        <ul>
          <ProductPurchase />
          <ProductPurchase />
          <ProductPurchase />
        </ul>
      </main>
      <footer>
        <label>Total</label>
        <span>R$ 100,00</span>
      </footer>
    </li>
  )
}
