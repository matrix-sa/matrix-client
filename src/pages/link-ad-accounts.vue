<script setup>
  import { useI18n } from 'vue-i18n'
  import { useStoresStore } from '@/stores/useStoresStore'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import StoresService from '@/servcies/stores-service'
  import { storeToRefs } from 'pinia'
  import { useRequest } from 'vue-request'

  const { t } = useI18n()
  const storesStore = useStoresStore()
  const { show } = useSnackbarStore()
  const router = useRouter()
  const route = useRoute()

  const { stores, chosenStoreFromAddStoreForm } = storeToRefs(storesStore)

  const userHasConnectedStore = computed(
    () => false && stores.value.some(store => store.status === 'Success')
  )

  const { loading: loadingCheckStatuses } = useRequest(storesStore.checkAuthAll, {
    onSuccess: () => {
      if (
        route.name.includes('connect-platform') &&
        !userHasConnectedStore.value
      ) {
        show(t('connect_store_first'), 'warning')
        router.push({ name: '/link-ad-accounts/' })
      }
    },
  })

  const { run: startAuthentication, loading: loadingAuthentication } = useRequest(
    StoresService.startAuthentication,
    {
      manual: true,
      onSuccess: response => {
        const { data, messages, error } = response.data

        if (error) {
          show(messages[0], 'error')

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
            websiteStore.checkAuth(form.value.website_type)

            await authStore.fetchUser(true)
          }
        })
      },
      onError: error => {
        show(error, 'error')
      },
    }
  )

  const startConnectingStore = () => {
    if (!chosenStoreFromAddStoreForm.value) return
    startAuthentication(chosenStoreFromAddStoreForm.value)
  }

  const isCurrentStoreConnected = computed(
    () =>
      stores.value.find(s => s.code === chosenStoreFromAddStoreForm.value)
        ?.status === 'Success'
  )

  const connectButtonText = computed(() =>
    isCurrentStoreConnected.value ? t('edit_platform_btn') : t('connect_platform_btn')
  )
</script>

<template>
  <v-overlay v-model="loadingCheckStatuses" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="50" :width="7" />
  </v-overlay>
  <div class="main">
    <p class="link-ad-title">{{ t("link_accounts_title") }}</p>
    <div class="buttons-container">
      <v-btn
        color="primary"
        flat
        height="40px"
        prepend-icon="zondicons:add-solid"
        rounded
      >
        {{ t("add_store") }}
      </v-btn>
      <v-btn
        color="surface-variant"
        flat
        height="40px"
        prepend-icon="bi:link"
        rounded
        variant="outlined"
      >
        {{ t("connect_platform_btn") }}
      </v-btn>
      <v-btn
        class="store-btn"
        color="primary"
        :disabled="!chosenStoreFromAddStoreForm"
        flat
        height="40px"
        :loading="loadingAuthentication"
        rounded
        :text="connectButtonText"
        type="submit"
        @click="startConnectingStore"
      />
    </div>
    <v-divider class="divider" />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.main {
  padding: 20px;
}

.link-ad-title {
  font-weight: 400;
}

.buttons-container {
  display: grid;
  grid-template-columns: repeat(2, auto) 1fr;
  justify-content: start;
  gap: 12px;
  margin-top: 20px;

  button {
    font-weight: 500;
    font-family: "Tajawal";
  }

  button:last-child {
    background-color: red;
  }

  .store-btn {
    justify-self: end;
  }
}

.divider {
  margin-block: 1em;
}
</style>
