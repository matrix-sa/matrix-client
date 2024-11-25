<script setup>
  import { useI18n } from 'vue-i18n'
  import { useStoresStore } from '@/stores/useStoresStore'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { storeToRefs } from 'pinia'
  import { useRequest } from 'vue-request'

  const { t } = useI18n()
  const storesStore = useStoresStore()
  const { show } = useSnackbarStore()
  const router = useRouter()
  const route = useRoute()

  const { stores } = storeToRefs(storesStore)

  const userHasConnectedStore = computed(() =>
    stores.value.some(store => store.status === 'Success')
  )

  const isConnectPlatformStep = computed(() =>
    route.name.includes('connect-platform')
  )

  const { run: checkAllStores, loading: loadingCheckStatuses } = useRequest(
    storesStore.checkAuthAll,
    {
      onSuccess: () => {
        if (isConnectPlatformStep.value && !userHasConnectedStore.value) {
          show(t('connect_store_first'), 'warning')
          router.push({ name: '/link-ad-accounts' })
        }
      },
    }
  )

  const activeBtnProps = ref({
    color: 'warning',
    flat: true,
  })

  const inActiveBtnProps = ref({
    color: 'surface-variant',
    flat: true,
    variant: 'outlined',
  })

  watch(
    () => route.name,
    current => {
      if (current === '/link-ad-accounts') {
        router.push({ name: '/link-ad-accounts/add-store' })
      }
    },
    { immediate: true }
  )
</script>

<template>
  <div>
    <v-overlay
      v-model="loadingCheckStatuses"
      class="align-center justify-center"
      persistent
    >
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
  background-color: white;
  border-radius: 1rem;
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
