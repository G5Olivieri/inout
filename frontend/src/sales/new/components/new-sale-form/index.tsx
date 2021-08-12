import React, { FormEventHandler, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Product } from '../../../../services/products';
import { CreateSale } from '../../../../services/sales';
import { SelectedProduct } from './selected-product';
import style from './style.module.scss';


type NewSaleFormProps = {
  hasAvailableProducts: boolean
  selectedProducts: Array<Product>
  unselect: (product: Product) => void
  onSubmit: (sale: CreateSale) => void
  onAddProducts: () => void
  getOriginalProduct: (product: Product) => Product
  onQuantityChange: (value: number, product: Product) => void
}

export const NewSaleForm: React.FC<NewSaleFormProps> = ({
    hasAvailableProducts,
    onQuantityChange,
    getOriginalProduct,
    unselect,
    selectedProducts,
    onSubmit,
    onAddProducts
  }) => {
  const [date, setDate] = useState(new Date())

  const onSubmitWrapper: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    onSubmit({
      date: date,
      products: selectedProducts.map(({ id, price, quantity }) => ({
        id,
        price,
        quantity
      }))
    })
  }

  const onDateChange = (d: Date) => {
    setDate(d)
  }

  return (
    <form className={style.container} onSubmit={onSubmitWrapper}>
      <h1 className={style.title}>Venda</h1>
      <DatePicker
        className={style.date}
        onChange={onDateChange}
        selected={date}
        dateFormat='P'
      />
      {selectedProducts.length > 0 &&
        <ul>
          {
            selectedProducts.map((p) =>
              <SelectedProduct
                key={p.id}
                onRemove={() => unselect(p)}
                product={p}
                maxQuantity={getOriginalProduct(p).quantity}
                onQuantityChange={onQuantityChange}
              />
            )
          }
        </ul>}
      {hasAvailableProducts
        && <button className={style.addProductButton} onClick={onAddProducts} type="button">Adicionar produto</button>}
      {selectedProducts.length > 0
        && <button className={style.primaryButton} type="submit">Criar</button>}
    </form>
  )
}

