import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { getLastPageIndex, jsonFetcher, parseLinkHeader, useHeaderPagination } from './util'

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/products`

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
  const { data: products, error } = useSWR<Array<Product>>(`${API_BASE_URL}?sort=name`, jsonFetcher)

  return {
    products,
    error
  }
}

export const useAllProducts = () => {
  const [error, setError] = useState<Error | undefined>()
  const [isLoading, setIsLoading] = useState(true)
  const [products, setProducts] = useState<Array<Product>>([])

  useEffect(() => {
    fetch(`${API_BASE_URL}?sort=name&page=0`)
      .then((res) => {
         const lastPage = getLastPageIndex(parseLinkHeader(res))
         res.json()
          .then(data => {
            setProducts(p => [...p, ...data])
            for(let page = 1; page <= lastPage; page++) {
              fetch(`${API_BASE_URL}?sort=name&page=${page}`)
                .then(res => res.json())
                .then(data => {
                  setProducts(p => [...p, ...data])
                })
            }
          })
      }).catch(setError)
    setIsLoading(false)
  }, [])

  return {
    products,
    isLoading,
    error
  }
}


export const useSearchProducts = (query: string) => {
  const {
    itemPerPage,
    isLoadingMore,
    isLastPage,
    page,
    setPage,
    error
  } = useHeaderPagination<Array<Product>>((page) => {
    const name = query === '' ? undefined : query
    const qs = {
      name,
      page,
      sort: 'name',
    }
    return `${API_BASE_URL}/search?${queryString.stringify(qs)}`
  })

  return {
    products: itemPerPage.flat(),
    isLoadingMore,
    isLastPage,
    page,
    setPage,
    error
  }
}

export const usePagedProducts = () => {
  const {
    itemPerPage,
    isLoadingMore,
    isLastPage,
    page,
    setPage,
    error
  } = useHeaderPagination<Array<Product>>((index) => `${API_BASE_URL}?sort=name&page=${index}`)

  return {
    products: itemPerPage.flat(),
    isLoadingMore,
    isLastPage,
    page,
    setPage,
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
