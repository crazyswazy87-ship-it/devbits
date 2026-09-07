import type { ComponentType } from 'react'
import { cn } from '@/lib/utils'

interface PreviewFrameProps {
  preview: ComponentType
  background?: 'grid' | 'dot' | 'plain' | 'dark'
  fill?: boolean
  className?: string
  minHeight?: string
}

const backgrounds: Record<string, string> = {
  grid: 'bg-line-grid bg-canvas',
  dot: 'bg-dot-grid bg-canvas',
  plain: 'bg-canvas',
  dark: 'bg-[#08080c]',
}

export default function PreviewFrame({
  preview: Preview,
  background = 'grid',
  fill = false,
  className,
  minHeight = '14rem',
}: PreviewFrameProps) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden rounded-xl border border-hairline',
        backgrounds[background],
        className
      )}
      style={{ minHeight }}
    >
      {fill ? (
        <div className="absolute inset-0">
          <Preview />
        </div>
      ) : (
        <Preview />
      )}
    </div>
  )
}
