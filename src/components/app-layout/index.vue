<script setup lang="ts">
import AppHeader from '@/components/app-header/index.vue'
import AppSidebar from '@/components/app-sidebar/index.vue'

/**
 * Application shell: a fixed-width sidebar on the left and a content column
 * with the header on top. Only `main` scrolls, so the sidebar and header stay
 * in place while the page content moves.
 */
</script>

<template>
  <div class="grid h-dvh grid-cols-[auto_1fr] bg-background text-foreground">
    <a
      href="#content"
      title="Skip to content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
    >
      Skip to content
    </a>

    <AppSidebar />

    <div class="flex min-w-0 flex-col">
      <AppHeader />

      <main id="content" tabindex="-1" class="min-h-0 flex-1 overflow-y-auto focus:outline-none">
        <slot />
      </main>
    </div>
  </div>
</template>
