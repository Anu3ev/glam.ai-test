import { defineStore } from 'pinia'
import { ref } from 'vue'

import { fetchIdeas } from '@/api/ideas'
import type { Idea } from '@/types/idea'

/** Holds the "Ideas for You" cards and the idea the user picked. */
export const useIdeasStore = defineStore('ideas', () => {
  const ideas = ref<Idea[]>([])
  const isLoading = ref(false)
  /** Idea chosen with its "+" button; the composer will read it later. */
  const selectedIdeaId = ref<string | null>(null)

  /** Loads the ideas from the mock API. */
  async function load(): Promise<void> {
    isLoading.value = true
    try {
      ideas.value = await fetchIdeas()
    } finally {
      isLoading.value = false
    }
  }

  /** Reorders the ideas randomly; the first card always changes so the refresh is visible. */
  function shuffle(): void {
    const shuffled = [...ideas.value].sort(() => Math.random() - 0.5)
    const firstIdea = shuffled[0]
    if (firstIdea && shuffled.length > 1 && firstIdea === ideas.value[0]) {
      shuffled.push(firstIdea)
      shuffled.shift()
    }
    ideas.value = shuffled
  }

  /**
   * Marks an idea as chosen.
   *
   * @param ideaId - Identifier of the chosen idea.
   */
  function select(ideaId: string): void {
    selectedIdeaId.value = ideaId
  }

  return { ideas, isLoading, selectedIdeaId, load, shuffle, select }
})
