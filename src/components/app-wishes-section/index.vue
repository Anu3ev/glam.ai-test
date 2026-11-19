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
    <h2 id="wishes-title" class="text-lg/[26px] font-bold text-[#f2f2f2]">Wishes</h2>

    <CategoryFilter />

    <WishGrid />
  </section>
</template>
