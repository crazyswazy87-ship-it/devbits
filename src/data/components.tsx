import type { ComponentEntry } from '@/types'

import SplitReveal from '../components/showcase/SplitReveal'
import ShimmerText from '../components/showcase/ShimmerText'
import MagneticButton from '../components/showcase/MagneticButton'
import GlowButton from '../components/showcase/GlowButton'
import SpotlightCard from '../components/showcase/SpotlightCard'
import TiltCard from '../components/showcase/TiltCard'
import AuroraBackground from '../components/showcase/AuroraBackground'
import DotFieldBackground from '../components/showcase/DotFieldBackground'
import StaggerList from '../components/showcase/StaggerList'
import MorphBlob from '../components/showcase/MorphBlob'
import InfiniteMarquee from '../components/showcase/InfiniteMarquee'
import GlitchText from '../components/showcase/GlitchText'
import FloatingDock from '../components/showcase/FloatingDock'
import UnderlineTabs from '../components/showcase/UnderlineTabs'
import FlipCard3D from '../components/showcase/FlipCard3D'
import PerspectiveGrid from '../components/showcase/PerspectiveGrid'

export const components: ComponentEntry[] = [
  {
    slug: 'split-reveal',
    name: 'SplitReveal',
    category: 'Text',
    tagline: 'Per-character entrance reveal',
    description:
      'Splits a line into words and characters, then animates each one up into place with a staggered delay. Good for headlines that need a first-load moment.',
    preview: SplitReveal,
    previewBackground: 'grid',
    new: true,
    installCommand: 'npm install framer-motion',
    dependencies: ['framer-motion'],
    props: [
      { name: 'text', type: 'string', default: '""', description: 'The line to animate in.' },
      { name: 'delay', type: 'number', default: '0.03', description: 'Stagger delay between characters, in seconds.' },
      { name: 'className', type: 'string', default: '—', description: 'Additional classes for the wrapper.' },
    ],
    usage: `import SplitReveal from './SplitReveal'

export default function Hero() {
  return <SplitReveal text="Motion that reads." />
}`,
    code: `import { motion } from 'framer-motion'

interface SplitRevealProps {
  text: string
  delay?: number
}

export default function SplitReveal({ text, delay = 0.03 }: SplitRevealProps) {
  const words = text.split(' ')

  return (
    <div className="flex flex-wrap justify-center gap-x-3 text-center">
      {words.map((word, wi) => (
        <span key={wi} className="flex overflow-hidden">
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{
                duration: 0.6,
                delay: wi * 0.08 + ci * delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block font-medium"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'shimmer-text',
    name: 'ShimmerText',
    category: 'Text',
    tagline: 'Looping gradient sweep across type',
    description:
      'A pure-CSS keyframe animation sweeps a light gradient across the text fill. Cheap to run and works on any string, including dynamic content.',
    preview: ShimmerText,
    previewBackground: 'plain',
    installCommand: 'npm install clsx',
    dependencies: [],
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Text content to render.' },
      { name: 'speed', type: 'number', default: '3.2', description: 'Duration of one sweep, in seconds.' },
    ],
    usage: `import ShimmerText from './ShimmerText'

<ShimmerText>Built different.</ShimmerText>`,
    code: `interface ShimmerTextProps {
  children: React.ReactNode
  speed?: number
}

export default function ShimmerText({ children, speed = 3.2 }: ShimmerTextProps) {
  return (
    <p
      className="bg-clip-text font-semibold text-transparent"
      style={{
        backgroundImage:
          'linear-gradient(110deg, #4b4b58 30%, #ffffff 45%, #4b4b58 60%)',
        backgroundSize: '250% 100%',
        animation: \`shimmer-sweep \${speed}s linear infinite\`,
      }}
    >
      {children}
      <style>{\`
        @keyframes shimmer-sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -100% 0; }
        }
      \`}</style>
    </p>
  )
}`,
  },
  {
    slug: 'magnetic-button',
    name: 'MagneticButton',
    category: 'Buttons',
    tagline: 'Follows the cursor within its bounds',
    description:
      'Tracks pointer position relative to the button center and offsets the button toward it with a spring, then snaps back on mouse leave.',
    preview: MagneticButton,
    previewBackground: 'grid',
    new: true,
    installCommand: 'npm install framer-motion',
    dependencies: ['framer-motion'],
    props: [
      { name: 'strength', type: 'number', default: '0.35', description: 'How far the button travels toward the cursor.' },
      { name: 'children', type: 'ReactNode', default: '—', description: 'Button label or content.' },
    ],
    usage: `import MagneticButton from './MagneticButton'

<MagneticButton>Pull me closer</MagneticButton>`,
    code: `import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
}

export default function MagneticButton({ children, strength = 0.35 }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPos({
      x: (e.clientX - rect.left - rect.width / 2) * strength,
      y: (e.clientY - rect.top - rect.height / 2) * strength,
    })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.3 }}
      className="rounded-full bg-white px-7 py-3 font-medium text-black"
    >
      {children}
    </motion.button>
  )
}`,
  },
  {
    slug: 'glow-button',
    name: 'GlowButton',
    category: 'Buttons',
    tagline: 'Rotating conic-gradient border',
    description:
      'A one-pixel border built from a spinning conic gradient, masked to a rounded rectangle. The glow intensifies on hover.',
    preview: GlowButton,
    previewBackground: 'plain',
    installCommand: 'npm install clsx',
    dependencies: [],
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Button label.' },
      { name: 'onClick', type: '() => void', default: '—', description: 'Click handler.' },
    ],
    usage: `import GlowButton from './GlowButton'

<GlowButton>Get started</GlowButton>`,
    code: `export default function GlowButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative rounded-lg p-[1.5px]">
      <span
        className="absolute inset-0 rounded-lg opacity-70 transition-opacity group-hover:opacity-100"
        style={{
          background: 'conic-gradient(from 0deg, #7c5cff, #45e0c4, #7c5cff)',
          animation: 'spin-border 2.5s linear infinite',
        }}
      />
      <span className="relative flex items-center gap-2 rounded-[7px] bg-neutral-900 px-6 py-2.5 font-medium text-white">
        {children}
      </span>
      <style>{\`
        @keyframes spin-border {
          to { transform: rotate(360deg); }
        }
      \`}</style>
    </button>
  )
}`,
  },
  {
    slug: 'spotlight-card',
    name: 'SpotlightCard',
    category: 'Cards',
    tagline: 'Cursor-tracked radial light',
    description:
      'Listens to mouse position inside the card and paints a soft radial gradient at that point, fading in and out on enter and leave.',
    preview: SpotlightCard,
    previewBackground: 'dot',
    new: true,
    installCommand: 'npm install framer-motion',
    dependencies: [],
    props: [
      { name: 'radius', type: 'number', default: '280', description: 'Diameter of the spotlight in pixels.' },
      { name: 'children', type: 'ReactNode', default: '—', description: 'Card content.' },
    ],
    usage: `import SpotlightCard from './SpotlightCard'

<SpotlightCard>
  <h4>Spotlight</h4>
  <p>A soft light that follows your cursor.</p>
</SpotlightCard>`,
    code: `import { useRef, useState } from 'react'

export default function SpotlightCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [active, setActive] = useState(false)

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
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
      className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: active ? 1 : 0,
          background: \`radial-gradient(280px circle at \${pos.x}% \${pos.y}%, rgba(124,92,255,0.18), transparent 70%)\`,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}`,
  },
  {
    slug: 'tilt-card',
    name: 'TiltCard',
    category: 'Cards',
    tagline: '3D perspective tilt with glare',
    description:
      'Maps pointer position to rotateX/rotateY springs for a physical tilt, plus a moving radial glare layer for extra depth.',
    preview: TiltCard,
    previewBackground: 'grid',
    installCommand: 'npm install framer-motion',
    dependencies: ['framer-motion'],
    props: [
      { name: 'maxTilt', type: 'number', default: '12', description: 'Maximum rotation in degrees.' },
      { name: 'children', type: 'ReactNode', default: '—', description: 'Card content, rendered at a raised z.' },
    ],
    usage: `import TiltCard from './TiltCard'

<TiltCard>
  <h4>Tilt</h4>
  <p>Responds to cursor position in 3D.</p>
</TiltCard>`,
    code: `import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [12, -12]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 })

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => { x.set(0.5); y.set(0.5) }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="rounded-xl border border-white/10 bg-neutral-900 p-6"
      >
        <div style={{ transform: 'translateZ(40px)' }}>{children}</div>
      </motion.div>
    </div>
  )
}`,
  },
  {
    slug: 'aurora-background',
    name: 'AuroraBackground',
    category: 'Backgrounds',
    tagline: 'Drifting blurred gradient blobs',
    description:
      'Three blurred, colored circles drift on independent loops behind your content, layered with a faint noise texture to avoid flat gradient banding.',
    preview: AuroraBackground,
    previewBackground: 'plain',
    previewFill: true,
    new: true,
    installCommand: 'npm install framer-motion',
    dependencies: ['framer-motion'],
    props: [
      { name: 'colors', type: 'string[]', default: "['#7c5cff', '#45e0c4', '#ff6b57']", description: 'Blob colors.' },
      { name: 'className', type: 'string', default: '—', description: 'Classes for the container.' },
    ],
    usage: `import AuroraBackground from './AuroraBackground'

<div className="relative h-96">
  <AuroraBackground />
  <div className="relative z-10">Your content</div>
</div>`,
    code: `import { motion } from 'framer-motion'

export default function AuroraBackground() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-black">
      <motion.div
        className="absolute -left-10 top-0 h-56 w-56 rounded-full opacity-60 blur-3xl"
        style={{ background: '#7c5cff' }}
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-0 top-8 h-48 w-48 rounded-full opacity-50 blur-3xl"
        style={{ background: '#45e0c4' }}
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full opacity-40 blur-3xl"
        style={{ background: '#ff6b57' }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}`,
  },
  {
    slug: 'dot-field-background',
    name: 'DotFieldBackground',
    category: 'Backgrounds',
    tagline: 'Reactive dot grid that swells near the cursor',
    description:
      'A dense grid of dots computes distance from the pointer on every move and scales nearby dots up, creating a ripple-like field of influence.',
    preview: DotFieldBackground,
    previewBackground: 'plain',
    previewFill: true,
    installCommand: 'npm install clsx',
    dependencies: [],
    props: [
      { name: 'cols', type: 'number', default: '14', description: 'Number of columns in the grid.' },
      { name: 'rows', type: 'number', default: '7', description: 'Number of rows in the grid.' },
    ],
    usage: `import DotFieldBackground from './DotFieldBackground'

<div className="relative h-72">
  <DotFieldBackground />
</div>`,
    code: `import { useRef, useState } from 'react'

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

  const dots = Array.from({ length: ROWS * COLS }, (_, i) => ({
    r: Math.floor(i / COLS),
    c: i % COLS,
  }))

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setMouse(null)}
      className="relative h-full w-full overflow-hidden rounded-xl bg-black"
    >
      <div
        className="grid h-full w-full"
        style={{ gridTemplateColumns: \`repeat(\${COLS}, 1fr)\`, gridTemplateRows: \`repeat(\${ROWS}, 1fr)\` }}
      >
        {dots.map(({ r, c }) => {
          const cx = ((c + 0.5) / COLS) * 100
          const cy = ((r + 0.5) / ROWS) * 100
          let scale = 1
          if (mouse && ref.current) {
            const rect = ref.current.getBoundingClientRect()
            const dist = Math.hypot(mouse.x - (cx / 100) * rect.width, mouse.y - (cy / 100) * rect.height)
            scale = 1 + Math.max(0, 1 - dist / 90) * 1.8
          }
          return (
            <div key={\`\${r}-\${c}\`} className="flex items-center justify-center">
              <span
                className="block h-1 w-1 rounded-full bg-violet-300 transition-transform duration-150"
                style={{ transform: \`scale(\${scale})\` }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}`,
  },
  {
    slug: 'stagger-list',
    name: 'StaggerList',
    category: 'Animations',
    tagline: 'Choreographed list entrance',
    description:
      'Uses Framer Motion variants and staggerChildren to bring list items in one after another, replaying whenever the list re-enters the viewport.',
    preview: StaggerList,
    previewBackground: 'grid',
    installCommand: 'npm install framer-motion',
    dependencies: ['framer-motion'],
    props: [
      { name: 'items', type: 'string[]', default: '[]', description: 'Items to render.' },
      { name: 'staggerDelay', type: 'number', default: '0.1', description: 'Delay between each item, in seconds.' },
    ],
    usage: `import StaggerList from './StaggerList'

<StaggerList items={['Design tokens', 'Component API', 'Ship it']} />`,
    code: `import { motion } from 'framer-motion'

interface StaggerListProps {
  items: string[]
  staggerDelay?: number
}

export default function StaggerList({ items, staggerDelay = 0.1 }: StaggerListProps) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-10%' }}
      variants={{ show: { transition: { staggerChildren: staggerDelay } } }}
      className="space-y-2.5"
    >
      {items.map((item) => (
        <motion.li
          key={item}
          variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-lg border border-white/10 bg-neutral-900 px-3.5 py-2.5 text-sm"
        >
          {item}
        </motion.li>
      ))}
    </motion.ul>
  )
}`,
  },
  {
    slug: 'morph-blob',
    name: 'MorphBlob',
    category: 'Animations',
    tagline: 'Continuously morphing SVG shape',
    description:
      'Animates the d attribute of an SVG path between several hand-picked blob shapes, mirroring back and forth for a fluid, organic loop.',
    preview: MorphBlob,
    previewBackground: 'plain',
    installCommand: 'npm install framer-motion',
    dependencies: ['framer-motion'],
    props: [
      { name: 'paths', type: 'string[]', default: '3 preset paths', description: 'SVG path data to morph between.' },
      { name: 'duration', type: 'number', default: '7', description: 'Seconds for one morph transition.' },
    ],
    usage: `import MorphBlob from './MorphBlob'

<div className="h-40 w-40">
  <MorphBlob />
</div>`,
    code: `import { motion } from 'framer-motion'

const paths = [
  'M45.3,-58.5C58.5,-49.5,68.4,-33.8,71.6,-16.7C74.9,0.4,71.5,19,62.1,33.8C52.7,48.6,37.3,59.6,20.1,64.6C2.9,69.6,-16.1,68.6,-32.4,61.1C-48.7,53.6,-62.3,39.6,-68.1,22.6C-73.9,5.6,-71.9,-14.4,-62.6,-29.8C-53.3,-45.2,-36.7,-56,-19.7,-63.3C-2.7,-70.6,14.7,-74.4,45.3,-58.5Z',
  'M39.5,-51.6C52.2,-44.6,64.1,-33.9,68.9,-20.3C73.7,-6.7,71.4,9.8,64.3,23.6C57.2,37.4,45.3,48.5,31.5,55.9C17.7,63.3,1.9,67,-14.4,65.5C-30.7,64,-47.5,57.3,-58.1,44.9C-68.7,32.5,-73.1,14.4,-71.5,-2.6C-69.9,-19.6,-62.3,-35.5,-50.1,-42.9C-37.9,-50.3,-21.1,-49.2,-4.4,-43.5C12.3,-37.8,26.8,-58.6,39.5,-51.6Z',
]

export default function MorphBlob() {
  return (
    <svg viewBox="-80 -80 160 160" className="h-40 w-40">
      <motion.path
        animate={{ d: paths }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        fill="url(#blob-grad)"
      />
      <defs>
        <linearGradient id="blob-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#45e0c4" />
        </linearGradient>
      </defs>
    </svg>
  )
}`,
  },
  {
    slug: 'infinite-marquee',
    name: 'InfiniteMarquee',
    category: 'Effects',
    tagline: 'Seamless scrolling row',
    description:
      'Duplicates its children once and animates the doubled track left by exactly 50%, producing a loop with no visible seam. Pauses respect reduced-motion settings.',
    preview: InfiniteMarquee,
    previewBackground: 'plain',
    installCommand: 'npm install clsx',
    dependencies: [],
    props: [
      { name: 'items', type: 'string[]', default: '[]', description: 'Items to loop through.' },
      { name: 'speed', type: 'number', default: '32', description: 'Full loop duration in seconds.' },
    ],
    usage: `import InfiniteMarquee from './InfiniteMarquee'

<InfiniteMarquee items={['Accessible', 'Typed', 'Fast']} />`,
    code: `const tags = ['Accessible', 'Typed', 'Tree-shakeable', 'Themeable']

export default function InfiniteMarquee() {
  const loop = [...tags, ...tags]
  return (
    <div className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-[marquee_32s_linear_infinite] gap-3">
        {loop.map((tag, i) => (
          <span key={i} className="shrink-0 rounded-full border border-white/10 bg-neutral-900 px-4 py-2 text-sm">
            {tag}
          </span>
        ))}
      </div>
      <style>{\`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      \`}</style>
    </div>
  )
}`,
  },
  {
    slug: 'glitch-text',
    name: 'GlitchText',
    category: 'Effects',
    tagline: 'RGB-split hover glitch',
    description:
      'Two duplicate text layers in cyan and red are clipped and offset on a stepped keyframe animation, triggered on hover for a short digital-glitch burst.',
    preview: GlitchText,
    previewBackground: 'grid',
    installCommand: 'npm install clsx',
    dependencies: [],
    props: [
      { name: 'children', type: 'ReactNode', default: '—', description: 'Text to glitch on hover.' },
    ],
    usage: `import GlitchText from './GlitchText'

<GlitchText>SYSTEM.OK</GlitchText>`,
    code: `export default function GlitchText({ children }: { children: React.ReactNode }) {
  return (
    <div className="group relative select-none font-semibold">
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 top-0 z-0 text-cyan-400 opacity-0 group-hover:opacity-80 group-hover:[animation:glitch-1_0.35s_steps(2)_infinite]">
        {children}
      </span>
      <span className="absolute left-0 top-0 z-0 text-red-400 opacity-0 group-hover:opacity-80 group-hover:[animation:glitch-2_0.35s_steps(2)_infinite]">
        {children}
      </span>
      <style>{\`
        @keyframes glitch-1 {
          0% { transform: translate(0,0); clip-path: inset(0 0 60% 0); }
          50% { transform: translate(-3px,1px); clip-path: inset(20% 0 30% 0); }
          100% { transform: translate(2px,-1px); clip-path: inset(60% 0 5% 0); }
        }
        @keyframes glitch-2 {
          0% { transform: translate(0,0); clip-path: inset(40% 0 10% 0); }
          50% { transform: translate(3px,-1px); clip-path: inset(5% 0 70% 0); }
          100% { transform: translate(-2px,1px); clip-path: inset(70% 0 5% 0); }
        }
      \`}</style>
    </div>
  )
}`,
  },
  {
    slug: 'floating-dock',
    name: 'FloatingDock',
    category: 'Navigation',
    tagline: 'macOS-style magnifying dock',
    description:
      'Icons scale up on hover and lift slightly, with neighboring icons growing a smaller amount to mimic the magnification curve of a physical dock.',
    preview: FloatingDock,
    previewBackground: 'plain',
    new: true,
    installCommand: 'npm install framer-motion lucide-react',
    dependencies: ['framer-motion', 'lucide-react'],
    props: [
      { name: 'items', type: '{ icon, label }[]', default: '[]', description: 'Icons and labels to render.' },
    ],
    usage: `import FloatingDock from './FloatingDock'
import { Home, Search, Settings } from 'lucide-react'

<FloatingDock items={[
  { icon: Home, label: 'Home' },
  { icon: Search, label: 'Search' },
  { icon: Settings, label: 'Settings' },
]} />`,
    code: `import { useState } from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface DockItem {
  icon: LucideIcon
  label: string
}

export default function FloatingDock({ items }: { items: DockItem[] }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-neutral-900 px-3 py-2.5">
      {items.map((item, i) => {
        const isHovered = hovered === i
        const isNeighbor = hovered !== null && Math.abs(hovered - i) === 1
        return (
          <motion.button
            key={item.label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            animate={{ scale: isHovered ? 1.5 : isNeighbor ? 1.15 : 1, y: isHovered ? -6 : 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 18 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-800"
            aria-label={item.label}
          >
            <item.icon size={16} />
          </motion.button>
        )
      })}
    </div>
  )
}`,
  },
  {
    slug: 'underline-tabs',
    name: 'UnderlineTabs',
    category: 'Navigation',
    tagline: 'Shared-layout animated underline',
    description:
      'Uses a Framer Motion layoutId so the active underline glides between tabs instead of jumping, with a natural spring on release.',
    preview: UnderlineTabs,
    previewBackground: 'plain',
    installCommand: 'npm install framer-motion',
    dependencies: ['framer-motion'],
    props: [
      { name: 'tabs', type: 'string[]', default: '[]', description: 'Tab labels.' },
      { name: 'defaultIndex', type: 'number', default: '0', description: 'Initially active tab.' },
    ],
    usage: `import UnderlineTabs from './UnderlineTabs'

<UnderlineTabs tabs={['Preview', 'Code', 'Props']} />`,
    code: `import { useState } from 'react'
import { motion } from 'framer-motion'

export default function UnderlineTabs({ tabs }: { tabs: string[] }) {
  const [active, setActive] = useState(0)
  return (
    <div className="flex gap-6 border-b border-white/10">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          onClick={() => setActive(i)}
          className={\`relative pb-3 text-sm \${active === i ? 'text-white' : 'text-neutral-500'}\`}
        >
          {tab}
          {active === i && (
            <motion.span
              layoutId="tab-underline"
              className="absolute -bottom-px left-0 right-0 h-[2px] rounded-full bg-violet-400"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
        </button>
      ))}
    </div>
  )
}`,
  },
  {
    slug: 'flip-card-3d',
    name: 'FlipCard3D',
    category: '3D',
    tagline: 'True 3D flip on hover',
    description:
      'Two absolutely-positioned faces share a 3D-transformed parent. Hovering rotates the parent 180° on the Y axis, backface-visibility hides the reverse side.',
    preview: FlipCard3D,
    previewBackground: 'grid',
    installCommand: 'npm install clsx',
    dependencies: [],
    props: [
      { name: 'front', type: 'ReactNode', default: '—', description: 'Content for the front face.' },
      { name: 'back', type: 'ReactNode', default: '—', description: 'Content for the back face.' },
    ],
    usage: `import FlipCard3D from './FlipCard3D'

<FlipCard3D front={<span>Hover to flip</span>} back={<span>Face two</span>} />`,
    code: `export default function FlipCard3D({ front, back }: { front: React.ReactNode; back: React.ReactNode }) {
  return (
    <div className="group h-40 w-56 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-white/10 bg-neutral-900 [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-white/10 bg-neutral-800 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  )
}`,
  },
  {
    slug: 'perspective-grid',
    name: 'PerspectiveGrid',
    category: '3D',
    tagline: 'Receding floor-grid tunnel',
    description:
      'A single grid layer is rotated on the X axis from its bottom edge, producing a Tron-style vanishing floor, then panned continuously for motion.',
    preview: PerspectiveGrid,
    previewBackground: 'plain',
    previewFill: true,
    installCommand: 'npm install clsx',
    dependencies: [],
    props: [
      { name: 'tint', type: 'string', default: "'#7c5cff'", description: 'Grid line color.' },
      { name: 'speed', type: 'number', default: '6', description: 'Pan duration in seconds.' },
    ],
    usage: `import PerspectiveGrid from './PerspectiveGrid'

<div className="relative h-64">
  <PerspectiveGrid />
</div>`,
    code: `export default function PerspectiveGrid() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-black [perspective:300px]">
      <div className="absolute inset-x-0 bottom-0 h-2/3 [transform:rotateX(75deg)] [transform-origin:bottom]">
        <div
          className="h-full w-full animate-[grid-pan_6s_linear_infinite]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #7c5cff33 1px, transparent 1px), linear-gradient(to bottom, #7c5cff33 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>
      <style>{\`
        @keyframes grid-pan {
          from { background-position: 0 0; }
          to { background-position: 28px 28px; }
        }
      \`}</style>
    </div>
  )
}`,
  },
]

export function getComponentBySlug(slug: string) {
  return components.find((c) => c.slug === slug)
}
