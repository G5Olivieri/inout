import React from 'react'

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/purchases`

export type PurchaseProduct = {
  name: string
  price: number
  quantity: number
}

export type Purchase = {
  id: number
  date: string
  products: Array<PurchaseProduct>
}

export type CreatePurchaseProduct = {
  id: number
  price: number
  quantity: number
}

export type CreatePurchase = {
  date: Date
  products: Array<CreatePurchaseProduct>
}

export const usePurchases = () => {
  const [error, setError] = React.useState<Error | null>(null)
  const [purchases, setProduct] = React.useState<Array<Purchase> | null>(null)

  React.useEffect(() => {
    fetch(`${API_BASE_URL}?sort=date&direction=Descending`)
      .then(res => res.json())
      .then((data: Array<Purchase>) => {
        setProduct(data)
      })
      .catch(setError)
  }, [])

  return {
    purchases,
    error
  }
}

export const createPurchase = (purchase: CreatePurchase): Promise<void> => {
    // TODO: handle error
    return fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(purchase)
    }).then()
}
