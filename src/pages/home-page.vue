<script setup lang="ts">
import AppHomeHero from '@/components/app-home-hero/index.vue'
import AppIdeasSection from '@/components/app-ideas-section/index.vue'
import AppWishesSection from '@/components/app-wishes-section/index.vue'

/** Home page: composes its sections in Figma order and holds no logic of its own. */
</script>

<template>
  <div class="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6">
    <AppHomeHero />
    <AppIdeasSection />
    <AppWishesSection />
  </div>
</template>
