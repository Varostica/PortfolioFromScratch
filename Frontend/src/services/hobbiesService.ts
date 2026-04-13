import type { Hobby, StrapiCollectionResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getHobbies(): Promise<Hobby[]> {
  const query = buildQuery({
    sort: ['sortOrder:asc'],
  })

  const response = await fetchJson<StrapiCollectionResponse<Hobby>>(
    buildCmsUrl(CMS_ENDPOINTS.hobbies, query)
  )

  return response.data
}
