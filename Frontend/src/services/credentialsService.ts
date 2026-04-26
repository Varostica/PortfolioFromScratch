import type { Credential, StrapiCollectionResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getCredentials(): Promise<Credential[]> {
  const query = buildQuery({
    populateAll: true,
    sort: ['sortOrder:asc'],
  })

  const response = await fetchJson<StrapiCollectionResponse<Credential>>(
    buildCmsUrl(CMS_ENDPOINTS.credentials, query)
  )

  return response.data
}
