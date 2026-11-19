<script setup lang="ts">
import AppSectionPlaceholder from '@/components/app-section-placeholder/index.vue'
</script>

<template>
  <section aria-labelledby="home-hero-title" class="flex flex-col items-center gap-4">
    <h1 id="home-hero-title" class="text-center text-3xl font-medium">
      What will you create next?
    </h1>

    <AppSectionPlaceholder name="Mode switch" contents="Chat · Tools" class="w-full max-w-xs" />

    <AppSectionPlaceholder
      name="Prompt composer / Tools panel"
      contents="Chat mode: Pro banner, prompt field, attach, model select, send. Tools mode: Popular · Image · Video tabs and the tool grid."
      class="w-full max-w-2xl"
    />
  </section>
</template>
