import type { ResumePage, StrapiSingleResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getResumePage(): Promise<ResumePage> {
  const query = buildQuery({ populateAll: true })
  const response = await fetchJson<StrapiSingleResponse<ResumePage>>(
    buildCmsUrl(CMS_ENDPOINTS.resumePage, query)
  )

  return response.data
}