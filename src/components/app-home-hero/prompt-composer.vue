<script setup lang="ts">
import { ArrowUp, ChevronDown, Plus, SlidersHorizontal, Sparkles } from '@lucide/vue'
import { computed, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Textarea } from '@/components/ui/textarea'

/** Generation models offered in the model menu. */
const MODELS = ['Auto', 'Image', 'Video'] as const

const prompt = ref('')
const model = ref<string>('Auto')
const fileInput = ref<HTMLInputElement>()

const canSend = computed(() => prompt.value.trim().length > 0)

/** Mock send: there is no backend yet, so the field is just cleared. */
function sendPrompt(): void {
  if (!canSend.value) return
  prompt.value = ''
}
</script>

<template>
  <form
    aria-label="Prompt composer"
    class="w-full max-w-[786px] rounded-3xl bg-linear-to-b from-primary/60 to-border px-1 pb-1"
    @submit.prevent="sendPrompt"
  >
    <p class="flex items-center gap-1 px-3 pt-3 pb-2 text-xs leading-[15px] font-medium">
      <Sparkles class="size-5 text-primary" aria-hidden="true" />
      Unlock more features with Pro
    </p>

    <div class="flex flex-col gap-2 rounded-[20px] bg-[#171717] p-3">
      <Textarea
        v-model="prompt"
        aria-label="Prompt"
        title="Describe what you want to create"
        placeholder="Create a video ad for a skincare client."
        class="min-h-[74px] resize-none border-0 bg-transparent px-1 py-0 text-[13px] leading-5 shadow-none placeholder:text-[#a7a5a6] focus-visible:ring-0 dark:bg-transparent"
        @keydown.enter.exact.prevent="sendPrompt"
      />

      <div class="flex items-center gap-2">
        <input ref="fileInput" type="file" class="sr-only" tabindex="-1" aria-hidden="true" />
        <Button
          type="button"
          size="icon"
          title="Attach file"
          aria-label="Attach file"
          class="size-8 rounded-3xl bg-border text-white hover:bg-accent"
          @click="fileInput?.click()"
        >
          <Plus aria-hidden="true" />
        </Button>

        <span class="h-4 w-px rounded bg-accent" aria-hidden="true" />

        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              type="button"
              title="Choose model"
              :aria-label="`Model: ${model}`"
              class="h-8 gap-[7px] rounded-3xl bg-border px-3 text-xs font-medium text-white hover:bg-accent"
            >
              <SlidersHorizontal class="size-5" aria-hidden="true" />
              {{ model }}
              <ChevronDown class="size-3" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuRadioGroup v-model="model">
              <DropdownMenuRadioItem
                v-for="item in MODELS"
                :key="item"
                :value="item"
                :title="`Use the ${item} model`"
              >
                {{ item }}
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          type="submit"
          size="icon"
          title="Send prompt"
          aria-label="Send prompt"
          :disabled="!canSend"
          class="ml-auto size-8 rounded-3xl bg-white text-background hover:bg-white/90 disabled:bg-border disabled:text-muted-foreground disabled:opacity-100"
        >
          <ArrowUp aria-hidden="true" />
        </Button>
      </div>
    </div>
  </form>
</template>
