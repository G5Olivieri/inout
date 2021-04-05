import React, { useEffect, useState } from 'react'

interface Product {
  name: string
}

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Array<string>>([])

  useEffect(() => {
    fetch('https://api.mocki.io/v1/1f8203e9')
      .then((res) => res.json() as Promise<Array<Product>>)
      .then((data) => setProducts(data.map((p) => p.name)))
  })

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {products.map((product, i) => (
          <li key={i}>{product}</li>
        ))}
      </ul>
    </div>
  )
}
