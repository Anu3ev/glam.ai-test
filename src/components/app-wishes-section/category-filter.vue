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
  <!-- Figma reserves an 8 px strip under the chips (a fade into the grid), so the row is 40 px. -->
  <div data-testid="wishes-categories" class="flex items-center gap-1 pb-2">
    <div class="relative min-w-0 flex-1">
      <!-- A non-zero spacing turns off the group's squared inner corners; spacing 1 is Figma's 4 px gap. -->
      <ToggleGroup
        type="single"
        aria-label="Wish categories"
        :model-value="store.activeCategory"
        :spacing="1"
        class="w-full [scrollbar-width:none] overflow-x-auto pr-15"
        @update:model-value="onCategoryChange"
      >
        <ToggleGroupItem
          v-for="category in WISH_CATEGORIES"
          :key="category"
          :value="category"
          :title="`Show ${category} wishes`"
          class="h-8 rounded-3xl px-3 text-control text-subtle hover:bg-transparent hover:text-foreground data-[state=on]:bg-white data-[state=on]:text-background"
        >
          {{ category }}
        </ToggleGroupItem>
      </ToggleGroup>

      <!-- Figma fades the chips out in the last 60 px before the Smart Search button. -->
      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-15 bg-linear-to-l from-background to-transparent"
        aria-hidden="true"
      />
    </div>

    <SmartSearchDialog />
  </div>
</template>
