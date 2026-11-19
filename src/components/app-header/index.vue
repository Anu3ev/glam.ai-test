<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Sparkles } from '@lucide/vue'
import { useUserStore } from '@/stores/user'
import HelpMenu from './help-menu.vue'
import ProfileMenu from './profile-menu.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <header class="flex h-14 shrink-0 items-center justify-between px-5 pt-4">
    <RouterLink
      :to="{ name: 'home' }"
      title="artven home"
      class="flex items-center gap-1 rounded-lg text-lg font-semibold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <span class="flex size-[30px] items-center justify-center">
        <Sparkles class="size-5 text-primary" aria-hidden="true" />
      </span>
      artven
    </RouterLink>

    <div class="flex items-center gap-3">
      <HelpMenu />

      <span class="h-4 w-px rounded bg-accent" aria-hidden="true" />

      <template v-if="user">
        <div
          class="flex h-10 items-center gap-1 rounded-[20px] bg-card bg-linear-to-r from-white/5 to-transparent p-1"
        >
          <p class="flex h-8 items-center gap-1 pr-3 pl-2 text-sm font-semibold">
            <Sparkles class="size-5 text-primary" aria-hidden="true" />
            {{ user.credits }}
            <span class="sr-only">credits left</span>
          </p>
          <RouterLink
            :to="{ name: 'settings' }"
            title="Upgrade your plan"
            class="flex h-8 items-center rounded-2xl bg-primary px-4 text-[13px] leading-4 font-semibold text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
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
        class="flex h-10 items-center rounded-[20px] bg-primary px-4 text-[13px] font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        @click="userStore.signIn"
      >
        Sign in
      </button>
    </div>
  </header>
</template>
