import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal } from 'lucide-react'
import HeroField from '@/components/showcase/HeroField'
import ComponentCard from '@/components/ui/ComponentCard'
import InfiniteMarquee from '@/components/showcase/InfiniteMarquee'
import { components } from '@/data/components'
import { categories } from '@/data/categories'

const featuredSlugs = [
  'spotlight-card',
  'magnetic-button',
  'aurora-background',
  'floating-dock',
  'flip-card-3d',
  'split-reveal',
]
const featured = featuredSlugs
  .map((slug) => components.find((c) => c.slug === slug))
  .filter((c): c is NonNullable<typeof c> => Boolean(c))

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <HeroField />
        <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-28 text-center sm:pt-36">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-2/80 px-3.5 py-1.5 text-xs text-ink-dim backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-flux" />
            16 components across 8 categories
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl"
          >
            Interface pieces that
            <br />
            <span className="text-gradient">move with intent.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-lg text-balance text-[15px] leading-relaxed text-ink-dim"
          >
            A library of copy-paste React components, animated with Framer
            Motion and styled with Tailwind. No install step, no lock-in —
            take the code and make it yours.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link
              to="/components"
              className="group flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-transform hover:scale-[1.02]"
            >
              Browse components
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#install"
              className="flex items-center gap-2 rounded-lg border border-hairline bg-surface-2/60 px-5 py-2.5 text-sm font-medium text-ink-dim backdrop-blur transition-colors hover:border-white/20 hover:text-ink"
            >
              <Terminal size={15} />
              npm install framer-motion
            </a>
          </motion.div>
        </div>
      </section>

      {/* Marquee strip */}
      <section className="border-y border-hairline bg-surface/40 py-5">
        <InfiniteMarquee />
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
              Eight categories, one language
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-dim">
              Every component shares the same tokens and motion vocabulary, so
              mixing categories never looks inconsistent.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const count = components.filter((c) => c.category === cat.id).length
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
              >
                <Link
                  to={`/components?category=${cat.id}`}
                  className="group flex h-full flex-col justify-between rounded-xl border border-hairline bg-surface p-5 transition-colors hover:border-white/20 hover:bg-surface-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-hairline bg-surface-2 text-ink-dim transition-colors group-hover:text-signal-soft">
                      {cat.icon}
                    </span>
                    <span className="text-xs text-ink-faint">{count}</span>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-display text-[15px] font-medium text-ink">{cat.label}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-ink-faint">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Featured components */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
              Featured components
            </h2>
            <p className="mt-2 max-w-md text-sm text-ink-dim">
              A handful worth trying first — hover each preview to see the
              interaction, then grab the code.
            </p>
          </div>
          <Link
            to="/components"
            className="hidden shrink-0 items-center gap-1.5 text-sm text-ink-dim transition-colors hover:text-ink sm:flex"
          >
            View all
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((entry, i) => (
            <ComponentCard key={entry.slug} entry={entry} index={i} />
          ))}
        </div>

        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            to="/components"
            className="flex items-center gap-1.5 text-sm text-ink-dim hover:text-ink"
          >
            View all components
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Install strip */}
      <section id="install" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="flex flex-col items-center gap-6 rounded-2xl border border-hairline bg-surface px-8 py-14 text-center">
          <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
            No package to install
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-ink-dim">
            Every component page gives you the full source. Copy it into your
            project, adjust the tokens, and it's yours — no dependency on this
            site, ever.
          </p>
          <Link
            to="/components"
            className="flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-transform hover:scale-[1.02]"
          >
            Start browsing
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  )
}
