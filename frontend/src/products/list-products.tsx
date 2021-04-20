import { useEffect, useState } from 'react'

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Array<{ name: string }>>([])

  useEffect(() => {
    fetch('http://172.23.112.9:3001/api/v1/products')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.items)
      })
  }, [])

  return (
    <>
      {products ? (
        <ul>
          {products.map((product, i) => (
            <li key={i}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <h1>Vazio</h1>
      )}
    </>
  )
}

export default ListProducts
