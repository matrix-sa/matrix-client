<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { usePlatformsStore } from '@/stores/usePlatformsStore'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'

  const platformsStore = usePlatformsStore()

  const { platforms } = storeToRefs(platformsStore)
  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()
  const showConnectionDialog = ref(false)
  const chosenPlatform = ref(null)

  const { run: checkAllPlatforms, loading: loadingCheckingPlatforms } =
    useRequest(platformsStore.getActivePlatforms)
  checkAllPlatforms() // TODO remove

  const connectedProps = ref({
    color: 'success',
    text: t('connected'),
    prependIcon: 'streamline:check-solid',
    disabled: true,
  })

  const notConnectedProps = ref({
    color: 'info',
    text: t('connect'),
  })

  const startConnection = platform => {
    chosenPlatform.value = platform
    showConnectionDialog.value = true
  }

  watch(
    locale,
    () => {
      update([
        {
          title: t('account_connect'),
          active: false,
          to: '/link-ad-accounts/',
        },
        {
          title: t('connect_platform'),
          active: true,
          disabled: true,
          to: '/link-ad-accounts/connect-platform/',
        },
      ])
    },
    { immediate: true }
  )
</script>
<template>
  <div class="boxes-container">
    <v-overlay v-model="loadingCheckingPlatforms" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div
      v-for="platform in platforms"
      :key="platform.code"
      class="box"
    >
      <v-img
        aspect-ratio="1/1"
        :src="platform.image"
        width="30%"
      />
      <p>{{ platform.title }}</p>
      <v-btn
        v-bind="platform.status === 'Success' ? connectedProps : notConnectedProps"
        rounded
        width="90%"
        v-on="platform.status === 'Success' ? {} : { click: () => startConnection(platform)}"
      />
    </div>
    <v-dialog
      v-model="showConnectionDialog"
      width="auto"
    >
      <ConnectPlatformDialog :platform="chosenPlatform" />
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.boxes-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 1em;
  justify-content: space-around;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr;
  }
}
.box {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 0.75em;
  align-items: center;
  background-color: rgb(var(--v-theme-background));
  padding: 1em;
  border-radius: 1em;

  p {
    font-size: 20px;
    color: black;
    font-weight: 500;
  }
}
</style>

<style lang="scss">
.v-btn--disabled .v-btn__overlay{
  opacity: 0 !important;
}
</style>
