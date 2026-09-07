export default function PerspectiveGrid() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas [perspective:300px]">
      <div className="absolute inset-x-0 bottom-0 h-2/3 [transform:rotateX(75deg)] [transform-origin:bottom]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #7c5cff33 1px, transparent 1px), linear-gradient(to bottom, #7c5cff33 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            animation: 'grid-pan 6s linear infinite',
          }}
        />
      </div>
      <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-signal-soft/60 to-transparent" />
      <div className="relative grid h-full place-items-center">
        <span className="rounded-md border border-white/10 bg-canvas/70 px-3 py-1 text-xs text-ink-dim backdrop-blur">
          depth field
        </span>
      </div>
    </div>
  )
}
