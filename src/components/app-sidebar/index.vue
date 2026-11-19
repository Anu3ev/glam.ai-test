<script setup lang="ts">
import type { Component } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { Bookmark, FolderOpen, House, MessageSquare, Settings } from '@lucide/vue'

/** One destination in the main sidebar navigation. */
interface SidebarLink {
  label: string
  to: RouteLocationRaw
  icon: Component
}

/** Destinations in Figma order. Each group after the first is drawn below a divider. */
const linkGroups: SidebarLink[][] = [
  [
    { label: 'Home', to: { name: 'home' }, icon: House },
    { label: 'Chat', to: { name: 'chat' }, icon: MessageSquare },
    { label: 'Saved', to: { name: 'saved' }, icon: Bookmark },
    { label: 'Results', to: { name: 'results' }, icon: FolderOpen },
  ],
  [{ label: 'Settings', to: { name: 'settings' }, icon: Settings }],
]
</script>

<template>
  <aside class="flex w-16 flex-col items-center border-r border-sidebar-border bg-sidebar py-3">
    <nav aria-label="Main">
      <ul
        v-for="(links, groupIndex) in linkGroups"
        :key="groupIndex"
        class="flex flex-col items-center gap-1 not-first:mt-2 not-first:border-t not-first:border-sidebar-border not-first:pt-2"
      >
        <li v-for="link in links" :key="link.label">
          <RouterLink
            :to="link.to"
            :title="link.label"
            exact-active-class="bg-sidebar-accent text-sidebar-accent-foreground"
            class="flex min-h-12 w-14 flex-col items-center justify-center gap-1 rounded-md text-[10px] leading-3 font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none"
          >
            <component :is="link.icon" class="size-5" aria-hidden="true" />
            <span>{{ link.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
