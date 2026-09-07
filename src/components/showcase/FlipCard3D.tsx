export default function FlipCard3D() {
  return (
    <div className="group h-40 w-56 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-xl border border-hairline bg-surface-2 [backface-visibility:hidden]">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-signal to-flux" />
          <span className="text-sm text-ink-dim">Hover to flip</span>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl border border-hairline bg-surface-3 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="font-display text-lg text-ink">Face two</span>
          <span className="text-xs text-ink-faint">Real 3D transforms</span>
        </div>
      </div>
    </div>
  )
}
