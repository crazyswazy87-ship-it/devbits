import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import ComponentCard from '@/components/ui/ComponentCard'
import { components } from '@/data/components'
import { categories } from '@/data/categories'
import { searchComponents } from '@/lib/search'
import type { Category } from '@/types'

export default function ComponentsLibrary() {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') as Category | null
  const [query, setQuery] = useState('')

  const active: Category | 'All' =
    categoryParam && categories.some((c) => c.id === categoryParam) ? categoryParam : 'All'

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: components.length }
    for (const c of categories) {
      map[c.id] = components.filter((entry) => entry.category === c.id).length
    }
    return map
  }, [])

  const filtered = useMemo(() => {
    let list = active === 'All' ? components : components.filter((c) => c.category === active)
    if (query.trim()) list = searchComponents(list, query)
    return list
  }, [active, query])

  function handleSelect(category: Category | 'All') {
    if (category === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', category)
    }
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <div className="mb-10">
        <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">Components</h1>
        <p className="mt-2 max-w-lg text-sm text-ink-dim">
          {components.length} animated components, ready to copy into any
          React + Tailwind project.
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter this list…"
            className="w-full rounded-lg border border-hairline bg-surface-2 py-2.5 pl-9 pr-9 text-sm text-ink placeholder:text-ink-faint focus:border-white/20 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
              aria-label="Clear filter"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 lg:hidden">
          <FilterChip label="All" isActive={active === 'All'} onClick={() => handleSelect('All')} />
          {categories.map((c) => (
            <FilterChip
              key={c.id}
              label={c.label}
              isActive={active === c.id}
              onClick={() => handleSelect(c.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-10">
        <Sidebar active={active} onSelect={handleSelect} counts={counts} />

        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-hairline py-24 text-center">
              <p className="text-sm text-ink-dim">No components match your filters.</p>
              <button
                onClick={() => {
                  setQuery('')
                  handleSelect('All')
                }}
                className="mt-3 text-sm text-signal-soft hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((entry, i) => (
                <ComponentCard key={entry.slug} entry={entry} index={i} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
        isActive
          ? 'border-white/20 bg-surface-3 text-ink'
          : 'border-hairline text-ink-faint hover:text-ink-dim'
      }`}
    >
      {label}
    </button>
  )
}
