import { categories } from '@/data/categories'
import { cn } from '@/lib/utils'
import type { Category } from '@/types'

interface SidebarProps {
  active: Category | 'All'
  onSelect: (category: Category | 'All') => void
  counts: Record<string, number>
}

export default function Sidebar({ active, onSelect, counts }: SidebarProps) {
  return (
    <aside className="sticky top-24 hidden h-fit w-56 shrink-0 lg:block">
      <h3 className="px-2 text-xs font-medium text-ink-faint">Browse</h3>
      <nav className="mt-2 flex flex-col gap-0.5">
        <button
          onClick={() => onSelect('All')}
          className={cn(
            'flex items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition-colors',
            active === 'All' ? 'bg-surface-2 text-ink' : 'text-ink-dim hover:bg-surface-2/60 hover:text-ink'
          )}
        >
          All components
          <span className="text-xs text-ink-faint">{counts.All}</span>
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={cn(
              'flex items-center justify-between rounded-md px-2.5 py-2 text-left text-sm transition-colors',
              active === c.id ? 'bg-surface-2 text-ink' : 'text-ink-dim hover:bg-surface-2/60 hover:text-ink'
            )}
          >
            <span className="flex items-center gap-2">
              <span className="text-ink-faint">{c.icon}</span>
              {c.label}
            </span>
            <span className="text-xs text-ink-faint">{counts[c.id] ?? 0}</span>
          </button>
        ))}
      </nav>
    </aside>
  )
}
