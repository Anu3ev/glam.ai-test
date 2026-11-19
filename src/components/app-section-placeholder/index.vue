<script setup lang="ts">
/**
 * Temporary outline of a planned block. It names the block and lists what it
 * will contain, so the page structure can be reviewed before any real UI exists.
 * Delete each usage once the real block replaces it.
 */
defineProps<{
  /** Block name from the Figma design. */
  name: string
  /** Planned contents of the block. */
  contents: string
}>()
</script>

<template>
  <div class="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
    <p class="font-medium text-foreground">{{ name }}</p>
    <p>{{ contents }}</p>
  </div>
</template>
