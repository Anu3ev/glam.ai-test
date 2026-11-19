<script setup lang="ts">
import { useRoute } from 'vue-router'

/** Stand-in for sidebar destinations that are outside the current scope. */
const route = useRoute()
</script>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-medium">{{ route.meta.title }}</h1>
    <p class="text-sm text-muted-foreground">This section is not part of the current scope.</p>
  </div>
</template>
