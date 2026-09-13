import SplitReveal from '../components/showcase/SplitReveal'
import ShimmerText from '../components/showcase/ShimmerText'
import MagneticButton from '../components/showcase/MagneticButton'
import GlowButton from '../components/showcase/GlowButton'
import SpotlightCard from '../components/showcase/SpotlightCard'
import TiltCard from '../components/showcase/TiltCard'
import AuroraBackground from '../components/showcase/AuroraBackground'
import DotFieldBackground from '../components/showcase/DotFieldBackground'
import StaggerList from '../components/showcase/StaggerList'
import InfiniteMarquee from '../components/showcase/InfiniteMarquee'
import GlitchText from '../components/showcase/GlitchText'
import FloatingDock from '../components/showcase/FloatingDock'
import UnderlineTabs from '../components/showcase/UnderlineTabs'
import FlipCard3D from '../components/showcase/FlipCard3D'
import PerspectiveGrid from '../components/showcase/PerspectiveGrid'
import DriftWall from '../components/showcase/DriftWall'
import GhostFibers from '../components/showcase/GhostFibers'
import DepthCarousel from '../components/showcase/DepthCarousel'
import GlowCursor from '../components/showcase/GlowCursor'
import GradientWaves from '../components/showcase/GradientWavesDetail'
import InfiniteSpiral from '../components/showcase/InfiniteSpiralItem'
import MoltenMetal from '../components/showcase/MoltenMetal'
import MorphSlider from '../components/showcase/MorphTransition'
import ParticleText from '../components/showcase/ParticleText'
import RippleDistortion from '../components/showcase/RippleDistortion'
import ScrollExpand from '../components/showcase/ScrollExpand'
import type { ComponentEntry } from '../types'
import SplitFlapText from '../components/showcase/SplitFlapText'
import TextLoop from '../components/showcase/TextLoop'
import WarpText from '../components/showcase/WrapText'
import AccordionGallery from '../components/showcase/AccordionGallery'
import AnimatedList from '../components/showcase/AnimatedList'
import Antigravity from '../components/showcase/Antigravity'
import Aurora from '../components/showcase/Aurora'
import BlurText from '../components/showcase/BlurText'
import BlobCursor from '../components/showcase/BlobCursor'

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
  slug: 'drift-wall',
  name: 'DriftWall',
  category: 'Backgrounds',
  tagline: '3D drifting image wall',
  description:
    'A 3D image wall with continuous movement, mouse parallax, depth, and interactive tiles.',
  preview: DriftWall,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'No package to install',

  dependencies: [],

  props: [
    {
      name: 'items',
      type: 'DriftWallItem[]',
      default: 'default images',
      description: 'Images displayed inside the wall.',
    },
    {
      name: 'columns',
      type: 'number',
      default: '5',
      description: 'Number of image columns.',
    },
    {
      name: 'tileWidth',
      type: 'number',
      default: '200',
      description: 'Width of each tile.',
    },
    {
      name: 'tileHeight',
      type: 'number',
      default: '132',
      description: 'Height of each tile.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '42',
      description: 'Movement speed.',
    },
    {
      name: 'direction',
      type: "'up' | 'down'",
      default: "'up'",
      description: 'Direction the columns move.',
    },
    {
      name: 'parallax',
      type: 'number',
      default: '0.6',
      description: 'Mouse-controlled 3D parallax strength.',
    },
    {
      name: 'pauseOnHover',
      type: 'boolean',
      default: 'false',
      description: 'Pause the wall while hovering.',
    },
  ],

  usage: `
<DriftWall
  columns={5}
  tileWidth={200}
  tileHeight={132}
  speed={42}
  parallax={0.6}
/>
`,

  code: `
import DriftWall from './DriftWall'

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <DriftWall
        columns={5}
        tileWidth={200}
        tileHeight={132}
        speed={42}
        parallax={0.6}
      />
    </div>
  )
}
`,
},
{
  slug: 'blur-text',
  name: 'BlurText',
  category: 'Effects',
  tagline: 'Blurred text reveal animation',
  description:
    'A motion-powered text reveal that animates words or individual letters from a blurred, offset state into sharp focus when the text enters the viewport.',
  preview: BlurText,
  previewBackground: 'dark',
  previewFill: false,
  new: true,

  installCommand: 'npm install motion',

  dependencies: ['motion'],

  props: [
    {
      name: 'text',
      type: 'string',
      default: "''",
      description: 'Text displayed and animated by the component.',
    },
    {
      name: 'delay',
      type: 'number',
      default: '200',
      description: 'Delay in milliseconds between each animated word or letter.',
    },
    {
      name: 'animateBy',
      type: "'words' | 'letters'",
      default: "'words'",
      description: 'Controls whether the animation is applied to words or individual letters.',
    },
    {
      name: 'direction',
      type: "'top' | 'bottom'",
      default: "'top'",
      description: 'Controls the direction from which the text enters.',
    },
    {
      name: 'threshold',
      type: 'number',
      default: '0.1',
      description: 'IntersectionObserver visibility threshold that triggers the animation.',
    },
    {
      name: 'rootMargin',
      type: 'string',
      default: "'0px'",
      description: 'Margin around the viewport used by the IntersectionObserver.',
    },
    {
      name: 'animationFrom',
      type: 'Record<string, string | number>',
      default: 'undefined',
      description: 'Custom initial animation properties.',
    },
    {
      name: 'animationTo',
      type: 'Array<Record<string, string | number>>',
      default: 'undefined',
      description: 'Custom animation keyframe steps.',
    },
    {
      name: 'easing',
      type: 'Easing | Easing[]',
      default: '(t) => t',
      description: 'Easing function used throughout the text animation.',
    },
    {
      name: 'stepDuration',
      type: 'number',
      default: '0.35',
      description: 'Duration in seconds for each animation step.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes applied to the text container.',
    },
    {
      name: 'onAnimationComplete',
      type: '() => void',
      default: 'undefined',
      description: 'Callback fired when the final word or letter finishes animating.',
    },
  ],

  usage: `
<BlurText
  text="Build something extraordinary."
  animateBy="words"
  direction="top"
  delay={120}
  stepDuration={0.35}
/>
`,

  code: `
import BlurText from './BlurText'

export default function Example() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center">
      <BlurText
        text="Build something extraordinary."
        animateBy="words"
        direction="top"
        delay={120}
        stepDuration={0.35}
      />
    </div>
  )
}
`,
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
  slug: 'blob-cursor',
  name: 'BlobCursor',
  category: 'Effects',
  tagline: 'Interactive trailing blob cursor',
  description:
    'A customizable cursor-following blob effect with smooth GSAP trails, configurable shapes, sizes, opacity, shadows, inner highlights, SVG filters, and responsive motion easing.',
  preview: BlobCursor,
  previewBackground: 'dark',
  previewFill: true,
  new: true,
  installCommand: 'npm install gsap',
  dependencies: ['gsap'],
  props: [
    {
      name: 'blobType',
      type: "'circle' | 'square'",
      default: "'circle'",
      description: 'Controls the shape of the cursor blobs.'
    },
    {
      name: 'fillColor',
      type: 'string',
      default: "'#5227FF'",
      description: 'Background color applied to each blob.'
    },
    {
      name: 'trailCount',
      type: 'number',
      default: '3',
      description: 'Number of blobs rendered in the cursor trail.'
    },
    {
      name: 'sizes',
      type: 'number[]',
      default: '[60, 125, 75]',
      description: 'Size in pixels for each blob in the trail.'
    },
    {
      name: 'innerSizes',
      type: 'number[]',
      default: '[20, 35, 25]',
      description: 'Size in pixels of the inner highlight for each blob.'
    },
    {
      name: 'innerColor',
      type: 'string',
      default: "'rgba(255,255,255,0.8)'",
      description: 'Color of the inner highlight inside each blob.'
    },
    {
      name: 'opacities',
      type: 'number[]',
      default: '[0.6, 0.6, 0.6]',
      description: 'Opacity values applied to each blob.'
    },
    {
      name: 'shadowColor',
      type: 'string',
      default: "'rgba(0,0,0,0.75)'",
      description: 'Color of the shadow rendered behind the blobs.'
    },
    {
      name: 'shadowBlur',
      type: 'number',
      default: '5',
      description: 'Blur radius of the blob shadows.'
    },
    {
      name: 'shadowOffsetX',
      type: 'number',
      default: '10',
      description: 'Horizontal shadow offset in pixels.'
    },
    {
      name: 'shadowOffsetY',
      type: 'number',
      default: '10',
      description: 'Vertical shadow offset in pixels.'
    },
    {
      name: 'filterId',
      type: 'string',
      default: "'blob'",
      description: 'ID used by the SVG blob filter.'
    },
    {
      name: 'filterStdDeviation',
      type: 'number',
      default: '30',
      description: 'Gaussian blur amount used by the SVG filter.'
    },
    {
      name: 'filterColorMatrixValues',
      type: 'string',
      default:
        "'1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10'",
      description: 'SVG color matrix values controlling the blob merging effect.'
    },
    {
      name: 'useFilter',
      type: 'boolean',
      default: 'true',
      description: 'Enables or disables the SVG filter that creates the blob-like merging effect.'
    },
    {
      name: 'fastDuration',
      type: 'number',
      default: '0.1',
      description: 'GSAP animation duration in seconds for the leading blob.'
    },
    {
      name: 'slowDuration',
      type: 'number',
      default: '0.5',
      description: 'GSAP animation duration in seconds for trailing blobs.'
    },
    {
      name: 'fastEase',
      type: 'string',
      default: "'power3.out'",
      description: 'GSAP easing function used by the leading blob.'
    },
    {
      name: 'slowEase',
      type: 'string',
      default: "'power1.out'",
      description: 'GSAP easing function used by the trailing blobs.'
    },
    {
      name: 'zIndex',
      type: 'number',
      default: '100',
      description: 'Controls the stacking order of the cursor effect.'
    }
  ],
  usage: `
<BlobCursor
  blobType="circle"
  fillColor="#5227FF"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  useFilter
  fastDuration={0.1}
  slowDuration={0.5}
/>
  `,
  code: `
import BlobCursor from './BlobCursor'

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <BlobCursor
        blobType="circle"
        fillColor="#5227FF"
        trailCount={3}
        sizes={[60, 125, 75]}
        innerSizes={[20, 35, 25]}
        innerColor="rgba(255,255,255,0.8)"
        opacities={[0.6, 0.6, 0.6]}
        useFilter
        fastDuration={0.1}
        slowDuration={0.5}
      />
    </div>
  )
}
  `,
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
  slug: 'ripple-distortion',
  name: 'RippleDistortion',
  category: 'Effects',
  tagline: 'Interactive image ripple distortion',
  description:
    'A GPU-powered image distortion effect that creates expanding ripple waves from pointer movement and clicks with adjustable swirl, displacement, dispersion, tint, glint, and grayscale effects.',
  preview: RippleDistortion,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install ogl',

  dependencies: ['ogl'],

  props: [
    {
      name: 'src',
      type: 'string',
      default: 'default image',
      description: 'Image displayed inside the distortion effect.',
    },
    {
      name: 'brushSize',
      type: 'number',
      default: '150',
      description: 'Size of each ripple brush.',
    },
    {
      name: 'strength',
      type: 'number',
      default: '0.2',
      description: 'Controls the displacement strength.',
    },
    {
      name: 'swirl',
      type: 'number',
      default: '1',
      description: 'Controls the amount of rotational distortion.',
    },
    {
      name: 'rings',
      type: 'number',
      default: '4',
      description: 'Controls the number of visible ripple rings.',
    },
    {
      name: 'spread',
      type: 'number',
      default: '5',
      description: 'Controls how far each ripple expands.',
    },
    {
      name: 'fade',
      type: 'number',
      default: '3',
      description: 'Controls how quickly ripples disappear.',
    },
    {
      name: 'spacing',
      type: 'number',
      default: '15',
      description: 'Minimum pointer movement required to create another ripple.',
    },
    {
      name: 'dispersion',
      type: 'number',
      default: '0',
      description: 'Controls RGB chromatic dispersion.',
    },
    {
      name: 'glint',
      type: 'number',
      default: '0',
      description: 'Controls the reflective highlight effect.',
    },
    {
      name: 'tint',
      type: 'string',
      default: "'#a855f7'",
      description: 'Color applied to distorted areas.',
    },
    {
      name: 'tintAmount',
      type: 'number',
      default: '0.1',
      description: 'Controls the strength of the tint.',
    },
    {
      name: 'grayscale',
      type: 'boolean',
      default: 'true',
      description: 'Renders the image with a grayscale treatment.',
    },
    {
      name: 'highlightColor',
      type: 'string',
      default: "'#ffffff'",
      description: 'Color used for the reflective glint.',
    },
    {
      name: 'trigger',
      type: "'hover' | 'click' | 'both'",
      default: "'hover'",
      description: 'Controls whether ripples are created from hover movement, clicks, or both.',
    },
    {
      name: 'clickStrength',
      type: 'number',
      default: '2',
      description: 'Strength multiplier for click-generated ripples.',
    },
    {
      name: 'quality',
      type: "'low' | 'medium' | 'high'",
      default: "'low'",
      description: 'Controls the resolution of the displacement buffer.',
    },
    {
      name: 'enabled',
      type: 'boolean',
      default: 'true',
      description: 'Enables or disables pointer interaction.',
    },
  ],

  usage: `
<RippleDistortion
  src="https://images.unsplash.com/photo-1782977389500-dd7adad33ebe?q=80&w=3416&auto=format&fit=crop"
  brushSize={150}
  strength={0.2}
  swirl={1}
  rings={4}
  spread={5}
  fade={3}
  dispersion={0.15}
  glint={0.4}
  tint="#a855f7"
  tintAmount={0.1}
  grayscale
  trigger="both"
  clickStrength={2}
  quality="medium"
/>
`,

  code: `
import RippleDistortion from './RippleDistortion'

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <RippleDistortion
        brushSize={150}
        strength={0.2}
        swirl={1}
        rings={4}
        spread={5}
        fade={3}
        dispersion={0.15}
        glint={0.4}
        tint="#a855f7"
        tintAmount={0.1}
        grayscale
        trigger="both"
        clickStrength={2}
        quality="medium"
      />
    </div>
  )
}
`,
},
  {
  slug: 'particle-text',
  name: 'ParticleText',
  category: 'Text',
  tagline: 'Interactive text made from particles',
  description:
    'A canvas-based particle typography effect that scatters and gathers text with mouse repulsion, glowing particles, idle motion, and configurable animation triggers.',
  preview: ParticleText,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'No package to install',

  dependencies: [],

  props: [
    {
      name: 'text',
      type: 'string',
      default: "'React Bits'",
      description: 'Text rendered using particles.',
    },
    {
      name: 'particleSize',
      type: 'number',
      default: '2',
      description: 'Size of each particle.',
    },
    {
      name: 'density',
      type: 'number',
      default: '4',
      description: 'Controls the spacing between sampled particles.',
    },
    {
      name: 'color',
      type: 'string',
      default: "'#ffffff'",
      description: 'Base particle color.',
    },
    {
      name: 'highlightColor',
      type: 'string',
      default: "'#8b5cf6'",
      description: 'Highlight color blended across the particle text.',
    },
    {
      name: 'scatter',
      type: 'number',
      default: '180',
      description: 'Distance particles travel when scattered.',
    },
    {
      name: 'gatherDuration',
      type: 'number',
      default: '1600',
      description: 'Duration of the particle gathering animation in milliseconds.',
    },
    {
      name: 'stagger',
      type: 'number',
      default: '420',
      description: 'Delay between particles gathering.',
    },
    {
      name: 'pointerRepel',
      type: 'number',
      default: '40',
      description: 'Strength of the mouse repulsion effect.',
    },
    {
      name: 'repelRadius',
      type: 'number',
      default: '120',
      description: 'Radius around the pointer affected by repulsion.',
    },
    {
      name: 'idleDrift',
      type: 'number',
      default: '0.7',
      description: 'Amount of subtle particle movement while idle.',
    },
    {
      name: 'trigger',
      type: "'mount' | 'hover' | 'click'",
      default: "'mount'",
      description: 'Controls when the scatter-to-text animation is triggered.',
    },
    {
      name: 'fontSize',
      type: 'number | string',
      default: "'clamp(3rem, 12vw, 8rem)'",
      description: 'Font size used to generate the particle text.',
    },
    {
      name: 'fontWeight',
      type: 'number | string',
      default: '800',
      description: 'Font weight used when sampling the text.',
    },
    {
      name: 'fontFamily',
      type: 'string',
      default: "'inherit'",
      description: 'Font family used to generate the particle shape.',
    },
    {
      name: 'glow',
      type: 'boolean',
      default: 'true',
      description: 'Enables the particle glow effect.',
    },
  ],

  usage: `
<ParticleText
  text="Dev Bits"
  particleSize={2}
  density={4}
  color="#ffffff"
  highlightColor="#8b5cf6"
  scatter={180}
  pointerRepel={40}
  repelRadius={120}
  trigger="mount"
  glow
/>
`,

  code: `
import ParticleText from './ParticleText'

export default function Example() {
  return (
    <div className="h-[300px] w-full">
      <ParticleText
        text="Dev Bits"
        particleSize={2}
        density={4}
        color="#ffffff"
        highlightColor="#8b5cf6"
        scatter={180}
        pointerRepel={40}
        repelRadius={120}
        trigger="mount"
        glow
      />
    </div>
  )
}
`,
},
{
  slug: 'split-flap-text',
  name: 'SplitFlapText',
  category: 'Text',
  tagline: 'Animated split-flap display text',
  description:
    'A configurable split-flap typography effect that cycles through phrases with mechanical character flips, staggered animation, custom character sets, looping, and adjustable tile styling.',
  preview: SplitFlapText,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'No package to install',

  dependencies: [],

  props: [
    {
      name: 'words',
      type: 'string[]',
      default: "['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE']",
      description: 'Phrases cycled through by the split-flap display.',
    },
    {
      name: 'text',
      type: 'string',
      default: 'undefined',
      description: 'Displays a single phrase instead of cycling through the words array.',
    },
    {
      name: 'flipDuration',
      type: 'number',
      default: '0.12',
      description: 'Duration of each individual character flip in seconds.',
    },
    {
      name: 'stagger',
      type: 'number',
      default: '0.06',
      description: 'Delay between the start of each character animation in seconds.',
    },
    {
      name: 'cycleDelay',
      type: 'number',
      default: '2400',
      description: 'Delay before switching to the next phrase in milliseconds.',
    },
    {
      name: 'charset',
      type: "'alpha' | 'alphanumeric' | 'numeric' | string",
      default: "'alphanumeric'",
      description: 'Character set used when generating intermediate flip characters.',
    },
    {
      name: 'flipsPerChar',
      type: 'number',
      default: '8',
      description: 'Number of random character flips performed before reaching the target character.',
    },
    {
      name: 'tileColor',
      type: 'string',
      default: "'#111827'",
      description: 'Background color of each split-flap tile.',
    },
    {
      name: 'textColor',
      type: 'string',
      default: "'#f8fafc'",
      description: 'Color of the characters displayed on the tiles.',
    },
    {
      name: 'tileRadius',
      type: 'number | string',
      default: '8',
      description: 'Border radius applied to each tile.',
    },
    {
      name: 'gap',
      type: 'number | string',
      default: '6',
      description: 'Spacing between split-flap tiles.',
    },
    {
      name: 'fontSize',
      type: 'number | string',
      default: '52',
      description: 'Font size of the split-flap characters.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'Controls whether the phrase cycle continues indefinitely.',
    },
    {
      name: 'padTo',
      type: 'number',
      default: '12',
      description: 'Minimum number of character tiles reserved for the display.',
    },
  ],

  usage: `
<SplitFlapText
  words={[
    'LAUNCH READY',
    'SYNC ONLINE',
    'SIGNAL LIVE',
  ]}
  flipDuration={0.12}
  stagger={0.06}
  cycleDelay={2400}
  charset="alphanumeric"
  flipsPerChar={8}
  tileColor="#111827"
  textColor="#f8fafc"
  tileRadius={8}
  gap={6}
  fontSize={32}
  loop
  padTo={12}
/>
`,

  code: `
import SplitFlapText from './SplitFlapText'

export default function Example() {
  return (
    <div className="flex h-[300px] w-full items-center justify-center">
      <SplitFlapText
        words={[
          'LAUNCH READY',
          'SYNC ONLINE',
          'SIGNAL LIVE',
        ]}
        flipDuration={0.12}
        stagger={0.06}
        cycleDelay={2400}
        charset="alphanumeric"
        flipsPerChar={8}
        tileColor="#111827"
        textColor="#f8fafc"
        tileRadius={8}
        gap={6}
        fontSize={52}
        loop
        padTo={12}
      />
    </div>
  )
}
`,
},
{
  slug: 'scroll-expand',
  name: 'ScrollExpand',
  category: 'Animations',
  tagline: 'Scroll-driven media expansion',
  description:
    'A scroll-driven media animation that expands an image or video from a compact framed state into a full-screen visual with smooth scaling, rounded corners, overlays, titles, and scroll hints.',
  preview: ScrollExpand,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'No package to install',

  dependencies: [],

  props: [
    {
      name: 'src',
      type: 'string',
      default: "''",
      description: 'Image or video source.',
    },
    {
      name: 'mediaType',
      type: "'image' | 'video'",
      default: "'image'",
      description: 'Controls whether the component renders an image or video.',
    },
    {
      name: 'poster',
      type: 'string',
      default: "''",
      description: 'Poster image used for video media.',
    },
    {
      name: 'alt',
      type: 'string',
      default: "''",
      description: 'Alternative text for image media.',
    },
    {
      name: 'title',
      type: 'string',
      default: "''",
      description: 'Large title displayed over the media before expansion.',
    },
    {
      name: 'scrollHint',
      type: 'string',
      default: "''",
      description: 'Hint displayed near the bottom of the stage.',
    },
    {
      name: 'startWidth',
      type: 'number',
      default: '42',
      description: 'Initial media width as a percentage.',
    },
    {
      name: 'startHeight',
      type: 'number',
      default: '58',
      description: 'Initial media height as a percentage.',
    },
    {
      name: 'startRadius',
      type: 'number',
      default: '24',
      description: 'Initial corner radius in pixels.',
    },
    {
      name: 'endRadius',
      type: 'number',
      default: '0',
      description: 'Corner radius after the media reaches full size.',
    },
    {
      name: 'mediaZoom',
      type: 'number',
      default: '1.35',
      description: 'Initial media zoom level.',
    },
    {
      name: 'scrollDistance',
      type: 'number',
      default: '1.2',
      description: 'Scroll distance required to complete the expansion.',
    },
    {
      name: 'holdDistance',
      type: 'number',
      default: '0.35',
      description: 'Additional scroll distance after the expansion.',
    },
    {
      name: 'smoothing',
      type: 'number',
      default: '0.1',
      description: 'Controls the smoothness of scroll interpolation.',
    },
    {
      name: 'overlayScrim',
      type: 'number',
      default: '0.45',
      description: 'Maximum darkness of the media overlay.',
    },
    {
      name: 'useWindowScroll',
      type: 'boolean',
      default: 'false',
      description: 'Uses the browser window as the scroll container instead of the component.',
    },
    {
      name: 'enabled',
      type: 'boolean',
      default: 'true',
      description: 'Enables or disables the scroll expansion effect.',
    },
    {
      name: 'children',
      type: 'ReactNode',
      default: 'undefined',
      description: 'Optional content revealed over the expanded media.',
    },
  ],

  usage: `
<ScrollExpand
  src="https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2000"
  title="Explore"
  scrollHint="Scroll to expand"
  startWidth={42}
  startHeight={58}
  startRadius={24}
  endRadius={0}
  mediaZoom={1.35}
  scrollDistance={1.2}
  smoothing={0.1}
/>
`,

  code: `
import ScrollExpand from './ScrollExpand'

export default function Example() {
  return (
    <div className="h-[700px] w-full">
      <ScrollExpand
        src="https://images.unsplash.com/photo-1500534623283-312aade485b7?q=80&w=2000"
        title="Explore"
        scrollHint="Scroll to expand"
        startWidth={42}
        startHeight={58}
        startRadius={24}
        endRadius={0}
        mediaZoom={1.35}
        scrollDistance={1.2}
        smoothing={0.1}
      />
    </div>
  )
}
`,
},
{
  slug: 'text-loop',
  name: 'TextLoop',
  category: 'Text',
  tagline: 'Animated text flowing along custom paths',
  description:
    'An interactive SVG text loop that continuously animates text along waves, circles, infinity paths, arches, or custom SVG paths with optional ribbon backgrounds and hover controls.',
  preview: TextLoop,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install gsap',

  dependencies: ['gsap'],

  props: [
    {
      name: 'text',
      type: 'string',
      default: "'React ✦ Bits'",
      description: 'Text displayed along the animated path.',
    },
    {
      name: 'shape',
      type: "'wave' | 'circle' | 'infinity' | 'arch' | 'line'",
      default: "'wave'",
      description: 'Shape of the path followed by the text.',
    },
    {
      name: 'path',
      type: 'string',
      default: 'undefined',
      description: 'Optional custom SVG path used instead of the selected shape.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '90',
      description: 'Animation speed of the text along the path.',
    },
    {
      name: 'direction',
      type: "'forward' | 'reverse'",
      default: "'forward'",
      description: 'Direction in which the text travels along the path.',
    },
    {
      name: 'separator',
      type: 'string',
      default: "'✦'",
      description: 'Character placed between repeated text segments.',
    },
    {
      name: 'curviness',
      type: 'number',
      default: '90',
      description: 'Controls the amount of curvature for generated paths.',
    },
    {
      name: 'fontSize',
      type: 'number',
      default: '46',
      description: 'Font size of the animated text.',
    },
    {
      name: 'fontWeight',
      type: 'number | string',
      default: '800',
      description: 'Font weight of the animated text.',
    },
    {
      name: 'letterSpacing',
      type: 'number',
      default: '2',
      description: 'Spacing between individual letters.',
    },
    {
      name: 'uppercase',
      type: 'boolean',
      default: 'true',
      description: 'Converts the displayed text to uppercase.',
    },
    {
      name: 'color',
      type: 'string',
      default: "'#ffffff'",
      description: 'Color of the animated text.',
    },
    {
      name: 'ribbon',
      type: 'boolean',
      default: 'true',
      description: 'Displays a ribbon behind the text path.',
    },
    {
      name: 'ribbonColor',
      type: 'string',
      default: "'#5227FF'",
      description: 'Color of the ribbon behind the text.',
    },
    {
      name: 'ribbonWidth',
      type: 'number',
      default: '86',
      description: 'Width of the ribbon behind the text.',
    },
    {
      name: 'pauseOnHover',
      type: 'boolean',
      default: 'true',
      description: 'Pauses the animation when the pointer hovers over the component.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes applied to the component.',
    },
    {
      name: 'style',
      type: 'CSSProperties',
      default: '{}',
      description: 'Inline styles applied to the component.',
    },
  ],

  usage: `
<TextLoop
  text="Dev ✦ Bits"
  shape="wave"
  speed={90}
  direction="forward"
  separator="✦"
  curviness={90}
  fontSize={46}
  fontWeight={800}
  letterSpacing={2}
  uppercase
  color="#ffffff"
  ribbon
  ribbonColor="#3B82F6"
  ribbonWidth={86}
  pauseOnHover
/>
`,

  code: `
import TextLoop from './TextLoop'

export default function Example() {
  return (
    <div className="w-full">
      <TextLoop
        text="Dev ✦ Bits"
        shape="wave"
        speed={90}
        direction="forward"
        separator="✦"
        curviness={90}
        fontSize={46}
        fontWeight={800}
        letterSpacing={2}
        uppercase
        color="#ffffff"
        ribbon
        ribbonColor="#3B82F6"
        ribbonWidth={86}
        pauseOnHover
      />
    </div>
  )
}
`,
},
{
  slug: 'warp-text',
  name: 'WarpText',
  category: 'Text',
  tagline: 'Interactive WebGL text distortion',
  description:
    'A WebGL-powered text effect that warps, refracts, and ripples typography with animated noise and pointer interaction using OGL.',
  preview: WarpText,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install ogl',

  dependencies: ['ogl'],

  props: [
    {
      name: 'text',
      type: 'string',
      default: "'Bend the moment'",
      description: 'Text rendered inside the WebGL canvas.',
    },
    {
      name: 'color',
      type: 'string',
      default: "'#f8f5ff'",
      description: 'Color of the rendered text.',
    },
    {
      name: 'warpStrength',
      type: 'number',
      default: '0.08',
      description: 'Controls the intensity of the ambient text distortion.',
    },
    {
      name: 'warpScale',
      type: 'number',
      default: '1.7',
      description: 'Controls the scale of the procedural warp pattern.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '0.55',
      description: 'Controls the speed of the animated distortion.',
    },
    {
      name: 'pointerInfluence',
      type: 'number',
      default: '0.42',
      description: 'Controls the radius of the pointer distortion effect.',
    },
    {
      name: 'pointerStrength',
      type: 'number',
      default: '0.38',
      description: 'Controls how strongly the pointer bends the text.',
    },
    {
      name: 'refraction',
      type: 'number',
      default: '0.018',
      description: 'Controls the RGB refraction and chromatic separation.',
    },
    {
      name: 'ripple',
      type: 'boolean',
      default: 'true',
      description: 'Enables the ripple distortion around the pointer.',
    },
    {
      name: 'fontSize',
      type: 'string | number',
      default: "'clamp(3rem, 10vw, 9rem)'",
      description: 'Font size of the rendered text.',
    },
    {
      name: 'fontWeight',
      type: 'string | number',
      default: '800',
      description: 'Font weight of the rendered text.',
    },
    {
      name: 'fontFamily',
      type: 'string',
      default: "'inherit'",
      description: 'Font family used to render the text.',
    },
    {
      name: 'letterSpacing',
      type: 'string | number',
      default: "'-0.06em'",
      description: 'Spacing between characters.',
    },
    {
      name: 'lineHeight',
      type: 'string | number',
      default: '0.9',
      description: 'Line height used when rendering multiple lines.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes applied to the component.',
    },
    {
      name: 'style',
      type: 'CSSProperties',
      default: '{}',
      description: 'Inline styles applied to the component.',
    },
  ],

  usage: `
<WarpText
  text="Bend the moment"
  color="#f8f5ff"
  warpStrength={0.08}
  warpScale={1.7}
  speed={0.55}
  pointerInfluence={0.42}
  pointerStrength={0.38}
  refraction={0.018}
  ripple
  fontSize="clamp(3rem, 10vw, 9rem)"
  fontWeight={800}
  fontFamily="inherit"
  letterSpacing="-0.06em"
  lineHeight={0.9}
/>
`,

  code: `
import WarpText from './WarpText'

export default function Example() {
  return (
    <div className="w-full">
      <WarpText
        text="Explore Beyond"
        color="#f8f5ff"
        warpStrength={0.08}
        warpScale={1.7}
        speed={0.55}
        pointerInfluence={0.42}
        pointerStrength={0.38}
        refraction={0.018}
        ripple
        fontSize="clamp(3rem, 10vw, 9rem)"
        fontWeight={800}
        fontFamily="inherit"
        letterSpacing="-0.06em"
        lineHeight={0.9}
      />
    </div>
  )
}
`,
},
{
  slug: 'accordion-gallery',
  name: 'AccordionGallery',
  category: 'Gallery',
  tagline: 'Interactive image accordion gallery',
  description:
    'A responsive image gallery with expandable panels, hover or click interactions, parallax movement, tilt effects, animated labels, grayscale transitions, and horizontal or vertical layouts.',
  preview: AccordionGallery,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install gsap',

  dependencies: ['gsap'],

  props: [
    {
      name: 'items',
      type: 'AccordionGalleryItem[]',
      default: 'default gallery items',
      description: 'Images, labels, links, and alt text displayed in the gallery.',
    },
    {
      name: 'defaultIndex',
      type: 'number',
      default: '2',
      description: 'Index of the panel that is active when the gallery loads.',
    },
    {
      name: 'accentColor',
      type: 'string',
      default: "'#ffffff'",
      description: 'Accent color used for the active panel indicator and focus state.',
    },
    {
      name: 'overlayColor',
      type: 'string',
      default: "'#060010'",
      description: 'Color used for the image overlay gradient.',
    },
    {
      name: 'textColor',
      type: 'string',
      default: "'#ffffff'",
      description: 'Color of the image panel labels.',
    },
    {
      name: 'height',
      type: 'number',
      default: '460',
      description: 'Height of the gallery in pixels.',
    },
    {
      name: 'gap',
      type: 'number',
      default: '10',
      description: 'Gap between gallery panels in pixels.',
    },
    {
      name: 'radius',
      type: 'number',
      default: '16',
      description: 'Border radius of each gallery panel in pixels.',
    },
    {
      name: 'expandRatio',
      type: 'number',
      default: '0.52',
      description: 'Controls how much the active panel expands relative to inactive panels.',
    },
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: 'Controls whether the gallery expands horizontally or vertically.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '0.6',
      description: 'Duration of the panel expansion animation in seconds.',
    },
    {
      name: 'ease',
      type: 'string',
      default: "'power3.out'",
      description: 'GSAP easing function used for panel animations.',
    },
    {
      name: 'parallax',
      type: 'number',
      default: '0.5',
      description: 'Controls the amount of image parallax movement.',
    },
    {
      name: 'tilt',
      type: 'number',
      default: '8',
      description: 'Controls the 3D tilt angle of inactive panels.',
    },
    {
      name: 'stagger',
      type: 'number',
      default: '0.06',
      description: 'Stagger delay used when animating panel labels.',
    },
    {
      name: 'trigger',
      type: "'hover' | 'click'",
      default: "'hover'",
      description: 'Controls whether panels activate on hover or click.',
    },
    {
      name: 'showLabels',
      type: 'boolean',
      default: 'true',
      description: 'Shows or hides the image labels.',
    },
    {
      name: 'grayscale',
      type: 'boolean',
      default: 'true',
      description: 'Applies grayscale to inactive gallery images.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes applied to the gallery container.',
    },
  ],

  usage: `
<AccordionGallery
  items={[
    {
      image: 'https://picsum.photos/id/1015/900/1200',
      label: 'Canyon',
      link: '#',
    },
    {
      image: 'https://picsum.photos/id/1018/900/1200',
      label: 'Ridgeline',
      link: '#',
    },
    {
      image: 'https://picsum.photos/id/1039/900/1200',
      label: 'Falls',
      link: '#',
    },
    {
      image: 'https://picsum.photos/id/1043/900/1200',
      label: 'Harbour',
      link: '#',
    },
    {
      image: 'https://picsum.photos/id/1044/900/1200',
      label: 'Skyline',
      link: '#',
    },
  ]}
  defaultIndex={2}
  accentColor="#ffffff"
  overlayColor="#060010"
  textColor="#ffffff"
  height={460}
  gap={10}
  radius={16}
  expandRatio={0.52}
  orientation="horizontal"
  duration={0.6}
  ease="power3.out"
  parallax={0.5}
  tilt={8}
  stagger={0.06}
  trigger="hover"
  showLabels
  grayscale
/>
`,

  code: `
import AccordionGallery from './AccordionGallery'

const items = [
  {
    image: 'https://picsum.photos/id/1015/900/1200',
    label: 'Canyon',
    link: '#',
  },
  {
    image: 'https://picsum.photos/id/1018/900/1200',
    label: 'Ridgeline',
    link: '#',
  },
  {
    image: 'https://picsum.photos/id/1039/900/1200',
    label: 'Falls',
    link: '#',
  },
  {
    image: 'https://picsum.photos/id/1043/900/1200',
    label: 'Harbour',
    link: '#',
  },
  {
    image: 'https://picsum.photos/id/1044/900/1200',
    label: 'Skyline',
    link: '#',
  },
]

export default function Example() {
  return (
    <div className="w-full">
      <AccordionGallery
        items={items}
        defaultIndex={2}
        height={460}
        gap={10}
        radius={16}
        expandRatio={0.52}
        orientation="horizontal"
        duration={0.6}
        parallax={0.5}
        tilt={8}
        trigger="hover"
        showLabels
        grayscale
      />
    </div>
  )
}
`,
},
{
  slug: 'antigravity',
  name: 'Antigravity',
  category: 'Backgrounds',
  tagline: 'Interactive gravitational particle field',
  description:
    'A Three.js particle field where particles orbit around a magnetic cursor point with configurable waves, depth, rotation, pulsing, particle shapes, and automatic animation.',

  preview: Antigravity,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install three @react-three/fiber',

  dependencies: ['three', '@react-three/fiber'],

  props: [
    {
      name: 'count',
      type: 'number',
      default: '300',
      description: 'Number of particles rendered in the field.',
    },
    {
      name: 'magnetRadius',
      type: 'number',
      default: '10',
      description: 'Radius around the cursor where particles are attracted into the gravitational field.',
    },
    {
      name: 'ringRadius',
      type: 'number',
      default: '10',
      description: 'Radius of the particle ring formed around the cursor.',
    },
    {
      name: 'waveSpeed',
      type: 'number',
      default: '0.4',
      description: 'Speed of the wave motion applied to particles around the ring.',
    },
    {
      name: 'waveAmplitude',
      type: 'number',
      default: '1',
      description: 'Strength of the particle wave displacement.',
    },
    {
      name: 'particleSize',
      type: 'number',
      default: '2',
      description: 'Base scale of each particle.',
    },
    {
      name: 'lerpSpeed',
      type: 'number',
      default: '0.1',
      description: 'Interpolation speed controlling how quickly particles follow their target positions.',
    },
    {
      name: 'color',
      type: 'string',
      default: '"#3B82F6"',
      description: 'Color applied to all particles.',
    },
    {
      name: 'autoAnimate',
      type: 'boolean',
      default: 'false',
      description: 'Automatically moves the gravitational point when the pointer is inactive.',
    },
    {
      name: 'particleVariance',
      type: 'number',
      default: '1',
      description: 'Controls variation in particle pulsing.',
    },
    {
      name: 'rotationSpeed',
      type: 'number',
      default: '0',
      description: 'Rotation speed applied to the gravitational field.',
    },
    {
      name: 'depthFactor',
      type: 'number',
      default: '1',
      description: 'Multiplier controlling particle depth movement.',
    },
    {
      name: 'pulseSpeed',
      type: 'number',
      default: '3',
      description: 'Speed of particle size pulsing.',
    },
    {
      name: 'particleShape',
      type: "'capsule' | 'sphere' | 'box' | 'tetrahedron'",
      default: "'capsule'",
      description: 'Geometry used for each particle.',
    },
    {
      name: 'fieldStrength',
      type: 'number',
      default: '10',
      description: 'Controls the strength of particle variation around the gravitational field.',
    },
  ],

  usage: `
<Antigravity
  count={300}
  magnetRadius={10}
  ringRadius={10}
  waveSpeed={0.4}
  waveAmplitude={1}
  particleSize={2}
  color="#3B82F6"
  autoAnimate
  particleShape="capsule"
/>
`,

  code: `
import Antigravity from './Antigravity'

export default function Example() {
  return (
    <div className="h-screen w-full">
      <Antigravity
        count={300}
        magnetRadius={10}
        ringRadius={10}
        waveSpeed={0.4}
        waveAmplitude={1}
        particleSize={2}
        color="#3B82F6"
        autoAnimate
        particleShape="capsule"
      />
    </div>
  )
}
`,
},
{
  slug: 'aurora',
  name: 'Aurora',
  category: 'Backgrounds',
  tagline: 'Animated WebGL aurora background',
  description:
    'A GPU-powered aurora effect with animated noise, customizable color stops, blending, amplitude, speed, and light-mode rendering.',
  preview: Aurora,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install ogl',
  dependencies: ['ogl'],

  props: [
    {
      name: 'colorStops',
      type: 'string[]',
      default: "['#ff6427', '#7cff67', '#27e2ff']",
      description: 'Three colors used to create the aurora gradient.',
    },
    {
      name: 'amplitude',
      type: 'number',
      default: '1.0',
      description: 'Controls the vertical intensity of the aurora waves.',
    },
    {
      name: 'blend',
      type: 'number',
      default: '0.5',
      description: 'Controls the softness and blending of the aurora edges.',
    },
    {
      name: 'time',
      type: 'number',
      default: 'auto',
      description: 'Overrides the animated time value when provided.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '1.0',
      description: 'Controls the animation speed.',
    },
    {
      name: 'lightMode',
      type: 'boolean',
      default: 'false',
      description: 'Switches the aurora into a bright light-mode rendering.',
    },
  ],

  usage: `import Aurora from './Aurora';

<Aurora
  colorStops={['#5227FF', '#7cff67', '#5227FF']}
  amplitude={1}
  blend={0.5}
  speed={1}
  lightMode={false}
/>`,

  code: `// Aurora component code here`,
},

