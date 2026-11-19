<script setup lang="ts">
import type { Component } from 'vue'
import { CircleUser, CreditCard, Database, LogOut, Settings, UserRound } from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { User } from '@/stores/user'

defineProps<{ user: User }>()

const emit = defineEmits<{ signOut: [] }>()

/** Account pages in Figma order; all open Settings until those pages exist. */
const accountLinks: { label: string; icon: Component }[] = [
  { label: 'View Profile', icon: UserRound },
  { label: 'Subscriptions', icon: CreditCard },
  { label: 'Manage Account', icon: Settings },
  { label: 'Credits History', icon: Database },
]

const itemClass = 'h-10 gap-3 rounded-[10px] px-3 py-2.5 text-[15px] leading-5 [&_svg]:size-5'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      title="Profile menu"
      aria-label="Profile menu"
      class="flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <CircleUser class="size-5" aria-hidden="true" />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-[304px] rounded-[20px] border-white/10 bg-border p-3">
      <div class="flex items-center gap-3 px-3 py-2">
        <span class="flex size-10 items-center justify-center rounded-full bg-secondary">
          <UserRound class="size-5" aria-hidden="true" />
        </span>
        <div class="min-w-0">
          <p class="truncate text-[15px] font-semibold">{{ user.name }}</p>
          <p class="truncate text-xs text-muted-foreground">{{ user.email }}</p>
        </div>
      </div>

      <DropdownMenuItem v-for="link in accountLinks" :key="link.label" as-child :class="itemClass">
        <RouterLink :to="{ name: 'settings' }" :title="link.label">
          <component :is="link.icon" aria-hidden="true" />
          {{ link.label }}
        </RouterLink>
      </DropdownMenuItem>

      <DropdownMenuSeparator class="my-2 bg-white/10" />

      <DropdownMenuItem :class="itemClass" title="Sign Out" @select="emit('signOut')">
        <LogOut aria-hidden="true" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
