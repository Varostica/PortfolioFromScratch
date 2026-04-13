import type { Artwork, StrapiCollectionResponse } from '../types/strapi'
import { CMS_ENDPOINTS, buildCmsUrl, buildQuery, fetchJson } from './cmsBase'

export async function getArtworks(): Promise<Artwork[]> {
  const query = buildQuery({
    populateAll: true,
    sort: ['sortOrder:asc'],
  })

  const response = await fetchJson<StrapiCollectionResponse<Artwork>>(
    buildCmsUrl(CMS_ENDPOINTS.artworks, query)
  )

  return response.data
}