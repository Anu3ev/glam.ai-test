<script setup lang="ts">
import AppHomeHero from '@/components/app-home-hero/index.vue'
import AppIdeasSection from '@/components/app-ideas-section/index.vue'
import AppWishesSection from '@/components/app-wishes-section/index.vue'

/**
 * Home page: composes its sections in Figma order and holds no logic of its own.
 * Figma: the content frame fills the 1216 px next to the sidebar, starts 16 px below
 * the header, keeps 28 px between sections and 20 px side padding.
 */
</script>

<template>
  <div class="mx-auto flex w-full max-w-304 flex-col gap-7 px-5 pt-4 pb-10">
    <AppHomeHero />
    <AppIdeasSection />
    <AppWishesSection />
  </div>
</template>
