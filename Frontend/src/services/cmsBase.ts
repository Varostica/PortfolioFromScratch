import { fetchJson } from './apiClient'

const STRAPI_API_URL = import.meta.env.VITE_STRAPI_API_URL

if (!STRAPI_API_URL) {
  throw new Error('Missing VITE_STRAPI_API_URL in .env')
}

export const CMS_ENDPOINTS = {
  siteSettings: '/site-setting',
  homepage: '/homepage',
  aboutPage: '/about',
  resumePage: '/resume-page',
  contactPage: '/contact-page',
  projects: '/projects',
  socialLinks: '/social-links',
  skills: '/skills',
  tools: '/tools',
  artworks: '/art-works',
  hobbies: '/hobbies',
  productsPage: '/product-page',
} as const

export function buildCmsUrl(path: string, query?: string) {
  return `${STRAPI_API_URL}${path}${query ? `?${query}` : ''}`
}

export function buildQuery(options?: {
  populateAll?: boolean
  sort?: string[]
}) {
  const params = new URLSearchParams()

  if (options?.populateAll) {
    params.set('populate', '*')
  }

  options?.sort?.forEach((value, index) => {
    params.set(`sort[${index}]`, value)
  })

  return params.toString()
}

export function getStrapiOrigin() {
  return STRAPI_API_URL.replace(/\/api\/?$/, '')
}

export function toAbsoluteMediaUrl(url?: string | null) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${getStrapiOrigin()}${url}`
}

/**
 * Like toAbsoluteMediaUrl, but also rewrites Cloudinary private-delivery URLs
 * (res.cloudinary.com/.../private/...) to public upload URLs so that PDFs and
 * other file assets stored as 'private' in Cloudinary can be accessed without
 * a signed token. This fixes HTTP 401 errors when previewing/downloading CVs.
 */
export function toPublicMediaUrl(url?: string | null): string {
  const absolute = toAbsoluteMediaUrl(url)
  if (!absolute) return ''
  // Cloudinary private assets: replace /private/ with /upload/ in the path
  return absolute.replace(
    /(res\.cloudinary\.com\/[^/]+\/(?:image|video|raw)\/)(private)(\/)/, 
    '$1upload$3'
  )
}

export { fetchJson }