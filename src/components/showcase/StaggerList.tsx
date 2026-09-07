import { motion } from 'framer-motion'

const items = ['Design tokens', 'Component API', 'Motion presets', 'Ship it']

export default function StaggerList() {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-10%' }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="w-56 space-y-2.5"
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{
            hidden: { opacity: 0, x: -14 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 rounded-lg border border-hairline bg-surface-2 px-3.5 py-2.5 text-sm text-ink"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-flux" />
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}
