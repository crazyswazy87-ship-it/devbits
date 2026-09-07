import { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, Search, Layers, Settings, Mail } from 'lucide-react'

const dockItems = [
  { icon: Home, label: 'Home' },
  { icon: Search, label: 'Search' },
  { icon: Layers, label: 'Library' },
  { icon: Mail, label: 'Inbox' },
  { icon: Settings, label: 'Settings' },
]

export default function FloatingDock() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-hairline bg-surface-2 px-3 py-2.5">
      {dockItems.map((item, i) => {
        const isHovered = hovered === i
        const isNeighbor = hovered !== null && Math.abs(hovered - i) === 1
        const scale = isHovered ? 1.5 : isNeighbor ? 1.15 : 1
        return (
          <motion.button
            key={item.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            animate={{ scale, y: isHovered ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-surface-3 text-ink-dim hover:text-ink"
            aria-label={item.label}
          >
            <item.icon size={16} />
          </motion.button>
        )
      })}
    </div>
  )
}
