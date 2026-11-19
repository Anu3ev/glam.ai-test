<script setup lang="ts">
import AppSectionPlaceholder from '@/components/app-section-placeholder/index.vue'
</script>

<template>
  <section aria-labelledby="ideas-title" class="flex flex-col gap-3">
    <h2 id="ideas-title" class="text-lg font-bold">Ideas for You</h2>

    <AppSectionPlaceholder
      name="Idea cards"
      contents="Horizontal row of idea cards with a refresh action and a right-edge fade."
    />
  </section>
</template>
