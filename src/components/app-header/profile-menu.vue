<script setup lang="ts">
import type { Component } from 'vue'
import { CreditCard, Database, LogOut, Settings, UserIcon, UserRound } from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { User } from '@/stores/user'
import { MENU_ITEM_CLASS } from './menu-item-class'

defineProps<{ user: User }>()

const emit = defineEmits<{ signOut: [] }>()

/** Account pages in Figma order; all open Settings until those pages exist. */
const accountLinks: { label: string; icon: Component }[] = [
  { label: 'View Profile', icon: UserRound },
  { label: 'Subscriptions', icon: CreditCard },
  { label: 'Manage Account', icon: Settings },
  { label: 'Credits History', icon: Database },
]
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      title="Profile menu"
      aria-label="Profile menu"
      class="flex size-10 items-center justify-center rounded-full bg-secondary text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <UserIcon class="size-5" aria-hidden="true" />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-[304px] rounded-[20px] border-white/8 bg-border p-3">
      <div class="flex items-center gap-3 px-2 pb-4">
        <span class="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent">
          <UserRound class="size-5" aria-hidden="true" />
        </span>
        <div class="flex min-w-0 flex-col gap-[5px]">
          <p class="truncate text-account">{{ user.name }}</p>
          <p class="truncate text-meta text-muted-foreground">{{ user.email }}</p>
        </div>
      </div>

      <DropdownMenuItem
        v-for="link in accountLinks"
        :key="link.label"
        as-child
        :class="MENU_ITEM_CLASS"
      >
        <RouterLink :to="{ name: 'settings' }" :title="link.label">
          <component :is="link.icon" aria-hidden="true" />
          {{ link.label }}
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator class="mx-2 my-2.5 bg-accent" />

      <DropdownMenuItem :class="MENU_ITEM_CLASS" title="Sign Out" @select="emit('signOut')">
        <LogOut aria-hidden="true" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
