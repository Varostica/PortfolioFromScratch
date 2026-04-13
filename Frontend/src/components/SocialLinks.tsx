import { useEffect, useState } from 'react'
import type { SocialLink } from '../types/strapi'
import { getSocialLinks } from '../services'

interface SocialLinksProps {
  filter?: 'hero' | 'footer'
  className?: string
  iconClassName?: string
}

export default function SocialLinks({
  filter,
  className = '',
  iconClassName = '',
}: SocialLinksProps) {
  const [links, setLinks] = useState<SocialLink[]>([])

  useEffect(() => {
    getSocialLinks()
      .then((data) => {
        if (filter === 'hero') setLinks(data.filter((l) => l.showInHero))
        else if (filter === 'footer') setLinks(data.filter((l) => l.showInFooter))
        else setLinks(data)
      })
      .catch(() => setLinks([]))
  }, [filter])

  if (links.length === 0) return null

  return (
    <ul className={`flex items-center gap-4 list-none p-0 ${className}`}>
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full
              bg-white text-brand-800 shadow-md
              transition-all duration-300
              hover:scale-110 hover:shadow-brand-500/40 hover:text-brand-500
              ${iconClassName}`}
          >
            <span className="text-sm font-bold">
              {link.label.charAt(0).toUpperCase()}
            </span>
          </a>
        </li>
      ))}
    </ul>
  )
}
