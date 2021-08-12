import { useEffect } from "react"
import { useState } from "react"
import { SearchableList } from "../../../../../components/searchable-list"
import { Product } from "../../../../../services/products"

type SelectProductsProps = {
  products: Array<Product>
  onSelect: (product: Array<Product>) => Promise<void> | void
}

export const SelectProducts: React.FC<SelectProductsProps> = ({ products, onSelect }) => {
  const [remaining, setRemaining] = useState<Array<Product>>([])
  const [selected, setSelected] = useState<Array<Product>>([])

  useEffect(() => {
    setRemaining(products)
  }, [products])

  const onSearchChange = (search: string) => {
    const productsExceptSelected = products.filter(p => !selected.includes(p))
    if (search === '') {
      setRemaining(productsExceptSelected)
      return
    }
    const filtered = productsExceptSelected.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    setRemaining(filtered)
  }

  const onCheckChange = (id: number) => {
    const sIndex = selected.findIndex(p => p.id === id)
    if (sIndex >= 0) {
      remaining.push(selected[sIndex])
      selected.splice(sIndex, 1)
    }
    const rIndex = remaining.findIndex(p => p.id === id)
    if(rIndex >= 0) {
      selected.push(remaining[rIndex])
      remaining.splice(rIndex, 1)
    }
    remaining.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name === b.name) return 0
      return 1
    })
    selected.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name === b.name) return 0
      return 1
    })
    setSelected(selected)
    setRemaining(remaining)
  }

  const onClick = () => {
    console.log(selected)
  }

  return (
  <div>
    <button type="button" onClick={onClick}>Selecionar</button>
    <SearchableList
      items={[...selected, ...remaining]}
      onSearchChange={onSearchChange}
      listItemComponent={p => <li key={p.id}><input type="checkbox" onChange={() => onCheckChange(p.id)} />{p.name}</li>}
    />
  </div>
  )
}
