import type { Component } from 'vue'
import { Clapperboard, Image, ImagePlus, MicVocal, Repeat, Wand } from '@lucide/vue'

/** Media type a tool works with; also the tab that lists it. */
export type ToolCategory = 'image' | 'video'

/** One creative tool shown in the hero tools panel. */
export type Tool = {
  id: string
  title: string
  subtitle: string
  category: ToolCategory
  icon: Component
}

/** Tools in Figma order; the Popular tab shows all of them. */
export const TOOLS: readonly Tool[] = [
  {
    id: 'create-image',
    title: 'Create Image',
    subtitle: 'Subtitle',
    category: 'image',
    icon: ImagePlus,
  },
  {
    id: 'extend-video',
    title: 'Extend Video',
    subtitle: 'Subtitle',
    category: 'video',
    icon: Clapperboard,
  },
  {
    id: 'create-video',
    title: 'Create Video',
    subtitle: 'Subtitle',
    category: 'video',
    icon: Wand,
  },
  {
    id: 'motion-swap',
    title: 'Motion Swap',
    subtitle: 'Subtitle',
    category: 'video',
    icon: Repeat,
  },
  { id: 'edit-image', title: 'Edit Image', subtitle: 'Subtitle', category: 'image', icon: Image },
  { id: 'lipsync', title: 'Lipsync', subtitle: 'Subtitle', category: 'video', icon: MicVocal },
]
