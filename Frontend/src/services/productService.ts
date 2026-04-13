import type { Product } from '../types/product'
import { fetchJson } from './apiClient'

const FAKESTORE_BASE_URL = import.meta.env.VITE_FAKESTORE_API_URL

/** Fetch all products from the Fake Store API. */
export async function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>(`${FAKESTORE_BASE_URL}/products`)
}
