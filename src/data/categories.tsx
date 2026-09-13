import {
  Type,
  MousePointerClick,
  LayoutGrid,
  Mountain,
  Sparkles,
  Wand2,
  Compass,
  Box,
  List,
} from 'lucide-react'
import type { CategoryMeta } from '../types'

export const categories: CategoryMeta[] = [
  {
    id: 'Text',
    label: 'Text',
    description: 'Kinetic typography, reveals, and gradient type treatments.',
    icon: <Type size={16} />,
  },
  {
    id: 'Buttons',
    label: 'Buttons',
    description: 'Interactive triggers with magnetic pulls and glow states.',
    icon: <MousePointerClick size={16} />,
  },
  {
    id: 'Lists',
    label: 'Lists',
    description: 'Interactive lists with selection, scrolling, and motion.',
    icon: <List size={16} />,
  },
  {
    id: 'Cards',
    label: 'Cards',
    description: 'Surfaces with spotlight, tilt, and depth on hover.',
    icon: <LayoutGrid size={16} />,
  },
  {
    id: 'Backgrounds',
    label: 'Backgrounds',
    description: 'Ambient scenes — auroras, fields, and grids.',
    icon: <Mountain size={16} />,
  },
  {
    id: 'Animations',
    label: 'Animations',
    description: 'Entrance choreography and shape morphing.',
    icon: <Sparkles size={16} />,
  },
  {
    id: 'Effects',
    label: 'Effects',
    description: 'Marquees, glitches, and texture-driven detail.',
    icon: <Wand2 size={16} />,
  },
  {
    id: 'Navigation',
    label: 'Navigation',
    description: 'Docks, tabs, and wayfinding with shared-layout motion.',
    icon: <Compass size={16} />,
  },
  {
    id: '3D',
    label: '3D',
    description: 'Perspective, flips, and depth with CSS transforms.',
    icon: <Box size={16} />,
  },
]
