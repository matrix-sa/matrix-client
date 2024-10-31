<script setup>
  import { useAuthStore } from './stores/useAuthStore'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from './stores/useSnackBarStore'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'
  import { useLoadingStore } from './stores/useLoadingStore'

  const { isLoading: isLoadingRoute } = storeToRefs(useLoadingStore())
  console.log(isLoadingRoute.value)
  const { locale } = useI18n()
  const snackBarStore = useSnackbarStore()
  const { isShown, message, type } = storeToRefs(snackBarStore)

  const authStore = useAuthStore()

  const { run: fetchUser, loading: loadingUser } = useRequest(refresh =>
    authStore.fetchUser(refresh)
  )

  const route = useRoute()
  const isLoginPage = ref(route.path === '/login')
  console.log(route.path)
  watch(route, newRoute => {
    isLoginPage.value = newRoute.path === '/login'
  })

  watch(locale, () => {
    fetchUser(true)
  })
</script>

<template>
  <v-app>
    <v-overlay
      v-if="isLoadingRoute"
      v-model="loadingUser"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div v-if="!isLoginPage">
      <DesktopLayout v-if="!loadingUser && $vuetify.display.mdAndUp" />
      <MobileLayout v-if="!loadingUser && !$vuetify.display.mdAndUp" class="mobile-layout" />
    </div>
    <router-view v-else />
    <v-snackbar v-model="isShown" :color="type" elevation="24" :timeout="2000">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>
