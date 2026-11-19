<script setup lang="ts">
import { useWishesStore } from '@/stores/wishes'
import WishTile from './wish-tile.vue'

const store = useWishesStore()
</script>

<template>
  <div :aria-busy="store.isLoading">
    <p
      v-if="!store.isLoading && store.wishes.length === 0"
      class="py-10 text-center text-muted-foreground"
    >
      No styles match these filters.
    </p>

    <ul v-else aria-label="Wishes" class="columns-2 gap-2 sm:columns-3 lg:columns-4 xl:columns-5">
      <WishTile v-for="wish in store.wishes" :key="wish.id" :wish="wish" />
    </ul>
  </div>
</template>
