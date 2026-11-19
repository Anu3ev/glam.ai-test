<script setup lang="ts">
import type { Component } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { Bookmark, FolderOpen, LayoutGrid, MessageSquare, Search, Settings } from '@lucide/vue'

/** One destination in the main sidebar navigation. */
interface SidebarLink {
  label: string
  to: RouteLocationRaw
  icon: Component
  /** Shows the unread marker next to the label. */
  hasUnread?: boolean
  /** Figma draws the search entry as an icon without a visible label. */
  isIconOnly?: boolean
}

/** Destinations in Figma order. Each group after the first is drawn below a divider. */
const linkGroups: SidebarLink[][] = [
  [{ label: 'Search', to: { name: 'search' }, icon: Search, isIconOnly: true }],
  [
    { label: 'Home', to: { name: 'home' }, icon: LayoutGrid },
    { label: 'Chat', to: { name: 'chat' }, icon: MessageSquare },
    { label: 'Saved', to: { name: 'saved' }, icon: Bookmark },
    { label: 'Results', to: { name: 'results' }, icon: FolderOpen, hasUnread: true },
  ],
  [{ label: 'Settings', to: { name: 'settings' }, icon: Settings }],
]
</script>

<template>
  <aside class="w-16 shrink-0 bg-sidebar px-2 py-4">
    <nav aria-label="Main">
      <ul
        v-for="(links, groupIndex) in linkGroups"
        :key="groupIndex"
        class="flex flex-col gap-1 not-first:mt-4 not-first:border-t not-first:border-sidebar-border not-first:pt-4 last:pt-3"
      >
        <li v-for="link in links" :key="link.label">
          <RouterLink v-slot="{ isExactActive, href, navigate }" :to="link.to" custom>
            <a
              :href="href"
              :title="link.label"
              :aria-current="isExactActive ? 'page' : undefined"
              :class="link.isIconOnly ? 'h-10 justify-center' : 'h-14 py-1'"
              class="flex w-12 flex-col items-center gap-1 rounded-[10px] text-nav text-muted-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none hover:text-sidebar-foreground aria-[current=page]:text-sidebar-foreground"
              @click="navigate"
            >
              <span
                class="flex size-8 items-center justify-center rounded-[10px]"
                :class="{ 'bg-sidebar-accent': isExactActive }"
              >
                <component :is="link.icon" class="size-5" aria-hidden="true" />
              </span>
              <span class="flex items-center gap-1" :class="{ 'sr-only': link.isIconOnly }">
                {{ link.label }}
                <span
                  v-if="link.hasUnread"
                  class="size-1 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <span v-if="link.hasUnread" class="sr-only">(new)</span>
              </span>
            </a>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>
