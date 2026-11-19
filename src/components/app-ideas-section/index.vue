<script setup lang="ts">
import { Plus, RefreshCw } from '@lucide/vue'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useIdeasStore } from '@/stores/ideas'

/** Number of skeleton cards shown while the ideas load. */
const SKELETON_COUNT = 4

const ideasStore = useIdeasStore()
const { ideas, isLoading } = storeToRefs(ideasStore)

onMounted(() => {
  ideasStore.load()
})
</script>

<template>
  <section aria-labelledby="ideas-title" class="flex flex-col gap-3">
    <div class="flex h-8 items-center gap-2.5">
      <h2 id="ideas-title" class="flex-1 text-section text-title">Ideas for You</h2>
      <button
        type="button"
        title="Refresh ideas"
        aria-label="Refresh ideas"
        class="flex size-8 items-center justify-center rounded-full bg-border text-muted-foreground transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50"
        :disabled="isLoading"
        @click="ideasStore.shuffle()"
      >
        <RefreshCw class="size-5" aria-hidden="true" />
      </button>
    </div>

    <div class="relative" :aria-busy="isLoading">
      <ul v-if="isLoading" class="flex gap-3 overflow-hidden" aria-hidden="true">
        <li
          v-for="index in SKELETON_COUNT"
          :key="index"
          class="h-[100px] w-[320px] shrink-0 animate-pulse rounded-[20px] bg-card"
        />
      </ul>

      <ul
        v-else
        class="flex snap-x snap-mandatory gap-3 overflow-x-auto pr-[100px] [scrollbar-width:none]"
      >
        <!-- Figma card: #171717 → #2c2c2c fill and a border that fades in towards the right. -->
        <li
          v-for="idea in ideas"
          :key="idea.id"
          class="relative flex h-[100px] w-[320px] shrink-0 snap-start items-center gap-4 rounded-[20px] border border-transparent [background:linear-gradient(to_right,#171717,#2c2c2c)_padding-box,linear-gradient(to_right,rgb(67_67_67/0),#434343)_border-box] p-1"
        >
          <img
            :src="idea.imageUrl"
            alt=""
            width="90"
            height="90"
            class="size-[90px] shrink-0 rounded-2xl bg-accent object-cover"
          />
          <div class="flex min-w-0 flex-col gap-0.5 pr-[38px]">
            <h3 class="truncate text-idea text-white">
              {{ idea.title }}
            </h3>
            <p class="truncate text-caption text-subtle">
              {{ idea.subtitle }}
            </p>
          </div>
          <button
            type="button"
            :title="`Use ${idea.title}`"
            :aria-label="`Use ${idea.title}`"
            class="absolute top-[6px] right-[6px] flex size-8 items-center justify-center rounded-full bg-accent text-muted-foreground transition-colors hover:text-white focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            @click="ideasStore.select(idea.id)"
          >
            <Plus class="size-5" aria-hidden="true" />
          </button>
        </li>
      </ul>

      <div
        class="pointer-events-none absolute inset-y-0 right-0 w-[100px] bg-linear-to-r from-transparent to-background"
        aria-hidden="true"
      />
    </div>
  </section>
</template>
