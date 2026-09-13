import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Terminal } from 'lucide-react'
import { components } from '../data/components'
import { categories } from '../data/categories'
import ParticleText from '../components/showcase/ParticleText'
import ScrollVelocity from '../components/showcase/ScrollVelocity'
//import HeroField from '../components/showcase/HeroField'
import ComponentCard from '../components/ui/ComponentCard'
import Ferrofluid from '../components/layout/Ferrofluid'
import { GlassButton } from '../components/showcase/GlassButton'
import ArrowFillButton from '../components/layout/ArrowFillButton'
import WarpText from '../components/layout/WrapText'
import Galaxy from '../components/layout/Galaxy'
import ToggleSwitch from '../components/layout/ToggleSwitch'

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
  const [galaxyIndex, setGalaxyIndex] = useState<4 | 6>(6);
  const isGalaxy6 = galaxyIndex === 6;

  const navigate = useNavigate();
  return (
    <div>
     {/* Hero */}
      <section className="hero-section relative overflow-hidden">

        {/* Galaxy Background */}
        <div
          className="galaxy-container"
          style={{ zIndex: galaxyIndex }}
        >
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.09}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.9}
            rotationSpeed={0.15}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.8}
            speed={1}
          />
        </div>

        {/* Hero Content */}
        <div className="hero-inner">

          {/* Dev Bits */}
          <div className="particle-text-layer">
            <ParticleText
              text="Dev Bits"
              particleSize={3.1}
              density={7}
              color="#f8fafc"
              highlightColor="#f7f5fc"
              scatter={190}
              gatherDuration={2900}
              stagger={420}
              pointerRepel={42}
              repelRadius={120}
              idleDrift={0.8}
              trigger="mount"
              fontSize="clamp(3.5rem, 13vw, 9rem)"
              fontWeight={800}
              fontFamily="inherit"
              glow
            />
          </div>

          {/* Toggle */}
          <div className="hero-switch">
            <ToggleSwitch
              isActive={isGalaxy6}
              onChange={(active) => {
                setGalaxyIndex(active ? 6 : 4);
              }}
              size="md"
              colorTheme="default"
              glassEffect
              className="switch"
            />
          </div>

          {/* Main Text */}
          <div className="hero-copy">

            <div className="warp-text-layer">
              <WarpText
                text="Build interfaces that feel alive."
                color="#f8f5ff"
                warpStrength={0.18}
                warpScale={1.7}
                speed={0.55}
                pointerInfluence={0.42}
                pointerStrength={0.38}
                refraction={0.018}
                ripple
                fontSize={116}
                fontWeight={800}
                style={{ height: "260px" }}
                fontFamily="inherit"
                letterSpacing={-0.04}
                lineHeight={0.9}
              />
            </div>

            <p className="hero-description">
              A collection of interactive components built for modern
              interfaces, motion, and immersive digital experiences.
            </p>

            {/* Buttons */}
            <div className="hero-actions"
              style={{
              position: "relative",
              zIndex: 10,
            }}>

              <ArrowFillButton
              onClick={() => navigate("/components")}>
                Components
              </ArrowFillButton>
            </div>

          </div>

        </div>

      </section>

      {/* Marquee strip */}
      <section className=" py-5">
        <ScrollVelocity
          texts={['Dev Bits', 'Explore Components']}
          velocity={100}
          className="custom-scroll-text"
          numCopies={6}
          damping={50}
          stiffness={400}
        />
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

        <div className=" grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
                  className="pricing-card group flex h-full flex-col justify-between rounded-xl border border-hairline bg-surface p-5 transition-colors hover:border-white/20 hover:bg-surface-2"
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
              A handful worth trying first hover each preview to see the
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
        <div className="relative isolate flex flex-col items-center gap-6 overflow-hidden rounded-2xl border border-hairline bg-surface px-8 py-14 text-center">

          {/* Ferrofluid background */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <Ferrofluid
              colors={["#ffffff", "#ffffff", "#ffffff"]}
              speed={0.5}
              scale={1.3}
              turbulence={1.3}
              fluidity={0.03}
              rimWidth={0.18}
              sharpness={2.5}
              shimmer={1.5}
              glow={4.9}
              flowDirection="down"
              opacity={0.35}
              mouseInteraction
              mouseStrength={1.2}
              mouseRadius={0.35}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-display text-2xl font-medium text-ink sm:text-3xl">
              Built for your codebase
            </h2>

            <p className="max-w-md text-sm leading-relaxed text-ink-dim">
             Every component gives you the full source. Take what you need, adapt it to your stack, and make it yours.
            </p>

            <GlassButton
              className="flex items-center gap-2 whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-medium transition-transform hover:scale-[1.02]"
              onClick={() => navigate("/components")}
            >
              <Terminal size={15} />
              npm install framer-motion
            </GlassButton>
          </div>
        </div>
      </section>
    </div>
  )
}
