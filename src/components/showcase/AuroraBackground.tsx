import { motion } from 'framer-motion'

export default function AuroraBackground() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas">
      <motion.div
        className="absolute -left-10 top-0 h-56 w-56 rounded-full opacity-60 blur-3xl"
        style={{ background: '#7c5cff' }}
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-8 h-48 w-48 rounded-full opacity-50 blur-3xl"
        style={{ background: '#45e0c4' }}
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full opacity-40 blur-3xl"
        style={{ background: '#ff6b57' }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="bg-noise absolute inset-0 opacity-[0.04]" />
      <div className="relative flex h-full items-center justify-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-ink-dim backdrop-blur">
          aurora field
        </span>
      </div>
    </div>
  )
}
