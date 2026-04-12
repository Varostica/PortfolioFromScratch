import fetchAPI from './apiClient';

// TODO: replace with shared types from src/types/
interface Product {
  id: number;
  attributes: Record<string, unknown>;
}

interface ProductListResponse {
  data: Product[];
}

interface ProductResponse {
  data: Product;
}

export async function getProducts(): Promise<ProductListResponse> {
  return fetchAPI<ProductListResponse>('/products?populate=*');
}

export async function getProduct(id: number): Promise<ProductResponse> {
  return fetchAPI<ProductResponse>(`/products/${id}?populate=*`);
}
