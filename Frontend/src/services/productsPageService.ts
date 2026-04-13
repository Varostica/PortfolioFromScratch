import type { ProductsPage, StrapiSingleResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getProductsPage(): Promise<ProductsPage> {
  const query = buildQuery({
    populateAll: true,
  })

  const response = await fetchJson<StrapiSingleResponse<ProductsPage>>(
    buildCmsUrl(CMS_ENDPOINTS.productsPage, query)
  )

  return response.data
}
