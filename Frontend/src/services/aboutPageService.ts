import type { AboutPage, StrapiSingleResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getAboutPage(): Promise<AboutPage> {
  const query = buildQuery({ populateAll: true })
  const response = await fetchJson<StrapiSingleResponse<AboutPage>>(
    buildCmsUrl(CMS_ENDPOINTS.aboutPage, query)
  )

  return response.data
}