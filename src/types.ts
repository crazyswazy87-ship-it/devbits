import type { ComponentType, ReactNode } from 'react'

export type Category =
  | 'Text'
  | 'Buttons'
  | 'Cards'
  | 'Backgrounds'
  | 'Animations'
  | 'Effects'
  | 'Navigation'
  | '3D'

export interface PropDef {
  name: string
  type: string
  default?: string
  description: string
}

export interface ComponentEntry {
  slug: string
  name: string
  category: Category
  description: string
  tagline: string
  preview: ComponentType
  previewBackground?: 'grid' | 'dot' | 'plain' | 'dark'
  previewFill?: boolean
  code: string
  installCommand: string
  dependencies: string[]
  usage: string
  props: PropDef[]
  new?: boolean
}

export interface CategoryMeta {
  id: Category
  label: string
  description: string
  icon: ReactNode
}
