import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), {
    stiffness: 200,
    damping: 20,
  })
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), {
    stiffness: 200,
    damping: 20,
  })
  const glareX = useTransform(x, [0, 1], ['0%', '100%'])
  const glareY = useTransform(y, [0, 1], ['0%', '100%'])

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  function reset() {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-64 rounded-xl border border-hairline bg-surface-2 p-6"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-40"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(180px circle at ${gx} ${gy}, rgba(255,255,255,0.25), transparent 60%)`
            ),
          }}
        />
        <div style={{ transform: 'translateZ(40px)' }}>
          <div className="mb-3 h-8 w-8 rounded-md border border-hairline bg-canvas" />
          <h4 className="font-display text-lg font-medium text-ink">Tilt</h4>
          <p className="mt-1.5 text-sm text-ink-dim">Responds to cursor position in 3D.</p>
        </div>
      </motion.div>
    </div>
  )
}
