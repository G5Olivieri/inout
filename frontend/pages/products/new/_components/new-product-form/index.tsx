import { FormEvent, useEffect, useRef, useState } from 'react'
import { CreateProduct } from '../../../../../services/products'
import PriceInput from '../../../../_components/price-input'
import style from './style.module.scss'

type NewProductFormProps = {
  onSubmit: (product: CreateProduct) => Promise<void> | void
}

// TODO: remove default and change to const
export default function NewProductForm({ onSubmit }: NewProductFormProps) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('0,00')
  const [quantity, setQuantity] = useState('1')
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
    onSubmit({
      name,
      price: parseInt(price.replaceAll('.', '').replaceAll(',', '')),
      quantity: parseInt(quantity)
    })
  }

  const onChange = (value: string, updater: (arg: any) => void) => {
    updater(value);
  }

  return (
      <form onSubmit={onSubmitWrapper} className={style.container}>
        <h1>Criar Produto</h1>
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
          min="1"
          step="1"
          placeholder="Quantidade"
          onChange={(e) => onChange(e.target.value, setQuantity)}
          value={quantity}
          required
        />
        <button>Criar</button>
      </form>
  )
}
