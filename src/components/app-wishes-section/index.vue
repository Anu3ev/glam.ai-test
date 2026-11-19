<script setup lang="ts">
import AppSectionPlaceholder from '@/components/app-section-placeholder/index.vue'
</script>

<template>
  <section aria-labelledby="wishes-title" class="flex flex-col gap-3">
    <h2 id="wishes-title" class="text-lg font-bold">Wishes</h2>

    <AppSectionPlaceholder
      name="Category filter"
      contents="Category chips (For you, Food, Jewelry…) and the Smart Search entry point."
    />

    <AppSectionPlaceholder
      name="Wish grid"
      contents="Masonry grid of template tiles with save and Use actions."
      class="min-h-96"
    />
  </section>
</template>