{
  slug: 'animated-list',
  name: 'AnimatedList',
  category: 'Lists',
  tagline: 'Interactive animated scrolling list',
  description:
    'A responsive animated list with scroll-aware gradients, hover selection, keyboard navigation, smooth auto-scrolling, and configurable item styling.',
  preview: AnimatedList,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install motion',
  dependencies: ['motion'],

  props: [
    {
      name: 'items',
      type: 'string[]',
      default: 'Item 1 ... Item 15',
      description: 'List items displayed inside the animated scroll container.',
    },
    {
      name: 'onItemSelect',
      type: '(item: string, index: number) => void',
      default: 'undefined',
      description: 'Callback fired when an item is selected or activated with Enter.',
    },
    {
      name: 'showGradients',
      type: 'boolean',
      default: 'true',
      description: 'Shows fading gradients at the top and bottom of the scroll area.',
    },
    {
      name: 'enableArrowNavigation',
      type: 'boolean',
      default: 'true',
      description: 'Enables Arrow Up, Arrow Down, and Tab keyboard navigation.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes applied to the outer list container.',
    },
    {
      name: 'itemClassName',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes applied to each list item.',
    },
    {
      name: 'displayScrollbar',
      type: 'boolean',
      default: 'true',
      description: 'Controls whether the list scrollbar is displayed.',
    },
    {
      name: 'initialSelectedIndex',
      type: 'number',
      default: '-1',
      description: 'Index of the item selected when the list initially renders.',
    },
  ],

  usage: `
<AnimatedList
  items={[
    'React',
    'TypeScript',
    'JavaScript',
    'Motion',
    'GSAP',
    'WebGL',
    'Appwrite',
    'Tailwind CSS',
  ]}
  showGradients
  enableArrowNavigation
  displayScrollbar
  initialSelectedIndex={0}
  onItemSelect={(item, index) => {
    console.log('Selected:', item, index)
  }}
/>
`,

  code: `
import AnimatedList from './AnimatedList'

const items = [
  'React',
  'TypeScript',
  'JavaScript',
  'Motion',
  'GSAP',
  'WebGL',
  'Appwrite',
  'Tailwind CSS',
]

export default function Example() {
  return (
    <div className="w-full">
      <AnimatedList
        items={items}
        showGradients
        enableArrowNavigation
        displayScrollbar
        initialSelectedIndex={0}
        onItemSelect={(item, index) => {
          console.log('Selected:', item, index)
        }}
      />
    </div>
  )
}
`,
},
  {
  slug: 'glow-cursor',
  name: 'GlowCursor',
  category: 'Effects',
  tagline: 'Interactive glowing cursor trail',
  description:
    'A GPU-powered cursor trail with glowing gradients, configurable motion, pulse, fade, noise, blending, and customizable colors.',

  preview: GlowCursor,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install ogl',

  dependencies: ['ogl'],

  props: [
    {
      name: 'color',
      type: 'string',
      default: "'#67E8F9'",
      description: 'Primary color of the cursor trail.',
    },
    {
      name: 'secondaryColor',
      type: 'string',
      default: "'#A78BFA'",
      description: 'Secondary color used along the trail.',
    },
    {
      name: 'trailLength',
      type: 'number',
      default: '40',
      description: 'Number of points used to create the cursor trail.',
    },
    {
      name: 'trailWidth',
      type: 'number',
      default: '8',
      description: 'Width of the glowing trail.',
    },
    {
      name: 'trailTaper',
      type: 'number',
      default: '0.8',
      description: 'Controls how much the trail narrows toward its end.',
    },
    {
      name: 'followSpeed',
      type: 'number',
      default: '0.16',
      description: 'Controls how quickly the glow follows the pointer.',
    },
    {
      name: 'glowIntensity',
      type: 'number',
      default: '1.9',
      description: 'Controls the intensity of the glow.',
    },
    {
      name: 'glowSpread',
      type: 'number',
      default: '1.2',
      description: 'Controls how far the glow spreads around the trail.',
    },
    {
      name: 'hotspot',
      type: 'number',
      default: '0.65',
      description: 'Controls the brightness of the cursor hotspot.',
    },
    {
      name: 'brightness',
      type: 'number',
      default: '1.25',
      description: 'Controls overall trail brightness.',
    },
    {
      name: 'opacity',
      type: 'number',
      default: '1',
      description: 'Controls the overall opacity.',
    },
    {
      name: 'pulseSpeed',
      type: 'number',
      default: '1.1',
      description: 'Controls the animated pulse speed.',
    },
    {
      name: 'noiseStrength',
      type: 'number',
      default: '0.035',
      description: 'Controls the amount of animated film grain.',
    },
    {
      name: 'idleFade',
      type: 'boolean',
      default: 'true',
      description: 'Fades the cursor trail when the pointer becomes idle.',
    },
    {
      name: 'idleTimeout',
      type: 'number',
      default: '700',
      description: 'Time in milliseconds before the idle fade begins.',
    },
    {
      name: 'fadeDuration',
      type: 'number',
      default: '900',
      description: 'Controls how quickly the trail fades.',
    },
    {
      name: 'blendMode',
      type: "'normal' | 'screen' | 'plus-lighter'",
      default: "'screen'",
      description: 'Controls how the glow blends with the background.',
    },
    {
      name: 'maxDevicePixelRatio',
      type: 'number',
      default: '1.5',
      description: 'Maximum device pixel ratio used by WebGL.',
    },
    {
      name: 'enabled',
      type: 'boolean',
      default: 'true',
      description: 'Enables or disables the glow cursor.',
    },
  ],

  usage: `
<GlowCursor
  color="#67E8F9"
  secondaryColor="#A78BFA"
  trailLength={40}
  trailWidth={8}
  glowIntensity={1.9}
  glowSpread={1.2}
/>
`,

  code: `
import GlowCursor from './GlowCursor'

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <GlowCursor
        color="#67E8F9"
        secondaryColor="#A78BFA"
        trailLength={40}
        trailWidth={8}
        glowIntensity={1.9}
        glowSpread={1.2}
      />
    </div>
  )
}
`,
},
  {
  slug: 'ghost-fibers',
  name: 'GhostFibers',
  category: 'Backgrounds',
  tagline: 'Procedural WebGL fiber atmosphere',
  description:
    'A procedural WebGL background with layered fibers, glowing lines, atmospheric depth, rotation, grain, and light mode support.',
  preview: GhostFibers,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install ogl',

  dependencies: ['ogl'],

  props: [
    {
      name: 'lineColor',
      type: 'string',
      default: "'#140E35'",
      description: 'Color of the primary fibers.',
    },
    {
      name: 'glowColor',
      type: 'string',
      default: "'#3437A0'",
      description: 'Color used for the atmospheric glow.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '0.2',
      description: 'Controls the animation speed.',
    },
    {
      name: 'scale',
      type: 'number',
      default: '2',
      description: 'Controls the scale of the fiber pattern.',
    },
    {
      name: 'rotation',
      type: 'number',
      default: '0',
      description: 'Initial rotation of the fiber field.',
    },
    {
      name: 'rotationSpeed',
      type: 'number',
      default: '0.25',
      description: 'Controls continuous rotation.',
    },
    {
      name: 'layers',
      type: 'number',
      default: '4',
      description: 'Number of layered fiber fields.',
    },
    {
      name: 'waveAmplitude',
      type: 'number',
      default: '0.015',
      description: 'Controls wave distortion.',
    },
    {
      name: 'waveFrequency',
      type: 'number',
      default: '3',
      description: 'Controls wave frequency.',
    },
    {
      name: 'twist',
      type: 'number',
      default: '0.1',
      description: 'Controls the twisting effect.',
    },
    {
      name: 'lineFrequency',
      type: 'number',
      default: '5',
      description: 'Controls fiber line frequency.',
    },
    {
      name: 'lineSharpness',
      type: 'number',
      default: '16',
      description: 'Controls the sharpness of the fibers.',
    },
    {
      name: 'glowIntensity',
      type: 'number',
      default: '1.6',
      description: 'Controls the glow intensity.',
    },
    {
      name: 'brightness',
      type: 'number',
      default: '2',
      description: 'Controls overall brightness.',
    },
    {
      name: 'blueBoost',
      type: 'number',
      default: '1.25',
      description: 'Boosts the blue channel.',
    },
    {
      name: 'vignette',
      type: 'number',
      default: '0.8',
      description: 'Controls edge darkening.',
    },
    {
      name: 'grain',
      type: 'number',
      default: '0.05',
      description: 'Controls procedural grain.',
    },
    {
      name: 'lightMode',
      type: 'boolean',
      default: 'false',
      description: 'Switches between dark and light rendering.',
    },
    {
      name: 'dpr',
      type: 'number',
      default: '1',
      description: 'Controls WebGL pixel density.',
    },
    {
      name: 'fps',
      type: 'number',
      default: '60',
      description: 'Maximum animation frame rate.',
    },
    {
      name: 'paused',
      type: 'boolean',
      default: 'false',
      description: 'Pauses the animation.',
    },
  ],
},
{
  slug: 'morph-slider',
  name: 'MorphSlider',
  category: '3D',
  tagline: 'WebGL image morphing carousel',
  description:
    'An interactive image slider powered by WebGL with fluid morph transitions, drag gestures, autoplay, captions, indicators, keyboard navigation, and multiple transition modes.',

  preview: MorphSlider,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install ogl gsap',

  dependencies: ['ogl', 'gsap'],

  props: [
    {
      name: 'items',
      type: 'MorphItem[]',
      default: 'default images',
      description: 'Images and optional captions displayed by the slider.',
    },
    {
      name: 'startIndex',
      type: 'number',
      default: '0',
      description: 'Initial slide index.',
    },
    {
      name: 'transition',
      type: "'melt' | 'ripple' | 'shear' | 'swirl'",
      default: "'melt'",
      description: 'WebGL transition used between images.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '1.1',
      description: 'Transition duration in seconds.',
    },
    {
      name: 'ease',
      type: 'string',
      default: "'power2.inOut'",
      description: 'GSAP easing function used for transitions.',
    },
    {
      name: 'intensity',
      type: 'number',
      default: '0.55',
      description: 'Controls the strength of the morph distortion.',
    },
    {
      name: 'scale',
      type: 'number',
      default: '2.4',
      description: 'Controls the scale of the distortion pattern.',
    },
    {
      name: 'aberration',
      type: 'number',
      default: '0.35',
      description: 'Controls RGB chromatic aberration during transitions.',
    },
    {
      name: 'drift',
      type: 'number',
      default: '0.4',
      description: 'Controls subtle image movement during transitions.',
    },
    {
      name: 'autoplay',
      type: 'boolean',
      default: 'false',
      description: 'Automatically advances through the slides.',
    },
    {
      name: 'autoplayDelay',
      type: 'number',
      default: '4',
      description: 'Delay between autoplay transitions in seconds.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'Allows the slider to wrap around continuously.',
    },
    {
      name: 'radius',
      type: 'number',
      default: '16',
      description: 'Border radius of the slider.',
    },
    {
      name: 'overlayColor',
      type: 'string',
      default: "'#000000'",
      description: 'Color of the subtle overlay applied to the images.',
    },
    {
      name: 'showCaptions',
      type: 'boolean',
      default: 'true',
      description: 'Displays image captions.',
    },
    {
      name: 'showControls',
      type: 'boolean',
      default: 'true',
      description: 'Displays previous and next controls.',
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      default: 'true',
      description: 'Displays slide indicators.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes applied to the slider.',
    },
  ],

  usage: `
<MorphSlider
  transition="melt"
  duration={1.1}
  intensity={0.55}
  scale={2.4}
  aberration={0.35}
  drift={0.4}
  autoplay
  autoplayDelay={4}
  loop
/>
`,

  code: `
import MorphSlider from './MorphSlider'

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <MorphSlider
        transition="melt"
        duration={1.1}
        intensity={0.55}
        scale={2.4}
        aberration={0.35}
        drift={0.4}
        autoplay
        autoplayDelay={4}
        loop
        showCaptions
        showControls
        showIndicators
      />
    </div>
  )
}
`,
},
{
  slug: 'molten-metal',
  name: 'MoltenMetal',
  category: 'Backgrounds',
  tagline: 'Interactive molten WebGL surface',
  description:
    'A GPU-powered molten metal effect with animated distortion, glowing cores, multiple color modes, grain, mouse interaction, and light-mode rendering.',

  preview: MoltenMetal,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install ogl',

  dependencies: ['ogl'],

  props: [
    {
      name: 'color1',
      type: 'string',
      default: "'#5227FF'",
      description: 'Primary gradient color.',
    },
    {
      name: 'color2',
      type: 'string',
      default: "'#FF9FFC'",
      description: 'Secondary gradient color.',
    },
    {
      name: 'color3',
      type: 'string',
      default: "'#FFFFFF'",
      description: 'Highlight and crest color.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '0.35',
      description: 'Controls the animation speed.',
    },
    {
      name: 'scale',
      type: 'number',
      default: '4',
      description: 'Controls the scale of the molten pattern.',
    },
    {
      name: 'detail',
      type: 'number',
      default: '3',
      description: 'Controls the number of distortion iterations.',
    },
    {
      name: 'glow',
      type: 'number',
      default: '1.6',
      description: 'Controls the intensity of the glowing core.',
    },
    {
      name: 'coreSize',
      type: 'number',
      default: '0.1',
      description: 'Controls the size of the glowing core.',
    },
    {
      name: 'swirl',
      type: 'number',
      default: '1',
      description: 'Controls the amount of swirling distortion.',
    },
    {
      name: 'fold',
      type: 'number',
      default: '-0.2',
      description: 'Controls the folding and warping of the surface.',
    },
    {
      name: 'blackPoint',
      type: 'number',
      default: '0.05',
      description: 'Controls the darkness threshold.',
    },
    {
      name: 'brightness',
      type: 'number',
      default: '1.3',
      description: 'Controls overall brightness.',
    },
    {
      name: 'colorMode',
      type: "'molten' | 'ember' | 'frost'",
      default: "'molten'",
      description: 'Selects the gradient behavior of the effect.',
    },
    {
      name: 'grain',
      type: 'boolean',
      default: 'true',
      description: 'Adds animated grain to the surface.',
    },
    {
      name: 'grainIntensity',
      type: 'number',
      default: '0.05',
      description: 'Controls grain intensity.',
    },
    {
      name: 'mouseInteraction',
      type: 'boolean',
      default: 'true',
      description: 'Enables mouse-controlled distortion.',
    },
    {
      name: 'mouseStrength',
      type: 'number',
      default: '0.3',
      description: 'Controls the strength of mouse interaction.',
    },
    {
      name: 'opacity',
      type: 'number',
      default: '1',
      description: 'Controls the overall opacity.',
    },
    {
      name: 'backgroundColor',
      type: 'string',
      default: "'#FFFFFF'",
      description: 'Background color used in light mode.',
    },
    {
      name: 'lightMode',
      type: 'boolean',
      default: 'false',
      description: 'Switches the shader into light-mode rendering.',
    },
  ],

  usage: `
<MoltenMetal
  color1="#5227FF"
  color2="#FF9FFC"
  color3="#FFFFFF"
  speed={0.35}
  scale={4}
  detail={3}
  glow={1.6}
  mouseInteraction
/>
`,

  code: `
import MoltenMetal from './MoltenMetal'

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <MoltenMetal
        color1="#5227FF"
        color2="#FF9FFC"
        color3="#FFFFFF"
        speed={0.35}
        scale={4}
        detail={3}
        glow={1.6}
        mouseInteraction
      />
    </div>
  )
}
`,
},
{
  slug: 'infinite-spiral',
  name: 'InfiniteSpiral',
  category: '3D',
  tagline: 'Interactive infinite spiral gallery',
  description:
    'A continuously animated 3D image spiral with depth, perspective, drag control, scroll interaction, mouse-friendly navigation, fading, blur, and customizable card styling.',

  preview: InfiniteSpiral,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'No package to install',

  dependencies: [],

  props: [
    {
      name: 'items',
      type: 'Array<string | InfiniteSpiralItem>',
      default: '[]',
      description: 'Images or image objects displayed in the spiral.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '0.55',
      description: 'Controls the automatic spiral movement speed.',
    },
    {
      name: 'direction',
      type: "'up' | 'down'",
      default: "'up'",
      description: 'Controls the direction of automatic movement.',
    },
    {
      name: 'animationMode',
      type: "'auto' | 'drag' | 'scroll' | 'all'",
      default: "'auto'",
      description: 'Controls how the spiral can be animated.',
    },
    {
      name: 'radius',
      type: 'number',
      default: '170',
      description: 'Controls the radius of the spiral.',
    },
    {
      name: 'cardWidth',
      type: 'number',
      default: '100',
      description: 'Width of each image card.',
    },
    {
      name: 'cardHeight',
      type: 'number',
      default: '100',
      description: 'Height of each image card.',
    },
    {
      name: 'verticalSpacing',
      type: 'number',
      default: '60',
      description: 'Vertical spacing between cards.',
    },
    {
      name: 'perspective',
      type: 'number',
      default: '1000',
      description: 'Controls the CSS 3D perspective depth.',
    },
    {
      name: 'cardsPerTurn',
      type: 'number',
      default: '7',
      description: 'Number of cards distributed around each spiral turn.',
    },
    {
      name: 'rotation',
      type: 'number',
      default: '0',
      description: 'Initial rotation of the spiral.',
    },
    {
      name: 'cardTilt',
      type: 'number',
      default: '0',
      description: 'Controls the rotation of individual cards.',
    },
    {
      name: 'cardRadius',
      type: 'number',
      default: '10',
      description: 'Border radius of each image card.',
    },
    {
      name: 'centerScale',
      type: 'number',
      default: '1.2',
      description: 'Scale multiplier applied to cards near the center.',
    },
    {
      name: 'edgeFade',
      type: 'number',
      default: '0.3',
      description: 'Controls how quickly cards fade toward the edges.',
    },
    {
      name: 'edgeBlur',
      type: 'number',
      default: '6',
      description: 'Controls blur applied to cards near the edges.',
    },
    {
      name: 'pauseOnHover',
      type: 'boolean',
      default: 'true',
      description: 'Pauses automatic movement while hovering.',
    },
    {
      name: 'imageFit',
      type: 'CSSProperties["objectFit"]',
      default: "'cover'",
      description: 'Controls how images fit inside their cards.',
    },
    {
      name: 'grayscale',
      type: 'number',
      default: '0',
      description: 'Controls the grayscale amount of the images.',
    },
    {
      name: 'className',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes applied to the container.',
    },
  ],

  usage: `
<InfiniteSpiral
  items={[
    '/images/one.jpg',
    '/images/two.jpg',
    '/images/three.jpg',
    '/images/four.jpg',
    '/images/five.jpg',
  ]}
  speed={0.55}
  direction="up"
  animationMode="all"
  radius={170}
  cardWidth={120}
  cardHeight={120}
/>
`,

  code: `
import InfiniteSpiral from './InfiniteSpiral'

const items = [
  '/images/one.jpg',
  '/images/two.jpg',
  '/images/three.jpg',
  '/images/four.jpg',
  '/images/five.jpg',
  '/images/six.jpg',
  '/images/seven.jpg',
]

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <InfiniteSpiral
        items={items}
        speed={0.55}
        direction="up"
        animationMode="all"
        radius={170}
        cardWidth={120}
        cardHeight={120}
        verticalSpacing={60}
        perspective={1000}
        cardsPerTurn={7}
        centerScale={1.2}
        edgeFade={0.3}
        edgeBlur={6}
        pauseOnHover
      />
    </div>
  )
}
`,
},
{
  slug: 'gradient-waves',
  name: 'GradientWaves',
  category: 'Backgrounds',
  tagline: 'Interactive 3D gradient waves',
  description:
    'A WebGL gradient wave background with animated terrain, customizable colors, depth, fog, grain, and mouse-controlled parallax.',

  preview: GradientWaves,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install ogl',

  dependencies: ['ogl'],

  props: [
    {
      name: 'horizonColor',
      type: 'string',
      default: "'#5227FF'",
      description: 'Color of the distant horizon.',
    },
    {
      name: 'waveColor',
      type: 'string',
      default: "'#FF9FFC'",
      description: 'Primary color of the waves.',
    },
    {
      name: 'crestColor',
      type: 'string',
      default: "'#FFFFFF'",
      description: 'Color used on the wave crests.',
    },
    {
      name: 'speed',
      type: 'number',
      default: '0.4',
      description: 'Controls the animation speed.',
    },
    {
      name: 'amplitude',
      type: 'number',
      default: '2.5',
      description: 'Controls wave height and intensity.',
    },
    {
      name: 'waveScale',
      type: 'number',
      default: '0.6',
      description: 'Controls the scale of the wave pattern.',
    },
    {
      name: 'waveRatio',
      type: 'number',
      default: '0.9',
      description: 'Controls the horizontal-to-vertical wave ratio.',
    },
    {
      name: 'swell',
      type: 'number',
      default: '35',
      description: 'Controls large-scale wave swelling.',
    },
    {
      name: 'turbulence',
      type: 'number',
      default: '20',
      description: 'Controls wave turbulence.',
    },
    {
      name: 'tilt',
      type: 'number',
      default: '1.11',
      description: 'Controls the camera tilt.',
    },
    {
      name: 'zoom',
      type: 'number',
      default: '1',
      description: 'Controls the camera zoom.',
    },
    {
      name: 'height',
      type: 'number',
      default: '5.5',
      description: 'Controls the base height of the waves.',
    },
    {
      name: 'fogDepth',
      type: 'number',
      default: '15',
      description: 'Controls atmospheric depth and fading.',
    },
    {
      name: 'detail',
      type: "'low' | 'medium' | 'high'",
      default: "'medium'",
      description: 'Controls raymarching detail and rendering quality.',
    },
    {
      name: 'brightness',
      type: 'number',
      default: '1',
      description: 'Controls overall brightness.',
    },
    {
      name: 'opacity',
      type: 'number',
      default: '1',
      description: 'Controls overall opacity.',
    },
    {
      name: 'mouseInteraction',
      type: 'boolean',
      default: 'true',
      description: 'Enables mouse-controlled camera movement.',
    },
    {
      name: 'parallaxStrength',
      type: 'number',
      default: '0.5',
      description: 'Controls the strength of mouse parallax.',
    },
    {
      name: 'grain',
      type: 'boolean',
      default: 'true',
      description: 'Adds animated grain to the waves.',
    },
    {
      name: 'grainIntensity',
      type: 'number',
      default: '0.05',
      description: 'Controls the intensity of the grain effect.',
    },
  ],

  usage: `
<GradientWaves
  horizonColor="#5227FF"
  waveColor="#FF9FFC"
  crestColor="#FFFFFF"
  speed={0.4}
  amplitude={2.5}
  waveScale={0.6}
  mouseInteraction
  parallaxStrength={0.5}
/>
`,

  code: `
import GradientWaves from './GradientWaves'

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <GradientWaves
        horizonColor="#5227FF"
        waveColor="#FF9FFC"
        crestColor="#FFFFFF"
        speed={0.4}
        amplitude={2.5}
        waveScale={0.6}
        mouseInteraction
        parallaxStrength={0.5}
      />
    </div>
  )
}
`,
},
{
  slug: 'depth-carousel',
  name: 'DepthCarousel',
  category: '3D',
  tagline: 'Layered 3D image carousel',
  description:
    'A draggable 3D image carousel with depth, perspective, tilt, autoplay, wheel control, keyboard navigation, and smooth GSAP transitions.',
  preview: DepthCarousel,
  previewBackground: 'dark',
  previewFill: true,
  new: true,

  installCommand: 'npm install gsap',

  dependencies: ['gsap'],

  props: [
    {
      name: 'items',
      type: 'DepthCarouselItem[]',
      default: 'default images',
      description: 'Images displayed inside the carousel.',
    },
    {
      name: 'cardWidth',
      type: 'number',
      default: '300',
      description: 'Width of each carousel card.',
    },
    {
      name: 'cardHeight',
      type: 'number',
      default: '380',
      description: 'Height of each carousel card.',
    },
    {
      name: 'radius',
      type: 'number',
      default: '18',
      description: 'Border radius of each card.',
    },
    {
      name: 'tint',
      type: 'string',
      default: "'#05060a'",
      description: 'Tint color applied over the cards.',
    },
    {
      name: 'depth',
      type: 'number',
      default: '220',
      description: 'Controls the 3D depth between cards.',
    },
    {
      name: 'spread',
      type: 'number',
      default: '90',
      description: 'Controls the horizontal spacing between cards.',
    },
    {
      name: 'tilt',
      type: 'number',
      default: '22',
      description: 'Controls the Y-axis card tilt.',
    },
    {
      name: 'tiltDirection',
      type: "'left' | 'right'",
      default: "'right'",
      description: 'Direction of the card tilt.',
    },
    {
      name: 'perspective',
      type: 'number',
      default: '1400',
      description: 'CSS 3D perspective distance.',
    },
    {
      name: 'visibleCards',
      type: 'number',
      default: '4',
      description: 'Number of cards visible around the active card.',
    },
    {
      name: 'falloff',
      type: 'number',
      default: '0.2',
      description: 'Controls brightness and overlay falloff with depth.',
    },
    {
      name: 'blur',
      type: 'number',
      default: '6',
      description: 'Maximum blur applied to cards farther from the active card.',
    },
    {
      name: 'duration',
      type: 'number',
      default: '700',
      description: 'GSAP transition duration in milliseconds.',
    },
    {
      name: 'ease',
      type: 'string',
      default: "'power3.out'",
      description: 'GSAP easing function.',
    },
    {
      name: 'autoplay',
      type: 'boolean',
      default: 'false',
      description: 'Automatically advances through the carousel.',
    },
    {
      name: 'autoplayDelay',
      type: 'number',
      default: '3200',
      description: 'Delay between autoplay transitions in milliseconds.',
    },
    {
      name: 'loop',
      type: 'boolean',
      default: 'true',
      description: 'Allows the carousel to loop continuously.',
    },
    {
      name: 'showControls',
      type: 'boolean',
      default: 'true',
      description: 'Shows previous and next navigation buttons.',
    },
    {
      name: 'showIndicators',
      type: 'boolean',
      default: 'true',
      description: 'Shows slide indicators at the bottom.',
    },
  ],

  usage: `
<DepthCarousel
  cardWidth={300}
  cardHeight={380}
  depth={220}
  spread={90}
  tilt={22}
  visibleCards={4}
  autoplay
/>
`,

  code: `
import DepthCarousel from './DepthCarousel'

export default function Example() {
  return (
    <div className="h-[600px] w-full">
      <DepthCarousel
        cardWidth={300}
        cardHeight={380}
        depth={220}
        spread={90}
        tilt={22}
        visibleCards={4}
        autoplay
      />
    </div>
  )
}
`,
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
