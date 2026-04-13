import type { SiteSettings, StrapiSingleResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getSiteSettings(): Promise<SiteSettings> {
  const query = buildQuery({ populateAll: true })
  const response = await fetchJson<StrapiSingleResponse<SiteSettings>>(
    buildCmsUrl(CMS_ENDPOINTS.siteSettings, query)
  )

  return response.data
}