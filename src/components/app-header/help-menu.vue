<script setup lang="ts">
import { CircleHelp, FileText, Mail } from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MENU_ITEM_CLASS } from './menu-item-class'

/** Support address; the app has no help center yet. */
const SUPPORT_EMAIL = 'support@artven.example'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      title="Help"
      aria-label="Help"
      class="flex size-10 items-center justify-center rounded-full bg-secondary text-white focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <CircleHelp class="size-5" aria-hidden="true" />
    </DropdownMenuTrigger>

    <!-- Figma places the menu under the trigger's left edge, 19 px below it. -->
    <DropdownMenuContent
      align="start"
      :side-offset="19"
      class="w-[274px] rounded-[20px] border-white/8 bg-border p-3"
    >
      <DropdownMenuItem as-child :class="MENU_ITEM_CLASS">
        <a :href="`mailto:${SUPPORT_EMAIL}`" title="Contact Support">
          <Mail aria-hidden="true" />
          Contact Support
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem as-child :class="MENU_ITEM_CLASS">
        <RouterLink :to="{ name: 'settings' }" title="Terms & Policies">
          <FileText aria-hidden="true" />
          Terms & Policies
        </RouterLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
