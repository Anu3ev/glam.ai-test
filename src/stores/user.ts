import { ref } from 'vue'
import { defineStore } from 'pinia'

/** Signed-in account shown in the header. */
export interface User {
  name: string
  email: string
  /** Generation credits left on the account. */
  credits: number
}

/** Mock account; the app has no backend, so sign-in restores this user. */
const MOCK_USER: User = {
  name: 'Username',
  email: 'username.example@gmail.com',
  credits: 15,
}

/** Current account. `null` means signed out. */
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>({ ...MOCK_USER })

  /** Restores the mock account. */
  function signIn() {
    user.value = { ...MOCK_USER }
  }

  /** Clears the account; the header then offers to sign in again. */
  function signOut() {
    user.value = null
  }

  return { user, signIn, signOut }
})
