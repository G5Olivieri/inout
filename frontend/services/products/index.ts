import useSWR, { mutate } from "swr"

const API_BASE_URL = 'http://localhost:8080/api/v1/products'

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init)
  .then(res => res.json())

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
  const { data: products, error } = useSWR<Array<Product>>(API_BASE_URL, fetcher)

  return {
    products,
    isLoading: !error && !products,
    error
  }
}

export const useProduct = (id: number) => {
  const { data: product, error } = useSWR<Product>(`${API_BASE_URL}/${id}`, fetcher)

  return {
    product,
    error
  }
}

export const updateProduct = (id: number, product: UpdateProduct): Promise<ProductUpdated> => {
  // TODO: handle error
  return fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  }).then(res => res.json())
    .then((data: ProductUpdated) => {
      mutate(`http://localhost:8080/api/v1/products/${id}`)
      return data
    })
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
    }).then(() => {
      mutate(`${API_BASE_URL}/${id}`)
      mutate(API_BASE_URL)
    })
}
