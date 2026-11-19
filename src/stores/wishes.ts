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

  /** Id of the newest load request; older responses are ignored. */
  let latestRequestId = 0

  /** Loads wishes for the current filters. Only the latest request updates the state. */
  async function load(): Promise<void> {
    const requestId = ++latestRequestId
    isLoading.value = true

    try {
      const result = await fetchWishes({
        category: activeCategory.value,
        contentTypes: [...contentTypes.value],
      })

      if (requestId === latestRequestId) {
        wishes.value = result
      }
    } finally {
      if (requestId === latestRequestId) {
        isLoading.value = false
      }
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
