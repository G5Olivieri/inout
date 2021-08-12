import useSWR from "swr"
import { jsonFetcher } from "./util"

const API_BASE_URL = `${process.env.REACT_APP_API_BASE_URL}/cash`

type Cash = {
  amount: number
}

export const useCash = () => {
  const { data: cash, error } = useSWR<Cash>(API_BASE_URL, jsonFetcher)

  return {
    cash,
    error
  }
}
