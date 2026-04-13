import { useEffect, useState } from 'react'
import { getSiteSettings } from '../services'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const [footer, setFooter] = useState({ text: '', year: new Date().getFullYear() })

  useEffect(() => {
    getSiteSettings()
      .then((s) =>
        setFooter({
          text: s.footerText ?? 'Designed & developed by Valentina Aróstica',
          year: new Date().getFullYear(),
        }),
      )
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-neutral-900 py-6 text-center text-neutral-300">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 md:flex-row md:justify-between">
        <p className="text-sm">{footer.text}</p>
        <p className="text-sm">Copyright &copy; {footer.year}</p>
        <SocialLinks
          filter="footer"
          iconClassName="bg-neutral-800 text-primary hover:text-brand-400 hover:shadow-brand-500/30"
        />
      </div>
    </footer>
  )
}
