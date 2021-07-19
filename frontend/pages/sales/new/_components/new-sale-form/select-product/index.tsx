import { Product } from "../../../../../../services/products"

type SelectProductProps = {
  products: Array<Product>
  onSelect: (product: Product) => Promise<void> | void
}

export const SelectProduct: React.FC<SelectProductProps> = ({ products, onSelect: onSelect }) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === '') {
      return
    }
    const product = products.find((value) => value.id === parseInt(event.target.value))!
    onSelect(product)
  }

  return (
    <select autoComplete="on" onChange={onChange}>
      <option value="">Escolha o produto</option>
      {products.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}
    </select>
  )
}
