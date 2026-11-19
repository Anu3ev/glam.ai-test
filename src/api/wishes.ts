import type { Wish, WishFilters } from '@/types/wish'
import { WISH_CATEGORIES, WISH_CONTENT_TYPES } from '@/types/wish'

/** Simulated network delay of the mock API. */
const MOCK_DELAY_MS = 300

/** Number of generated wishes. */
const WISH_COUNT = 30

/** Preview heights that give the masonry grid its rhythm (Figma tiles: 280, 320, 406). */
const TILE_HEIGHTS = [406, 320, 280, 406, 320]

/** Categories a wish can belong to: every chip except "For you". */
const TILE_CATEGORIES = WISH_CATEGORIES.filter((category) => category !== 'For you')

/** Deterministic mock wishes, so screenshots and tests stay stable. */
const MOCK_WISHES: Wish[] = Array.from({ length: WISH_COUNT }, (_, index) => {
  const category = TILE_CATEGORIES[index % TILE_CATEGORIES.length]!

  return {
    id: `wish-${index + 1}`,
    name: `${category} Style ${index + 1}`,
    category,
    contentType: WISH_CONTENT_TYPES[index % WISH_CONTENT_TYPES.length]!,
    height: TILE_HEIGHTS[index % TILE_HEIGHTS.length]!,
  }
})

/** Waits for the given number of milliseconds. */
function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/** Returns the wishes that match the category and the Smart Search content types. */
export async function fetchWishes(params: WishFilters): Promise<Wish[]> {
  await wait(MOCK_DELAY_MS)

  return MOCK_WISHES.filter((wish) => {
    const matchesCategory = params.category === 'For you' || wish.category === params.category
    const matchesContentType =
      params.contentTypes.length === 0 || params.contentTypes.includes(wish.contentType)

    return matchesCategory && matchesContentType
  })
}
