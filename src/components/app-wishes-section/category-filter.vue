<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useWishesStore } from '@/stores/wishes'
import { WISH_CATEGORIES, type WishCategory } from '@/types/wish'
import SmartSearchDialog from './smart-search-dialog.vue'

const store = useWishesStore()

/** Switches the category; ignores the empty value a second click on the active chip sends. */
function onCategoryChange(value: AcceptableValue | AcceptableValue[]): void {
  if (typeof value === 'string') {
    store.setCategory(value as WishCategory)
  }
}
</script>

<template>
  <div data-testid="wishes-categories" class="flex items-center gap-1">
    <ToggleGroup
      type="single"
      aria-label="Wish categories"
      :model-value="store.activeCategory"
      class="min-w-0 [scrollbar-width:none] flex-1 gap-1 overflow-x-auto"
      @update:model-value="onCategoryChange"
    >
      <ToggleGroupItem
        v-for="category in WISH_CATEGORIES"
        :key="category"
        :value="category"
        :title="`Show ${category} wishes`"
        class="h-8 rounded-3xl px-3 text-[13px]/4 font-semibold text-[#a7a5a6] hover:bg-secondary hover:text-foreground data-[state=on]:bg-white data-[state=on]:text-background"
      >
        {{ category }}
      </ToggleGroupItem>
    </ToggleGroup>

    <SmartSearchDialog />
  </div>
</template>
