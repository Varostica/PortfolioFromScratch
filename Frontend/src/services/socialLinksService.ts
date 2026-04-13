import type { SocialLink, StrapiCollectionResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getSocialLinks(): Promise<SocialLink[]> {
  const query = buildQuery({
    sort: ['sortOrder:asc'],
  })

  const response = await fetchJson<StrapiCollectionResponse<SocialLink>>(
    buildCmsUrl(CMS_ENDPOINTS.socialLinks, query)
  )

  return response.data
}