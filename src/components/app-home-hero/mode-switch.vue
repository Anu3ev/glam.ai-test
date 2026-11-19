<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { HeroMode } from './use-hero-mode'

const mode = defineModel<HeroMode>({ required: true })

/** Switch options with their labels. */
const OPTIONS: readonly { value: HeroMode; label: string }[] = [
  { value: 'chat', label: 'Chat' },
  { value: 'tools', label: 'Tools' },
]

/** Keeps one item pressed: Reka emits an empty value when the active item is clicked again. */
function selectMode(value: unknown): void {
  if (value === 'chat' || value === 'tools') mode.value = value
}
</script>

<template>
  <!-- A non-zero spacing turns off the group's squared inner corners; spacing 1 is Figma's 4 px gap. -->
  <ToggleGroup
    type="single"
    :model-value="mode"
    :spacing="1"
    aria-label="Create mode"
    class="h-10 w-[184px] rounded-[20px] bg-secondary p-1"
    @update:model-value="selectMode"
  >
    <ToggleGroupItem
      v-for="option in OPTIONS"
      :key="option.value"
      :value="option.value"
      :title="`Switch to ${option.label} mode`"
      class="h-8 flex-1 rounded-2xl text-control text-white hover:bg-transparent hover:text-white data-[state=on]:bg-white data-[state=on]:text-background"
    >
      {{ option.label }}
    </ToggleGroupItem>
  </ToggleGroup>
</template>
