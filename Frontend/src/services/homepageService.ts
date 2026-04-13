import type { Homepage, StrapiSingleResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getHomepage(): Promise<Homepage> {
  const query = buildQuery({ populateAll: true })
  const response = await fetchJson<StrapiSingleResponse<Homepage>>(
    buildCmsUrl(CMS_ENDPOINTS.homepage, query)
  )

  return response.data
}
