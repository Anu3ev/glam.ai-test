<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TOOLS, type Tool, type ToolCategory } from './tools'

/** Panel tab: Popular lists every tool, the others filter by category. */
type ToolsTab = 'popular' | ToolCategory

defineEmits<{ select: [tool: Tool] }>()

/** Tabs in Figma order. */
const TABS: readonly { value: ToolsTab; label: string }[] = [
  { value: 'popular', label: 'Popular' },
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
]

/** Tools listed under the given tab. */
function toolsFor(tab: ToolsTab): readonly Tool[] {
  return tab === 'popular' ? TOOLS : TOOLS.filter((tool) => tool.category === tab)
}
</script>

<template>
  <Tabs default-value="popular" class="w-full max-w-[786px] gap-4 rounded-[20px] bg-[#171717] p-3">
    <TabsList aria-label="Tool categories" class="mx-auto h-8 gap-2 bg-transparent p-0">
      <TabsTrigger
        v-for="tab in TABS"
        :key="tab.value"
        :value="tab.value"
        :title="`Show ${tab.label.toLowerCase()} tools`"
        class="h-8 flex-none rounded-3xl border-0 px-3 text-[13px] leading-4 font-semibold text-[#a7a5a6] hover:text-white data-[state=active]:bg-white data-[state=active]:text-background dark:text-[#a7a5a6] dark:data-[state=active]:bg-white dark:data-[state=active]:text-background"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <TabsContent v-for="tab in TABS" :key="tab.value" :value="tab.value">
      <ul class="grid grid-cols-2 gap-x-8 gap-y-3">
        <li v-for="tool in toolsFor(tab.value)" :key="tool.id">
          <button
            type="button"
            :title="`Use ${tool.title}`"
            class="flex w-full items-center gap-4 rounded-xl p-1 text-left transition-colors hover:bg-border focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            @click="$emit('select', tool)"
          >
            <span
              class="flex size-14 shrink-0 items-center justify-center rounded-xl bg-[#292929]"
              aria-hidden="true"
            >
              <component :is="tool.icon" class="size-6" />
            </span>
            <span class="flex min-w-0 flex-1 flex-col gap-0.5">
              <span class="text-[15px] leading-[18px] font-bold text-white">{{ tool.title }}</span>
              <span class="text-[11px] leading-4 font-medium text-[#a7a5a6]">
                {{ tool.subtitle }}
              </span>
            </span>
            <ChevronRight class="mx-[6.5px] size-[17px] text-muted-foreground" aria-hidden="true" />
          </button>
        </li>
      </ul>
    </TabsContent>
  </Tabs>
</template>
