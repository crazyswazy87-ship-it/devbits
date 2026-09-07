import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Code2 } from 'lucide-react'
import CommandSearch from './CommandSearch'
import logo from "../../../public/assets/images/devbits.png"

const links = [
  { to: '/components', label: 'Components' },
  { to: '/components?category=Text', label: 'Categories' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'border-b border-hairline bg-canvas/80 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img 
            src={logo}
            alt='bd'
            className='nido'
          />

          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            dev<span className="text-ink-faint">bits</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-dim hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <CommandSearch />
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="grid h-9 w-9 place-items-center rounded-lg border border-hairline text-ink-dim transition-colors hover:border-white/20 hover:text-ink"
            aria-label="View source on GitHub"
          >
            <Code2 size={16} />
          </a>
        </div>

        <button
          className="grid h-9 w-9 place-items-center rounded-lg border border-hairline text-ink md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-hairline bg-canvas md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md px-3 py-2 text-sm text-ink-dim hover:bg-surface-2 hover:text-ink"
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2">
                <CommandSearch />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
