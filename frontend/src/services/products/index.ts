import React from 'react'

const API_BASE_URL = 'http://localhost:8080/products'

type BaseProduct = {
  name: string,
  price: number,
  quantity: number,
}

type Identifier = {
  id: number
}

export type Product = BaseProduct & Identifier
export type UpdateProduct = BaseProduct
export type ProductUpdated = Product
export type CreateProduct = BaseProduct
export type ProductCreated = Product

export const useProducts = () => {
  const [error, setError] = React.useState<Error | null>(null)
  const [products, setProduct] = React.useState<Array<Product> | null>(null)

  React.useEffect(() => {
    fetch(API_BASE_URL)
      .then(res => res.json())
      .then((data: Array<Product>) => {
        setProduct(data)
      })
      .catch(setError)
  }, [])

  return {
    products,
    error
  }
}

export const useProduct = (id: number) => {
  const [error, setError] = React.useState<Error | null>(null)
  const [product, setProduct] = React.useState<Product | null>(null)

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/${id}`)
      .then(res => res.json())
      .then((data: Product) => {
        setProduct(data)
      })
      .catch(setError)
  }, [id])

  return {
    product,
    error
  }
}

export const updateProduct = (id: number, product: UpdateProduct): Promise<void> => {
  // TODO: handle error
  return fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then()
}

export const createProduct = (product: CreateProduct): Promise<ProductCreated> => {
    // TODO: handle error
    return fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }).then(res => res.json())
}

export const deleteProduct = (id: number): Promise<void> => {
    // TODO: handle error
    return fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    }).then()
}
