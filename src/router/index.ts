import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** Page name shown in the document title and in placeholder pages. */
    title: string
  }
}

/** Application name appended to every document title. */
const APP_NAME = 'Artven'

/**
 * Only the home page is in scope. The other sidebar destinations open a shared
 * placeholder page so navigation already works end to end.
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home-page.vue'),
      meta: { title: 'Home' },
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import('@/pages/placeholder-page.vue'),
      meta: { title: 'Chat' },
    },
    {
      path: '/saved',
      name: 'saved',
      component: () => import('@/pages/placeholder-page.vue'),
      meta: { title: 'Saved' },
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/pages/placeholder-page.vue'),
      meta: { title: 'Results' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/pages/placeholder-page.vue'),
      meta: { title: 'Settings' },
    },
  ],
})

router.afterEach((to) => {
  document.title = `${to.meta.title} — ${APP_NAME}`
})

export default router
