<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Sparkle, Sparkles } from '@lucide/vue'
import { useUserStore } from '@/stores/user'
import HelpMenu from './help-menu.vue'
import ProfileMenu from './profile-menu.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <!-- Below sm the header keeps every action and drops decoration, so it fits at 320 px. -->
  <header class="flex h-14 shrink-0 items-center justify-between gap-2 px-4 pt-4 sm:px-5">
    <!-- The wordmark stands in for the Figma logo graphic, so it is the one text without a text-<role> style. -->
    <RouterLink
      :to="{ name: 'home' }"
      title="artven home"
      class="flex items-center gap-1 rounded-lg text-lg font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <span class="flex size-[30px] items-center justify-center">
        <Sparkles class="size-5 text-primary" aria-hidden="true" />
      </span>
      <span class="max-sm:sr-only">artven</span>
    </RouterLink>

    <div class="flex items-center gap-2 sm:gap-3">
      <HelpMenu />

      <span class="h-4 w-px rounded bg-accent max-sm:hidden" aria-hidden="true" />

      <template v-if="user">
        <!-- Figma: #111111 under a flat 14% #b7aefd layer, which blends to the secondary token. -->
        <div class="flex h-10 items-center gap-1 rounded-[20px] bg-secondary p-1">
          <p class="flex h-8 items-center gap-1 pr-3 pl-2 text-account max-sm:hidden">
            <Sparkle class="size-5 text-primary" aria-hidden="true" />
            {{ user.credits }}
            <span class="sr-only">credits left</span>
          </p>
          <RouterLink
            :to="{ name: 'settings' }"
            title="Upgrade your plan"
            class="flex h-8 items-center rounded-2xl bg-primary px-4 text-control text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Upgrade
          </RouterLink>
        </div>

        <ProfileMenu :user="user" @sign-out="userStore.signOut" />
      </template>

      <button
        v-else
        type="button"
        title="Sign in"
        class="flex h-10 items-center rounded-[20px] bg-primary px-4 text-control text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        @click="userStore.signIn"
      >
        Sign in
      </button>
    </div>
  </header>
</template>
