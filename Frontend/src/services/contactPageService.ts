import type { ContactPage, StrapiSingleResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getContactPage(): Promise<ContactPage> {
  const query = buildQuery({ populateAll: true })
  const response = await fetchJson<StrapiSingleResponse<ContactPage>>(
    buildCmsUrl(CMS_ENDPOINTS.contactPage, query)
  )

  return response.data
}