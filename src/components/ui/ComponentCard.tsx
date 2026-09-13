import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PreviewFrame from './PreviewFrame'
import Badge from './Badge'
import type { ComponentEntry } from '../../types'

export default function ComponentCard({ entry, index = 0 }: { entry: ComponentEntry; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col overflow-hidden rounded-xl border border-hairline bg-surface transition-colors hover:border-white/20"
    >
      <Link to={`/components/${entry.slug}`} className="block">
        <PreviewFrame
          preview={entry.preview}
          background={entry.previewBackground}
          fill={entry.previewFill}
          minHeight="13rem"
          className="rounded-none border-0 border-b border-hairline"
        />
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link to={`/components/${entry.slug}`} className="flex items-center gap-1.5">
              <h3 className="font-display text-[15px] font-medium text-ink">{entry.name}</h3>
              {entry.new && <Badge tone="flux">New</Badge>}
            </Link>
            <p className="mt-0.5 text-[13px] text-ink-faint">{entry.tagline}</p>
          </div>
          <Badge>{entry.category}</Badge>
        </div>

      </div>
    </motion.div>
  )
}
