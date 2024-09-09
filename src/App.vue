<script setup>
  import { useAuthStore } from './stores/useAuthStore'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from './stores/useSnackBarStore'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'

  const { locale } = useI18n()
  const snackBarStore = useSnackbarStore()
  const { isShown, message, type } = storeToRefs(snackBarStore)

  const authStore = useAuthStore()

  const { run: fetchUser, loading: loadingUser } = useRequest(refresh =>
    authStore.fetchUser(refresh)
  )
  watch(locale, () => {
    console.log('FFF')
    fetchUser(true)
  })
</script>

<template>
  <v-app>
    <v-overlay
      v-model="loadingUser"
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular indeterminate />
    </v-overlay>
    <v-main v-if="!loadingUser" class="main">
      <VerticalNavMenu />
      <div class="container">
        <AppBar />
        <router-view />
      </div>
    </v-main>

    <v-snackbar v-model="isShown" :color="type" elevation="24" :timeout="2000">
      {{ message }}
    </v-snackbar>
  </v-app>
</template>

<style scoped lang="scss">
.main {
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;
  width: 100%;
}
.container {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  flex-grow: 1;
}
</style>
