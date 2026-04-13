import { fetchJson } from './apiClient'

const FAKESTORE_API_URL = import.meta.env.VITE_FAKESTORE_API_URL

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

export async function getProducts() {
  return fetchJson<Product[]>(`${FAKESTORE_API_URL}/products`)
}
