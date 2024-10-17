<script setup>
import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
import { useI18n } from 'vue-i18n'
import { useStoresStore } from '@/stores/useStoresStore'
import { storeToRefs } from 'pinia'
import sallaLogo from '@/assets/salla.svg'
import zidLogo from '@/assets/zid.svg'
import storesLogo from '@/assets/stores.svg'
import { useRequest } from 'vue-request'
import StoresService from '@/services/stores-service'
import { useSnackbarStore } from '@/stores/useSnackBarStore'

const storesStore = useStoresStore()
const { update } = useBreadcrumbsStore()
const { t, locale } = useI18n()

const { stores } = storeToRefs(storesStore)
const { show } = useSnackbarStore()

const storeTypesItems = ref([])

const storesItems = computed(() =>
  stores.value.map(store => ({
    title: store.title,
    code: store.code,
    icon: store.code === 'salla' ? sallaLogo : zidLogo,
    status: store.status,
  }))
)

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

const startConnectingStore = store => {
  startAuthentication(store)
}

const loading = computed(() => loadingAuthentication.value)

watch(
  locale,
  () => {
    storeTypesItems.value = stores.value.map(store => ({
      title: store.title,
      value: store.code,
    }))

    update([
      {
        title: t('account_connect'),
        active: false,
        to: '/link-ad-accounts/',
      },
      {
        title: t('add_store'),
        active: true,
        disabled: true,
        to: '/link-ad-accounts/add-store/',
      },
    ])
  },
  { immediate: true }
)
</script>
<template>
  <div class="stores-container">
    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <img alt="" :src="storesLogo">
    <div class="content">
      <ul>
        <li>
          <span>{{ t("simply_connect_with") }}</span>
          <span class="text-warning">{{ ` ${t("matrix")} ` }}</span>
          <span>{{ t("through_connect") }}</span>
        </li>
        <li>
          <span> {{ t("how_to_edit") }} </span>
        </li>
      </ul>
      <div v-for="store in storesItems" :key="store.code" class="store-item">
        <img alt="" :src="store.icon">
        <div class="message">
          <p>{{ t("store_x", { store: store.title }) }}</p>
          <p>
            {{
              store.status === "Success"
                ? t("connected_with_store")
                : t("connect_your_store")
            }}
          </p>
        </div>
        <div class="actions">
          <template v-if="store.status === 'Success'">
            <div class="buttons-container">
              <VBtn color="primary" flat height="40px" prepend-icon="material-symbols:edit-outline" rounded
                style="padding-inline: 2.7em" :text="t('edit')" :width="160"
                @click="startConnectingStore(store.code)" />

              <VBtn color="success" flat height="40px" prepend-icon="icon-park-solid:correct" readonly rounded
                style="padding-inline: 2.7em" :text="t('connected')" :width="160" />
            </div>
          </template>

          <VBtn v-else color="warning" flat height="40px" rounded style="padding-inline: 2.7em" :text="t('connect')"
            :width="160" @click="startConnectingStore(store.code)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.stores-container {
  display: flex;
  gap: 3.25rem;
  align-items: start;

  >img {
    margin-block-start: 1.9rem;
  }

  ul {
    color: rgb(var(--v-dark-1));
    font-weight: 400;

    .text-warning {
      font-weight: 700;
    }
  }

  li::marker {
    color: rgb(var(--v-theme-warning));
  }

  li {
    list-style-position: inside;
    font-weight: 400;
    margin-block: 0.375rem;
  }

  .content {
    flex-grow: 1;
  }

  .store-item:nth-child(2) {
    margin-block-start: 1.125rem;
  }

  .store-item {
    padding: 1.375rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background-color: rgb(var(--v-theme-secondary));
    border-radius: 1rem;
    margin-block-end: 0.75rem;
  }

  .message {
    p:nth-child(1) {
      color: rgb(var(--v-dark-2));
    }

    p:nth-child(2) {
      color: rgb(var(--v-theme-surface-variant));
      font-weight: 700;
    }
  }

  .actions {
    margin-inline-start: auto;
  }

  .buttons-container {
    display: flex;
    flex-direction: column;
    gap: 0.75em;
  }
}
</style>

<style lang="scss"></style>
