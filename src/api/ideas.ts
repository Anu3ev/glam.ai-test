import type { Idea } from '@/types/idea'

/** Simulated network latency of the mock API, in milliseconds. */
const MOCK_DELAY_MS = 300

/**
 * Builds a mock idea with a seeded placeholder thumbnail.
 *
 * @param id - Stable identifier and image seed.
 * @param title - Card title.
 * @param subtitle - Card subtitle.
 */
function createMockIdea(id: string, title: string, subtitle: string): Idea {
  return { id, title, subtitle, imageUrl: `https://picsum.photos/seed/${id}/200/200` }
}

/** Mock ideas until a real backend exists. */
const MOCK_IDEAS: Idea[] = [
  createMockIdea('product-profile', 'Product Profile', 'Create consistent brand content'),
  createMockIdea('studio-shoot', 'Studio Shoot', 'Full campaign photoshoot'),
  createMockIdea('smart-retouch', 'Smart Retouch', 'Fix product imperfections'),
  createMockIdea('edit-background', 'Edit Background', 'Set a new scene'),
  createMockIdea('model-swap', 'Model Swap', 'Show it on a new model'),
  createMockIdea('social-ad', 'Social Ad', 'Ready-to-post ad creatives'),
]

/** Returns the idea cards for the home page after a short simulated delay. */
export async function fetchIdeas(): Promise<Idea[]> {
  await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
  return MOCK_IDEAS.map((idea) => ({ ...idea }))
}
