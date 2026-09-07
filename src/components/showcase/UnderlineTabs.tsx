import { useState } from 'react'
import { motion } from 'framer-motion'

const tabs = ['Preview', 'Code', 'Props']

export default function UnderlineTabs() {
  const [active, setActive] = useState(0)
  return (
    <div className="flex gap-6 border-b border-hairline">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={`relative pb-3 text-sm transition-colors ${
            active === i ? 'text-ink' : 'text-ink-faint hover:text-ink-dim'
          }`}
        >
          {tab}
          {active === i && (
            <motion.span
              layoutId="tab-underline"
              className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-signal-soft"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
