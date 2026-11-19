<script setup lang="ts">
import { Check, Plus, Search } from '@lucide/vue'
import { ref } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useWishesStore } from '@/stores/wishes'
import { WISH_CONTENT_TYPES, type WishContentType } from '@/types/wish'

/** Product profiles offered by the mock; the first one stands for creating a new profile. */
const PROFILES = ['Add Profile', 'Profile 1', 'Profile 2'] as const

const store = useWishesStore()

const isOpen = ref(false)
const selectedProfile = ref<string | null>(null)
const selectedTypes = ref<WishContentType[]>([])

/** Restores the dialog choices from the applied filters every time it opens. */
function onOpenChange(open: boolean): void {
  if (open) {
    selectedTypes.value = [...store.contentTypes]
  }

  isOpen.value = open
}

/** Adds the content type to the selection or removes it. */
function toggleType(type: WishContentType): void {
  selectedTypes.value = selectedTypes.value.includes(type)
    ? selectedTypes.value.filter((selected) => selected !== type)
    : [...selectedTypes.value, type]
}

/** Applies the selected content types to the grid and closes the dialog. */
function findTemplates(): void {
  store.applySmartSearch(selectedTypes.value)
  isOpen.value = false
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="onOpenChange">
    <DialogTrigger
      title="Smart Search"
      aria-label="Smart Search"
      class="flex size-8 shrink-0 items-center justify-center rounded-2xl bg-[#434343] text-white hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
    >
      <Search class="size-5" aria-hidden="true" />
    </DialogTrigger>

    <DialogContent
      class="flex max-w-[600px] flex-col gap-5 rounded-[20px] border-border bg-card p-6 sm:max-w-[600px]"
    >
      <div class="flex flex-col gap-3">
        <DialogTitle class="text-lg/[26px] font-bold text-[#f2f2f2]">Smart Search</DialogTitle>
        <DialogDescription class="text-[13px]/5 text-muted-foreground">
          Use a product profile to see only relevant styles
        </DialogDescription>

        <div class="flex gap-3">
          <button
            v-for="profile in PROFILES"
            :key="profile"
            type="button"
            :title="`Select ${profile}`"
            :aria-pressed="selectedProfile === profile"
            class="flex w-20 flex-col items-center gap-2 rounded-xl py-2 text-xs font-medium text-white hover:bg-secondary aria-pressed:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            @click="selectedProfile = profile"
          >
            <span
              class="flex size-[60px] items-center justify-center overflow-hidden rounded-full bg-border"
            >
              <Plus v-if="profile === 'Add Profile'" class="size-5" aria-hidden="true" />
              <img
                v-else
                :src="`https://picsum.photos/seed/${profile.replace(' ', '-')}/120/120`"
                alt=""
                loading="lazy"
                class="size-full object-cover"
              />
            </span>
            {{ profile }}
          </button>
        </div>
      </div>

      <fieldset class="flex flex-col gap-3">
        <legend class="mb-3 text-[15px]/[18px] font-bold text-white">Content type</legend>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="type in WISH_CONTENT_TYPES"
            :key="type"
            type="button"
            :title="`Filter by ${type}`"
            :aria-pressed="selectedTypes.includes(type)"
            class="flex h-9 items-center gap-1 rounded-3xl bg-border px-3 text-[13px]/4 font-semibold text-muted-foreground hover:text-foreground aria-pressed:bg-white aria-pressed:pr-2 aria-pressed:text-background focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            @click="toggleType(type)"
          >
            {{ type }}
            <Check v-if="selectedTypes.includes(type)" class="size-5" aria-hidden="true" />
          </button>
        </div>
      </fieldset>

      <div class="flex justify-center py-1">
        <button
          type="button"
          title="Find templates for the selected content types"
          class="h-10 rounded-3xl bg-white px-5 text-[13px]/4 font-semibold text-background hover:bg-white/90 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          @click="findTemplates"
        >
          Find Templates
        </button>
      </div>
    </DialogContent>
  </Dialog>
</template>
