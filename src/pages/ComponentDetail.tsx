import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import PreviewFrame from '@/components/ui/PreviewFrame'
import CodeBlock from '@/components/ui/CodeBlock'
import CopyButton from '@/components/ui/CopyButton'
import Badge from '@/components/ui/Badge'
import ComponentCard from '@/components/ui/ComponentCard'
import { getComponentBySlug, components } from '@/data/components'

export default function ComponentDetail() {
  const { slug } = useParams()
  const entry = slug ? getComponentBySlug(slug) : undefined

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!entry) return <Navigate to="/components" replace />

  const related = components
    .filter((c) => c.category === entry.category && c.slug !== entry.slug)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-6 flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: 'Components', to: '/components' },
            { label: entry.category, to: `/components?category=${entry.category}` },
            { label: entry.name },
          ]}
        />
        <Link
          to="/components"
          className="hidden items-center gap-1.5 text-sm text-ink-faint transition-colors hover:text-ink sm:flex"
        >
          <ArrowLeft size={14} />
          Back
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center gap-2.5">
          <h1 className="font-display text-3xl font-medium text-ink sm:text-4xl">{entry.name}</h1>
          {entry.new && <Badge tone="flux">New</Badge>}
        </div>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-dim">
          {entry.description}
        </p>

        <div className="mt-8">
          <PreviewFrame
            preview={entry.preview}
            background={entry.previewBackground}
            fill={entry.previewFill}
            minHeight="22rem"
          />
        </div>

        <section className="mt-12">
          <h2 className="font-display text-lg font-medium text-ink">Installation</h2>
          <p className="mt-1.5 text-sm text-ink-dim">
            Install the dependencies this component needs.
          </p>
          <div className="mt-3 flex items-center justify-between rounded-lg border border-hairline bg-[#0d0d12] px-4 py-3">
            <code className="font-mono text-sm text-ink-dim">{entry.installCommand}</code>
            <CopyButton value={entry.installCommand} />
          </div>
          {entry.dependencies.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {entry.dependencies.map((dep) => (
                <Badge key={dep}>{dep}</Badge>
              ))}
            </div>
          )}
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg font-medium text-ink">Usage</h2>
          <p className="mt-1.5 text-sm text-ink-dim">Drop it into any page or layout.</p>
          <div className="mt-3">
            <CodeBlock code={entry.usage} language="tsx" filename="App.tsx" />
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-medium text-ink">Component source</h2>
          </div>
          <p className="mt-1.5 text-sm text-ink-dim">
            Copy the full component into your project and adjust freely.
          </p>
          <div className="mt-3">
            <CodeBlock code={entry.code} language="tsx" filename={`${entry.name}.tsx`} />
          </div>
        </section>

        {entry.props.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-lg font-medium text-ink">Props</h2>
            <div className="mt-3 overflow-hidden rounded-lg border border-hairline">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-hairline bg-surface-2 text-xs text-ink-faint">
                    <th className="px-4 py-2.5 font-medium">Prop</th>
                    <th className="px-4 py-2.5 font-medium">Type</th>
                    <th className="px-4 py-2.5 font-medium">Default</th>
                    <th className="px-4 py-2.5 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {entry.props.map((prop, i) => (
                    <tr
                      key={prop.name}
                      className={i !== entry.props.length - 1 ? 'border-b border-hairline-soft' : ''}
                    >
                      <td className="px-4 py-2.5 font-mono text-[13px] text-signal-soft">
                        {prop.name}
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[13px] text-ink-dim">{prop.type}</td>
                      <td className="px-4 py-2.5 font-mono text-[13px] text-ink-faint">
                        {prop.default ?? '—'}
                      </td>
                      <td className="px-4 py-2.5 text-ink-dim">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-lg font-medium text-ink">
              More in {entry.category}
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <ComponentCard key={r.slug} entry={r} index={i} />
              ))}
            </div>
          </section>
        )}
      </motion.div>
    </div>
  )
}
