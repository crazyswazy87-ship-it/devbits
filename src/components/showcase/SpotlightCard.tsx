import { useRef, useState } from 'react'

export default function SpotlightCard() {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="relative w-72 overflow-hidden rounded-xl border border-hairline bg-surface-2 p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x}% ${pos.y}%, rgba(124,92,255,0.18), transparent 70%)`,
        }}
      />
      <div className="relative">
        <div className="mb-3 h-9 w-9 rounded-md bg-gradient-to-br from-signal to-flux" />
        <h4 className="font-display text-lg font-medium text-ink">Spotlight</h4>
        <p className="mt-1.5 text-sm leading-relaxed text-ink-dim">
          A soft light that follows your cursor across the surface.
        </p>
      </div>
    </div>
  )
}
