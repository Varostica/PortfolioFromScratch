import { useEffect, useState } from 'react'
import type { SocialLink } from '../types/strapi'
import { getSocialLinks } from '../services'
import { Link as LinkIcon } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'

const ICON_MAP: Record<string, React.ElementType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  instagram: FaInstagram,
  youtube: FaYoutube,
  other: LinkIcon,
}

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
      {links.map((link) => {
        const Icon = ICON_MAP[link.platform] || LinkIcon
        return (
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
              <Icon className="h-5 w-5" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
