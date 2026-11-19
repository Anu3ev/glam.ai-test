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

    <!--
      Figma tile states: the caption shows only the label (48 px); on hover it grows to 86 px
      with a full-width Use pill. Without hover (touch screens) Use stays visible. With hover,
      Use is visually collapsed (sr-only), not hidden, so screen readers and Shift+Tab reach it.
    -->
    <div
      class="absolute inset-x-0 bottom-0 flex flex-col gap-3 bg-[linear-gradient(to_top,#171717_0%,rgb(23_23_23/0.2)_76%,rgb(125_125_125/0)_100%)] px-1.5 pt-4 pb-1.5 [@media(hover:hover)]:[.group:not(:hover):not(:focus-within)_&]:pb-4"
    >
      <p class="truncate px-2 text-control text-white">{{ wish.name }}</p>
      <button
        type="button"
        :title="`Use ${wish.name}`"
        :aria-label="`Use ${wish.name}`"
        class="h-9 w-full rounded-full bg-white px-4 text-control text-background focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none [@media(hover:hover)]:[.group:not(:hover):not(:focus-within)_&]:sr-only"
        @click="useWish"
      >
        Use
      </button>
    </div>
  </li>
</template>
