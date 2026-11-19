<script setup lang="ts">
import { Bookmark } from '@lucide/vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useWishesStore } from '@/stores/wishes'
import type { Wish } from '@/types/wish'

const props = defineProps<{ wish: Wish }>()

const store = useWishesStore()
const router = useRouter()

const isSaved = computed(() => store.savedIds.has(props.wish.id))

/** Picks the wish as the style for a new chat and opens the chat. */
function useWish(): void {
  store.selectedWishId = props.wish.id
  router.push('/chat')
}
</script>

<template>
  <li class="group relative mb-2 break-inside-avoid overflow-hidden rounded-[20px] bg-card">
    <img
      :src="`https://picsum.photos/seed/${wish.id}/400/${wish.height}`"
      :alt="wish.name"
      :width="400"
      :height="wish.height"
      loading="lazy"
      class="block h-auto w-full"
    />

    <button
      type="button"
      :title="isSaved ? `Remove ${wish.name} from saved` : `Save ${wish.name}`"
      :aria-label="isSaved ? `Remove ${wish.name} from saved` : `Save ${wish.name}`"
      :aria-pressed="isSaved"
      class="absolute top-1.5 right-1.5 flex size-8 items-center justify-center rounded-3xl bg-accent/80 text-white hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      @click="store.toggleSaved(wish.id)"
    >
      <Bookmark class="size-5" :fill="isSaved ? 'currentColor' : 'none'" aria-hidden="true" />
    </button>

    <div
      class="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-linear-to-t from-black/80 to-transparent px-4 pt-6 pb-1.5"
    >
      <p class="truncate py-1.5 text-[13px]/4 font-semibold text-white">{{ wish.name }}</p>
      <button
        type="button"
        :title="`Use ${wish.name}`"
        :aria-label="`Use ${wish.name}`"
        class="h-8 shrink-0 rounded-3xl bg-white px-3 text-[13px]/4 font-semibold text-background opacity-100 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:opacity-0 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
        @click="useWish"
      >
        Use
      </button>
    </div>
  </li>
</template>
