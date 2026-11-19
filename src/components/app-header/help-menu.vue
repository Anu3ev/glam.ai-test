<script setup lang="ts">
import { CircleHelp, FileText, Mail } from '@lucide/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/** Support address; the app has no help center yet. */
const SUPPORT_EMAIL = 'support@artven.example'
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      title="Help"
      aria-label="Help"
      class="flex size-10 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <CircleHelp class="size-5" aria-hidden="true" />
    </DropdownMenuTrigger>

    <DropdownMenuContent align="end" class="w-[274px] rounded-[20px] border-white/10 bg-border p-3">
      <DropdownMenuItem
        as-child
        class="h-10 gap-3 rounded-[10px] px-3 py-2.5 text-[13px] leading-4 [&_svg]:size-5"
      >
        <a :href="`mailto:${SUPPORT_EMAIL}`" title="Contact Support">
          <Mail aria-hidden="true" />
          Contact Support
        </a>
      </DropdownMenuItem>
      <DropdownMenuItem
        as-child
        class="h-10 gap-3 rounded-[10px] px-3 py-2.5 text-[13px] leading-4 [&_svg]:size-5"
      >
        <RouterLink :to="{ name: 'settings' }" title="Terms & Policies">
          <FileText aria-hidden="true" />
          Terms & Policies
        </RouterLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
