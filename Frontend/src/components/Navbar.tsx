import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'

import { Home, User, FolderOpen, Image as ImageIcon, FileText, Mail, ShoppingBag } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/about', label: 'About', icon: User },
  { to: '/projects', label: 'Projects', icon: FolderOpen },
  { to: '/artgallery', label: 'Art', icon: ImageIcon },
  { to: '/products', label: 'Products', icon: ShoppingBag },
  { to: '/resume', label: 'Resume', icon: FileText },
  { to: '/contact', label: 'Contact', icon: Mail },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY >= 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // close mobile menu on route change
  useEffect(() => setOpen(false), [pathname])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/80 shadow-[0_10px_10px_0_rgba(255,148,71,0.18)] backdrop-blur-xl'
          : 'bg-transparent'
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo / Brand */}
        <Link to="/" className="no-underline flex items-center">
          <img src={logo} alt="Varostica" className="h-8 md:h-10 w-auto object-contain" />
        </Link>

        {/* Hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          className="flex flex-col gap-[5px] md:hidden"
          onClick={() => setOpen(!open)}
        >
          <span
            className={`block h-[3px] w-6 rounded bg-brand-500 transition-transform duration-300
              ${open ? 'translate-y-2 rotate-[135deg]' : ''}`}
          />
          <span
            className={`block h-[3px] w-6 rounded bg-brand-500 transition-opacity duration-200
              ${open ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-[3px] w-6 rounded bg-brand-500 transition-transform duration-300
              ${open ? '-translate-y-2 -rotate-[135deg]' : ''}`}
          />
        </button>

        {/* Links */}
        <ul
          className={`md:flex md:items-center md:gap-1 list-none m-0 p-0
            ${open
              ? 'absolute top-full left-0 right-0 flex flex-col bg-brand-900/95 backdrop-blur-lg px-6 py-4 gap-1'
              : 'hidden'
            }`}
        >
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
            const active = pathname === to
            return (
              <li key={to}>
                <Link
                  to={to}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium no-underline transition-colors duration-200
                    ${open ? 'text-white' : 'text-text'}
                    ${active ? 'text-brand-500' : ''}
                    hover:text-brand-500
                    group`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  <span
                    className={`absolute bottom-0 left-4 h-[3px] rounded-full bg-brand-500 transition-all duration-300
                      ${active ? 'w-[calc(100%-2rem)]' : 'w-0 group-hover:w-[calc(100%-2rem)]'}`}
                  />
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
