import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, CornerDownLeft, X } from 'lucide-react'
import { components } from '@/data/components'
import { searchComponents } from '@/lib/search'

export default function CommandSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = searchComponents(components, query).slice(0, 8)

  useEffect(() => {
    function handleGlobalKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement
      const isTyping =
        target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable

      if (e.key === '/' && !isTyping) {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleGlobalKey)
    return () => window.removeEventListener('keydown', handleGlobalKey)
  }, [open])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActiveIndex(0)
      requestAnimationFrame(() => inputRef.current?.focus())
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => setActiveIndex(0), [query])

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      navigate(`/components/${results[activeIndex].slug}`)
      setOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex w-full max-w-[220px] items-center gap-2.5 rounded-lg border border-hairline bg-surface-2 px-3 py-2 text-sm text-ink-faint transition-colors hover:border-white/20 hover:text-ink-dim"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Search components</span>
        <kbd className="rounded border border-hairline bg-surface-3 px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
          /
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg overflow-hidden rounded-xl border border-hairline bg-surface-2 shadow-2xl shadow-black/50"
            >
              <div className="flex items-center gap-3 border-b border-hairline-soft px-4 py-3.5">
                <Search size={16} className="text-ink-faint" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search by name, category, or description…"
                  className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="text-ink-faint hover:text-ink"
                  aria-label="Close search"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2">
                {results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-ink-faint">
                    No components match "{query}".
                  </div>
                ) : (
                  results.map((entry, i) => (
                    <button
                      key={entry.slug}
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => {
                        navigate(`/components/${entry.slug}`)
                        setOpen(false)
                      }}
                      className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                        activeIndex === i ? 'bg-surface-3' : ''
                      }`}
                    >
                      <div>
                        <div className="text-sm text-ink">{entry.name}</div>
                        <div className="text-xs text-ink-faint">{entry.tagline}</div>
                      </div>
                      <span className="rounded border border-hairline px-1.5 py-0.5 text-[10px] text-ink-dim">
                        {entry.category}
                      </span>
                    </button>
                  ))
                )}
              </div>

              <div className="flex items-center gap-4 border-t border-hairline-soft px-4 py-2.5 text-[11px] text-ink-faint">
                <span className="flex items-center gap-1">
                  <CornerDownLeft size={11} /> select
                </span>
                <span>↑↓ navigate</span>
                <span>esc close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
