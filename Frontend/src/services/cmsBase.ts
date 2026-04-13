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

export { fetchJson }