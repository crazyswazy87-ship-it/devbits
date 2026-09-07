import { motion } from 'framer-motion'

const NODE_COUNT = 60

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function HeroField() {
  const nodes = Array.from({ length: NODE_COUNT }, (_, i) => ({
    x: seededRandom(i * 3.1) * 100,
    y: seededRandom(i * 7.7 + 1) * 100,
    r: seededRandom(i * 5.3 + 2) * 1.6 + 0.6,
    delay: seededRandom(i * 2.9 + 3) * 1.2,
  }))

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="bg-line-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_20%,black,transparent)]" />
      <svg className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none">
        {nodes.map((n, i) => (
          <motion.circle
            key={i}
            cx={`${n.x}%`}
            cy={`${n.y}%`}
            r={n.r}
            fill="url(#node-grad)"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.9, 0.5], scale: [0, 1, 1] }}
            transition={{ duration: 1.4, delay: n.delay, ease: 'easeOut' }}
          />
        ))}
        <defs>
          <radialGradient id="node-grad">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c5cff" />
          </radialGradient>
        </defs>
      </svg>
      <div className="absolute left-1/2 top-0 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-signal/20 blur-[110px]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
    </div>
  )
}
