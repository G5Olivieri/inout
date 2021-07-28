import React, { FormEventHandler, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Product } from '../../../../services/products';
import { SelectProduct } from './select-product';
import { SelectedProduct } from './selected-product';
import style from './style.module.scss';


type NewSaleFormProps = {
  products: Array<Product>
}

export const NewSaleForm: React.FC<NewSaleFormProps> = ({ products }) => {
  const [availableProducts, setAvailableProducts] = useState<Array<Product>>(products)
  const [selectedProducts, setSelectedProducts] = useState<Array<Product>>([])
  const [addProduct, setAddProduct] = useState(false)
  const [date, setDate] = useState(new Date())

  const onAddProduct = () => {
    setAddProduct(!addProduct)
  }

  const onSelect = (product: Product) => {
    setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }])
    setAvailableProducts(availableProducts.filter((p) => p.id !== product.id))
    setAddProduct(false)
  }

  const unselect = (product: Product) => {
    const availableProduct = getOriginalProduct(product)
    setSelectedProducts(selectedProducts.filter(p => product.id !== p.id))
    setAvailableProducts([...availableProducts, availableProduct].sort((a, b) => a.id - b.id))
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    console.log({
      date: date.toISOString(),
      products: selectedProducts
    })
  }

  const onQuantityChange = (value: number, product: Product) => {
    const index = selectedProducts.findIndex((p) => p.id === product.id)
    if (index < 0) {
      return
    }
    selectedProducts[index].quantity = value
    setSelectedProducts(selectedProducts)
  }

  const getOriginalProduct = (product: Product) => {
    const originalProduct = products.find((p) => product.id === p.id)
    if (!originalProduct) {
      throw new Error("Product nonexistent in products")
    }
    return originalProduct
  }

  const onDateChange = (d: Date) => {
    setDate(d)
  }

  return (
    <form className={style.container} onSubmit={onSubmit}>
      <h1 className={style.title}>Criar Venda</h1>
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
      {addProduct &&
        <SelectProduct
          products={availableProducts}
          onSelect={onSelect}
        />}
      {availableProducts.length > 0 && <button className={style.addProductButton} onClick={onAddProduct} type="button">Adicionar produto</button>}
      <button className={style.primaryButton} type="submit">Criar venda</button>
    </form>
  )
}

