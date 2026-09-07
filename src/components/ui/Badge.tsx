import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export default function Badge({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode
  className?: string
  tone?: 'default' | 'signal' | 'flux'
}) {
  const tones = {
    default: 'border-hairline text-ink-dim bg-surface-2',
    signal: 'border-signal/30 text-signal-soft bg-signal/10',
    flux: 'border-flux/30 text-flux bg-flux/10',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-medium tracking-wide',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}
