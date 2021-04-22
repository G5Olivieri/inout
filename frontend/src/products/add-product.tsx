import TagsInput from '@app/products/components/tags-input'
import React, { useState } from 'react'

const AddProduct: React.FC = () => {
  const [name, setName] = useState('')
  const [tags, setTags] = useState<Array<string>>([])
  const [AddInCatalog, setAddInCatalog] = useState(false)
  const [price, setPrice] = useState(0)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const request = {
      name,
      tags,
    }
    console.log('http://localhost:3001/api/v1/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })
  }

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onTagsChange = (tags: Array<string>) => {
    setTags(tags)
  }

  const onAddPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddInCatalog(event.target.checked)
  }

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(event.target.value))
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Nome</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={onNameChange}
        value={name}
        autoFocus
      />
      <label htmlFor="tags">Etiquetas (separado por virgula)</label>
      <TagsInput onChange={onTagsChange} />
      <label htmlFor="addPrice">Adicionar ao catalogo</label>
      <input
        type="checkbox"
        id="addPrice"
        onChange={onAddPriceChange}
        checked={AddInCatalog}
      />
      {AddInCatalog && (
        <label>
          Preço
          <input
            type="number"
            id="price"
            onChange={onPriceChange}
            value={price}
          />
        </label>
      )}
      <button type="submit">Criar</button>
    </form>
  )
}

export default AddProduct
