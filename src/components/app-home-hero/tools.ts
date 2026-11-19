import type { Component } from 'vue'
import { Image, ImagePlus, Mic, PersonStanding, Play, SquarePlus } from '@lucide/vue'

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

/** Tools in Figma order; the Popular tab shows all of them. Icons are the closest Lucide shapes to Figma's. */
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
    icon: SquarePlus,
  },
  {
    id: 'create-video',
    title: 'Create Video',
    subtitle: 'Subtitle',
    category: 'video',
    icon: Play,
  },
  {
    id: 'motion-swap',
    title: 'Motion Swap',
    subtitle: 'Subtitle',
    category: 'video',
    icon: PersonStanding,
  },
  { id: 'edit-image', title: 'Edit Image', subtitle: 'Subtitle', category: 'image', icon: Image },
  { id: 'lipsync', title: 'Lipsync', subtitle: 'Subtitle', category: 'video', icon: Mic },
]
