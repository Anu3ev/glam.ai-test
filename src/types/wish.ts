/** Category chips shown above the wish grid. "For you" shows every wish. */
export const WISH_CATEGORIES = [
  'For you',
  'Food',
  'Jewelry',
  'Bags',
  'Clothing',
  'Footwear',
  'Accessories',
  'Beauty',
  'Text',
  'Logos',
  'Ghost Mannequin',
  'Sports',
  'Interior',
  'Electronics',
] as const

/** Content types offered by the Smart Search dialog. */
export const WISH_CONTENT_TYPES = [
  'Photo',
  'Video',
  'Photoshoot',
  'Post',
  'Campaign',
  'Carousel',
  'Reel',
  'Stories',
  'Movie',
  'Book',
] as const

/** One category chip value. */
export type WishCategory = (typeof WISH_CATEGORIES)[number]

/** One Smart Search content type. */
export type WishContentType = (typeof WISH_CONTENT_TYPES)[number]

/** A style template tile in the Wishes grid. */
export interface Wish {
  id: string
  name: string
  category: Exclude<WishCategory, 'For you'>
  contentType: WishContentType
  /** Preview height in pixels at a 400 px wide image. */
  height: number
}

/** Filters accepted by the wishes mock API. */
export interface WishFilters {
  category: WishCategory
  /** An empty list means every content type. */
  contentTypes: WishContentType[]
}
