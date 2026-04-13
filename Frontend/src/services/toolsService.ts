import type { Tool, StrapiCollectionResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getTools(): Promise<Tool[]> {
  const query = buildQuery({
    sort: ['sortOrder:asc'],
  })

  const response = await fetchJson<StrapiCollectionResponse<Tool>>(
    buildCmsUrl(CMS_ENDPOINTS.tools, query)
  )

  return response.data
}