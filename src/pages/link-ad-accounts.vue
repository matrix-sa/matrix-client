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
    () => stores.value.some(store => store.status === 'Success')
  )

  const isConnectPlatformStep = computed(() =>
    route.name.includes('connect-platform')
  )

  const { run: checkAllStores, loading: loadingCheckStatuses } = useRequest(storesStore.checkAuthAll, {
    onSuccess: () => {
      if (isConnectPlatformStep.value && !userHasConnectedStore.value) {
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

  const connectStoreButtonText = computed(() =>
    isCurrentStoreConnected.value
      ? t('edit_store_btn')
      : t('connect_store_btn')
  )

  const activeBtnProps = ref({
    color: 'primary',
    flat: true,
  })

  const inActiveBtnProps = ref({
    color: 'surface-variant',
    flat: true,
    variant: 'outlined',
  })
</script>

<template>
  <div>
    <v-overlay v-model="loadingCheckStatuses" class="align-center justify-center">
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <div class="main">
      <p class="link-ad-title">{{ t("link_accounts_title") }}</p>
      <div class="buttons-container">
        <v-btn
          v-bind="isConnectPlatformStep ? inActiveBtnProps : activeBtnProps"
          height="40px"
          prepend-icon="zondicons:add-solid"
          rounded
          :to="{ name: '/link-ad-accounts/add-store' }"
          @click="checkAllStores"
        >
          {{ t("add_store") }}
        </v-btn>
        <v-btn
          v-bind="isConnectPlatformStep ? activeBtnProps : inActiveBtnProps"
          height="40px"
          prepend-icon="bi:link"
          rounded
          :to="{ name: '/link-ad-accounts/connect-platform' }"
          @click="checkAllStores"
        >
          {{ t("connect_platform_btn") }}
        </v-btn>
        <v-btn
          v-if="!isConnectPlatformStep"
          class="store-btn"
          color="primary"
          :disabled="!chosenStoreFromAddStoreForm"
          flat
          height="40px"
          :loading="loadingAuthentication"
          rounded
          :text="connectStoreButtonText"
          type="submit"
          @click="startConnectingStore"
        />
      </div>
      <v-divider class="divider" />
      <div>
        <router-view v-slot="{ Component }">
          <transition name="fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
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
<style>
/* TODO Doha: Remove animation if you want */
.fade-enter-active {
    transition: all 0.3s ease-out;
  }
  .fade-enter-from,
  .fade-leave-to {
    transform: translateX(2em);
    opacity: 0;
  }
</style>
