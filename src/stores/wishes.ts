import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchWishes } from '@/api/wishes'
import type { Wish, WishCategory, WishContentType } from '@/types/wish'

/** Wishes grid state: filters, loaded tiles and saved tiles. */
export const useWishesStore = defineStore('wishes', () => {
  const wishes = ref<Wish[]>([])
  const activeCategory = ref<WishCategory>('For you')
  const contentTypes = ref<WishContentType[]>([])
  const savedIds = ref(new Set<string>())
  const selectedWishId = ref<string | null>(null)
  const isLoading = ref(false)

  /** Loads wishes for the current filters. */
  async function load(): Promise<void> {
    isLoading.value = true

    try {
      wishes.value = await fetchWishes({
        category: activeCategory.value,
        contentTypes: contentTypes.value,
      })
    } finally {
      isLoading.value = false
    }
  }

  /** Switches the category chip and reloads the grid. */
  async function setCategory(category: WishCategory): Promise<void> {
    activeCategory.value = category
    await load()
  }

  /** Saves the wish or removes it from saved. */
  function toggleSaved(id: string): void {
    if (savedIds.value.has(id)) {
      savedIds.value.delete(id)
    } else {
      savedIds.value.add(id)
    }
  }

  /** Applies the Smart Search content types and reloads the grid. */
  async function applySmartSearch(types: WishContentType[]): Promise<void> {
    contentTypes.value = [...types]
    await load()
  }

  return {
    wishes,
    activeCategory,
    contentTypes,
    savedIds,
    selectedWishId,
    isLoading,
    load,
    setCategory,
    toggleSaved,
    applySmartSearch,
  }
})
