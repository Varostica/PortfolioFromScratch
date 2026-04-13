import type { Project, StrapiCollectionResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getProjects(): Promise<Project[]> {
  const query = buildQuery({
    populateAll: true,
    sort: ['sortOrder:asc', 'year:desc'],
  })

  const response = await fetchJson<StrapiCollectionResponse<Project>>(
    buildCmsUrl(CMS_ENDPOINTS.projects, query)
  )

  return response.data
}