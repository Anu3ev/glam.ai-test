/** A suggested starting point shown in the "Ideas for You" row. */
export interface Idea {
  /** Stable identifier, also used as the placeholder image seed. */
  id: string
  /** Short action name, for example "Studio Shoot". */
  title: string
  /** One-line explanation under the title. */
  subtitle: string
  /** Thumbnail URL. */
  imageUrl: string
}
