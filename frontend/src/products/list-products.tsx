import { useEffect, useState } from 'react'
import { API_BASE_URL_V1 } from '@app/settings'

const ListProducts: React.FC = () => {
  const [products, setProducts] = useState<Array<{ name: string }>>([])

  useEffect(() => {
    fetch(`${API_BASE_URL_V1}/products`)
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
