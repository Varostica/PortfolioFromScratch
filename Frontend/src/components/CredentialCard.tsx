import type { Credential } from '../types/strapi'
import { toAbsoluteMediaUrl } from '../services'
import { ExternalLink, Maximize } from 'lucide-react'

interface CredentialCardProps {
  credential: Credential
  onClickImage: () => void
}

export default function CredentialCard({ credential, onClickImage }: CredentialCardProps) {
  const imgUrl = credential.image ? toAbsoluteMediaUrl(credential.image.url) : ''
  const issueDate = [credential.month, credential.year].filter(Boolean).join(' ')

  const handleShowCredential = () => {
    if (credential.showCredentialUrl) {
      window.open(credential.showCredentialUrl, '_blank', 'noopener,noreferrer')
    } else {
      onClickImage()
    }
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white
      shadow-[0_4px_5px_3px_rgba(136,85,53,0.15)]
      transition-all duration-500
      hover:-translate-y-1 hover:shadow-[0_4px_4px_5px_rgba(173,110,67,0.25)]"
    >
      <div className="relative cursor-pointer overflow-hidden" onClick={onClickImage}>
        {imgUrl && (
          <img
            src={imgUrl}
            alt={credential.title || 'Credential'}
            className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )}
        {issueDate && (
          <div className="absolute top-4 left-4 rounded-md bg-brand-900/80 px-3 py-1 text-xs font-bold tracking-wider text-white backdrop-blur-sm shadow-sm">
            {issueDate}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 text-lg font-bold text-text">
          {credential.title}
        </h3>

        {credential.subtitle && (
          <p className="mb-4 text-sm text-text-muted">
            {credential.subtitle}
          </p>
        )}

        <div className="mt-auto pt-4 flex justify-center">
          <button
            onClick={handleShowCredential}
            className="inline-flex w-full justify-center items-center gap-2 rounded-lg bg-brand-700 px-4 py-2.5
              text-sm font-medium text-white transition-all duration-200
              hover:-translate-y-0.5 hover:bg-brand-600 focus:ring-2 focus:ring-brand-500 focus:outline-none"
          >
            {credential.showCredentialUrl ? (
              <>
                <ExternalLink className="h-4 w-4" />
                {credential.showCredentialLabel || 'Show Credential'}
              </>
            ) : (
              <>
                <Maximize className="h-4 w-4" />
                {credential.showCredentialLabel || 'Show Credential'}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
