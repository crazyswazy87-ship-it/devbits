const tags = ['Accessible', 'Typed', 'Tree-shakeable', 'Themeable', 'Zero-config', 'Fast']

export default function InfiniteMarquee() {
  const loop = [...tags, ...tags]
  return (
    <div className="mask-fade-x w-full overflow-hidden">
      <div className="flex w-max animate-marquee gap-3">
        {loop.map((tag, i) => (
          <span
            key={i}
            className="shrink-0 rounded-full border border-hairline bg-surface-2 px-4 py-2 text-sm text-ink-dim"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
