import { useRef, useState } from 'react'

const COLS = 14
const ROWS = 7

export default function DotFieldBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const dots = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      dots.push({ r, c })
    }
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setMouse(null)}
      className="relative h-full w-full overflow-hidden rounded-xl bg-canvas"
    >
      <div className="grid h-full w-full place-items-center gap-y-3 px-6 py-6">
        <div
          className="grid h-full w-full"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {dots.map(({ r, c }) => {
            const cellW = 100 / COLS
            const cellH = 100 / ROWS
            const cx = c * cellW + cellW / 2
            const cy = r * cellH + cellH / 2
            let scale = 1
            let opacity = 0.35
            if (mouse && ref.current) {
              const rect = ref.current.getBoundingClientRect()
              const px = (cx / 100) * rect.width
              const py = (cy / 100) * rect.height
              const dist = Math.hypot(mouse.x - px, mouse.y - py)
              const influence = Math.max(0, 1 - dist / 90)
              scale = 1 + influence * 1.8
              opacity = 0.35 + influence * 0.65
            }
            return (
              <div key={`${r}-${c}`} className="flex items-center justify-center">
                <span
                  className="block h-1 w-1 rounded-full bg-signal-soft transition-transform duration-150 ease-out"
                  style={{ transform: `scale(${scale})`, opacity }}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
