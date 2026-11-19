<script setup lang="ts">
import ModeSwitch from './mode-switch.vue'
import PromptComposer from './prompt-composer.vue'
import ToolsPanel from './tools-panel.vue'
import { useHeroMode } from './use-hero-mode'

const mode = useHeroMode()
</script>

<template>
  <section aria-labelledby="home-hero-title" class="flex flex-col items-center gap-3">
    <h1 id="home-hero-title" class="text-center text-[28px] leading-10 font-medium">
      What will you create next?
    </h1>

    <ModeSwitch v-model="mode" />

    <PromptComposer v-if="mode === 'chat'" class="mt-3" />
    <!-- No tool pages yet: picking a tool opens the prompt composer. -->
    <ToolsPanel v-else class="mt-3" @select="mode = 'chat'" />
  </section>
</template>
