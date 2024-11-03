/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/useAuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...setupLayouts(routes)],
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

const isLoggedIn = authStore => !!authStore.token

const needsToLinkAccounts = authStore => {
  return (
    authStore.user &&
    (!authStore.user?.has_linked_ad_account ||
      !authStore.user?.has_linked_website)
  )
}

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.name === '/auth/' && isLoggedIn(authStore)) {
    return next({ name: '/' })
  }

  if (to.name === '/auth/') {
    return next()
  }

  if (!isLoggedIn(authStore)) {
    return next({ name: '/auth/' })
  }

  if (needsToLinkAccounts(authStore) && !to.name.includes('link-ad-accounts')) {
    return next({ name: '/link-ad-accounts' })
  }

  next()
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
