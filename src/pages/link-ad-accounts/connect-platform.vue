<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { usePlatformsStore } from '@/stores/usePlatformsStore'
  import { storeToRefs } from 'pinia'
  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useRouter } from 'vue-router'
  import { onMounted } from 'vue'
  const router = useRouter()

  const platformsStore = usePlatformsStore()

  const { show } = useSnackbarStore()
  const { platforms } = storeToRefs(platformsStore)
  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()
  const showConnectionDialog = ref(false)
  const chosenPlatform = ref(null)
  const selectedPlatform = ref(null)
  const showConfirmationDialog = ref(false)

  const { run: getActivePlatforms, loading: loadingCheckingPlatforms } = useRequest(
    platformsStore.getActivePlatforms
  )

  onMounted(() => {
    getActivePlatforms()
  })

  const getProperties = status => {
    switch (status) {
      case 'Success':
        return {
          color: 'success',
          text: t('connected'),
          prependIcon: 'streamline:check-solid',
          disabled: true,
        }
      case 'OnlyAuthenticated':
        return {
          color: 'primary',
          text: t('choose_ad_account'),
        }
      case 'UnlinkedAccount':
        return {
          color: 'primary',
          text: t('connect'),
        }
    }
  }

  const startConnection = platform => {
    chosenPlatform.value = platform
    showConnectionDialog.value = true
  }

  const startAuthentication = platform => {
    selectedPlatform.value = platform.code
    showConfirmationDialog.value = true
  }

  const cancelConnection = platform => {
    cancelAuthentication(platform)
  }

  const getEvents = platform => {
    switch (platform.status) {
      case 'Success':
        return {}
      case 'OnlyAuthenticated':
        return { click: () => startConnection(platform) }
      case 'UnlinkedAccount':
        return { click: () => startAuthentication(platform) }
    }
  }

  const { run: runCheckAuth, loading: loadingCheckingPlatform } = useRequest(
    platformsStore.checkAuth,
    {
      manual: true,
      onSuccess: () => {
        router.push(`/`)
      },
    }
  )

  // handle cancel connection
  const { run: cancelAuthentication, loading: loadingCancelPlatform } = useRequest(
    platform => platformsStore.cancelAuthentication(platform),
    {
      manual: true,

      onSuccess: () => {
        show(t('connection_canceled'), 'success')
        getActivePlatforms()
      },

    })

  const confirm = async platform => {
    const { data, messages, error } = await platformsStore.startAuthentication(
      platform
    )
    showConfirmationDialog.value = !showConfirmationDialog.value
    if (error) {
      show(messages[0], 'error')
      showConfirmationDialog.value = !showConfirmationDialog.value

      return
    }

    const popupWindow = window.open(
      data.authentication_url,
      'PopupWindow',
      'width=600,height=400'
    )

    window.addEventListener('message', async function (e) {
      if (e.origin === 'https://matrix.sa') {
        const { error, messages } = JSON.parse(e.data)

        if (error) {
          popupWindow.close()
          show(messages[0], 'error')

          return
        }

        popupWindow.close()

        show(t('connected_successfully'), 'success')
        runCheckAuth(selectedPlatform.value)
        startConnection(selectedPlatform)

      // toggleAdFormDialog(selectedPlatform.value)
      }
    })
  }

  const { run: handleConfirmation, loading: loadingAuthentication } = useRequest(
    confirm,
    {
      manual: true,
    }
  )

  const loading = computed(
    () =>
      loadingAuthentication.value ||
      loadingCheckingPlatforms.value ||
      loadingCheckingPlatform.value ||
      loadingCancelPlatform.value
  )

  const handleSavedAccount = () => {
    runCheckAuth(chosenPlatform.value.code)
  }

  watch(
    locale,
    () => {
      update([
        {
          title: t('account_connect'),
          active: false,
          to: '/link-ad-accounts',
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
    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div v-for="platform in platforms" :key="platform.code" class="box">
      <v-img aspect-ratio="1/1" :src="platform.image" width="30%" />
      <p>{{ platform.title }}</p>
      <v-btn
        v-if="platform.code !== 'twitter' && platform.code !== 'youtube' "
        v-bind="getProperties(platform.status)"
        rounded
        width="90%"
        v-on="getEvents(platform)"
      />
      <v-btn
        v-if="platform.code === 'twitter' || platform.code=== 'youtube'"
        class="soon-btn"
        disabled
        rounded
        width="90%"
      >
        {{ t("soon") }}

      </v-btn>
      <v-btn
        v-if="
          platform.status === 'Success'
        "
        color="error"
        rounded
        width="90%"
        @click="cancelConnection(platform.code)"
      >
        {{ t("cancel_connection") }}
      </v-btn>
      <v-btn
        v-if="
          platform.status === 'UnlinkedAccount' || platform.status === 'OnlyAuthenticated' && platform.code !== 'twitter' && platform.code !== 'youtube'
        "
        disabled
        rounded
        width="90%"
      >
        {{ t("cancel_connection") }}
      </v-btn>
      <v-btn
        v-if="platform.code === 'twitter' || platform.code === 'youtube' "
        color="warning"
        prepend-icon="tabler-wand"
        rounded
        to="/tracking"
        width="90%"
      >
        {{ t("generate_tracking_links") }}
      </v-btn>
    </div>
    <ConnectionConfirmationDialog
      v-if="selectedPlatform"
      v-model:is-dialog-visible="showConfirmationDialog"
      :platform="selectedPlatform"
      @confirmed="handleConfirmation"
    />
    <v-dialog v-model="showConnectionDialog" width="auto">
      <ConnectPlatformAccountDialog
        v-model:is-dialog-visible="showConnectionDialog"
        :platform="chosenPlatform"
        @saved="handleSavedAccount"
      />
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
.v-btn--disabled .v-btn__overlay {
  opacity: 0 !important;
}
.soon-btn {
  background-color: #4E1AC71A !important ;
  color: #4E1AC7 !important;
}
</style>
