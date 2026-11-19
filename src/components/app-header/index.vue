<script setup lang="ts">
import { Sparkles } from '@lucide/vue'
import AppSectionPlaceholder from '@/components/app-section-placeholder/index.vue'
</script>

<template>
  <header class="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-4">
    <p class="flex items-center gap-2 text-lg font-semibold">
      <Sparkles class="size-5" aria-hidden="true" />
      artven
    </p>

    <AppSectionPlaceholder
      name="Account actions"
      contents="Help menu · Credits · Upgrade · Profile menu"
      class="py-1"
    />
  </header>
</template>
