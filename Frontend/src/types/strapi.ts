export interface StrapiMedia {
  id: number
  documentId?: string
  name?: string
  alternativeText?: string | null
  caption?: string | null
  url: string
  width?: number
  height?: number
}

export interface StrapiBlockChild {
  type: 'text' | 'link'
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  url?: string
  children?: StrapiBlockChild[]
}

export interface StrapiBlock {
  type: 'paragraph' | 'heading' | 'list' | 'list-item' | 'quote' | 'code' | 'image'
  level?: number
  format?: 'ordered' | 'unordered'
  children?: StrapiBlockChild[]
  image?: StrapiMedia
}

export interface StrapiSingleResponse<T> {
  data: T
  meta?: Record<string, never>
}

export interface StrapiCollectionResponse<T> {
  data: T[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface SiteSettings {
  id: number
  documentId?: string
  siteName: string
  siteTitle: string
  siteDescription: string
  primaryEmail: string
  location: string
  availabilityText: string
  githubUrl?: string
  linkedinUrl?: string
  instagramUrl?: string
  youtubeUrl?: string
  footerText?: string
  logo?: StrapiMedia | null
  favicon?: StrapiMedia | null
  seoImage?: StrapiMedia | null
}

export interface Homepage {
  id: number
  documentId?: string
  eyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroImage?: StrapiMedia | null
  heroCtaPrimaryText?: string
  heroCtaPrimaryUrl?: string
  heroCtaSecondaryText?: string
  heroCtaSecondaryUrl?: string
  introTitle?: string
  introText?: StrapiBlock[]
  websiteOverviewTitle?: string
  websiteOverviewText?: StrapiBlock[]
  showSocialLinks?: boolean
}

export interface AboutPage {
  id: number
  documentId?: string
  sectionTitle: string
  profileImage?: StrapiMedia[]
  bio: StrapiBlock[]
  nicknameLine?: string
  jobTitle?: string
  shortLocation?: string
  quote?: string
  quoteAuthor?: string
  hobbiesTitle?: string
  hobbiesIntro?: string
}


export interface ResumePage {
  id: number
  documentId?: string
  sectionTitle: string
  resumeFile?: StrapiMedia[]
  downloadButtonText?: string
  previewEnabled?: boolean
  shortResumeIntro?: string
}

export interface ContactPage {
  id: number
  documentId?: string
  sectionTitle: string
  sectionDescription?: string
  contactCardTitle?: string
  contactCardText?: string
  contactFormEnabled?: boolean
  successMessage?: string
}

export interface Project {
  id: number
  documentId?: string
  title: string
  slug: string
  shortDescription: string
  fullDescription?: StrapiBlock[]
  coverImage?: StrapiMedia | null
  gallery?: StrapiMedia[]
  stackSummary?: string
  githubUrl?: string
  liveUrl?: string
  referenceUrl?: string
  websiteUrl?: string
  ghLabel?: string
  demoLabel?: string
  referenceLabel?: string
  websiteLabel?: string
  referencesPdf?: StrapiMedia | null
  featured?: boolean
  sortOrder?: number
  year?: number
  projectStatus?: 'completed' | 'in-progress' | 'archived'
}

export interface SocialLink {
  id: number
  documentId?: string
  label: string
  platform: 'github' | 'linkedin' | 'instagram' | 'youtube' | 'other'
  url: string
  iconName?: string
  sortOrder?: number
  showInHero?: boolean
  showInFooter?: boolean
}

export interface Skill {
  id: number
  documentId?: string
  name: string
  category:
    | 'frontend'
    | 'backend'
    | 'language'
    | 'database'
    | 'cloud'
    | 'other'
  iconName?: string
  proficiency?: 'learning' | 'comfortable' | 'strong'
  sortOrder?: number
  featured?: boolean
}

export interface Tool {
  id: number
  documentId?: string
  name: string
  category:
    | 'ide'
    | 'design'
    | 'testing'
    | 'devops'
    | 'cloud'
    | 'office'
    | 'os'
    | 'other'
  iconName?: string
  sortOrder?: number
  featured?: boolean
}

export interface Artwork {
  id: number
  documentId?: string
  title: string
  subtitle?: string
  image?: StrapiMedia | null
  format?: 'vertical' | 'horizontal' | 'square'
  year?: number
  medium?: string
  featured?: boolean
  sortOrder?: number
}

export interface Credential {
  id: number
  documentId?: string
  title: string
  subtitle?: string
  image?: StrapiMedia | null
  format?: 'vertical' | 'horizontal' | 'square'
  year?: number
  month?: string 
  medium?: string
  featured?: boolean
  sortOrder?: number
  showCredentialUrl?: string
  showCredentialLabel?: string
}

export interface Hobby {
  id: number
  documentId?: string
  name: string
  description?: string
  iconName?: string
  sortOrder?: number
}