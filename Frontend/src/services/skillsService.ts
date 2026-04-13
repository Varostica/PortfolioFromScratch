import type { Skill, StrapiCollectionResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getSkills(): Promise<Skill[]> {
  const query = buildQuery({
    sort: ['sortOrder:asc'],
  })

  const response = await fetchJson<StrapiCollectionResponse<Skill>>(
    buildCmsUrl(CMS_ENDPOINTS.skills, query)
  )

  return response.data
}