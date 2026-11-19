import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

/** Hero mode: the prompt composer or the tools panel. */
export type HeroMode = 'chat' | 'tools'

/** Reads and writes the hero mode in the `?mode=` query; anything but `tools` means chat. */
export function useHeroMode() {
  const route = useRoute()
  const router = useRouter()

  return computed<HeroMode>({
    get: () => (route.query.mode === 'tools' ? 'tools' : 'chat'),
    set: (mode) => {
      const query = { ...route.query }
      if (mode === 'tools') query.mode = 'tools'
      else delete query.mode
      router.replace({ query })
    },
  })
}
