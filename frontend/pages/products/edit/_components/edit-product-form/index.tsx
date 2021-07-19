import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { Product, UpdateProduct } from '../../../../../services/products'
import PriceInput from '../../../../_components/price-input'
import style from './style.module.scss'

type NewProductFormProps = {
  product: Product,
  onUpdate: (id: number, product: UpdateProduct) => Promise<void> | void
  onDelete: () => Promise<void> | void
}

export const EditProductForm: React.FC<NewProductFormProps> = ({ onUpdate, onDelete, product }) => {
  const [name, setName] = useState(product.name)
  // TODO: move this to currency service
  const [price, setPrice] = useState(Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price / 100).slice(3))
  const [quantity, setQuantity] = useState(product.quantity.toString())
  const [priceValidity, setPriceValidity] = useState('')

  const nameInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (nameInput.current) {
      nameInput.current.focus();
    }
  }, []);

  const onSubmitWrapper = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (price === '0,00') {
      setPriceValidity('Valor 0,00 é inválido para o preço')
      return
    }

    onUpdate(product.id, {
      name,
      price: parseInt(price.replaceAll('.', '').replaceAll(',', '')),
      quantity: parseInt(quantity)
    })
  }

  const onChange = (value: string, updater: (arg: any) => void) => {
    updater(value);
  }

  const onDeleteWrapper = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    onDelete()
  }

  return (
      <form onSubmit={onSubmitWrapper} className={style.container}>
        <h1>Editar Produto</h1>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nome do produto"
          onChange={(e) => onChange(e.target.value, setName)}
          value={name}
          ref={nameInput}
          required
        />
        <label htmlFor="price">Preço</label>

        <PriceInput required value={price} onChange={(price) => {
            setPrice(price)
            if (price !== '0,00') {
              setPriceValidity('')
            }
          }} valid={priceValidity} />

        <label htmlFor="quantity">Quantidade</label>
        <input
          type="number"
          name="quantity"
          id="quantity"
          min="0"
          step="1"
          placeholder="Quantidade"
          onChange={(e) => onChange(e.target.value, setQuantity)}
          value={quantity}
          required
        />
        <button type="submit">Atualizar</button>
        <button onClick={onDeleteWrapper} className={style.deleteButton}>Deletar</button>
      </form>
  )
}
