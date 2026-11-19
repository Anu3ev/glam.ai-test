<script setup lang="ts">
import { onMounted } from 'vue'
import { useWishesStore } from '@/stores/wishes'
import CategoryFilter from './category-filter.vue'
import WishGrid from './wish-grid.vue'

const store = useWishesStore()

onMounted(() => {
  store.load()
})
</script>

<template>
  <section aria-labelledby="wishes-title" class="flex flex-col gap-3">
    <h2 id="wishes-title" class="flex h-8 items-center text-section text-title">Wishes</h2>

    <CategoryFilter />

    <WishGrid />
  </section>
</template>
