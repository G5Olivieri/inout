import useSWR from 'swr'
import { jsonFetcher } from './util'

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/sales`

export type SaleProduct = {
  name: string
  price: number
  quantity: number
}

export type Sale = {
  id: number
  date: string
  products: Array<SaleProduct>
}

export type CreateSaleProduct = {
  id: number
  price: number
  quantity: number
}

export type CreateSale = {
  date: Date
  products: Array<CreateSaleProduct>
}

export const useSales = () => {
  const { data: sales, error } = useSWR<Array<Sale>>(`${API_BASE_URL}?sort=date&direction=Descending`, jsonFetcher)

  return {
    sales,
    error
  }
}

export const createSale = (sale: CreateSale): Promise<void> => {
    // TODO: handle error
    return fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sale)
    }).then()
}
