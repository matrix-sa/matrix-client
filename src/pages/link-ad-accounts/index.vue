<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  import { requiredValidator } from '@/utilities/validators'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useAuthStore } from '@/stores/useAuthStore'
  import StoresService from '@/servcies/stores-service'
  import { useStoresStore } from '@/stores/useStoresStore'
  import { storeToRefs } from 'pinia'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()
  const { show } = useSnackbarStore()
  const authStore = useAuthStore()
  const storesStore = useStoresStore()

  const { stores } = storeToRefs(storesStore)
  const storeTypesItems = ref([])
  const refVForm = ref()
  const rules = ref({
    website_url: [requiredValidator],
    website_type: [requiredValidator],
  })
  const form = ref({
    website_url: '',
    website_type: null,
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

  const { loading: loadingCheckStatuses } = useRequest(storesStore.checkAuthAll)

  const onSubmit = async () => {
    const { valid } = await refVForm.value?.validate()
    if (!valid) return

    startAuthentication(form.value.website_type, {
      website_url: form.value.website_url,
    })
  }

  const isStoreConnected = computed(
    () =>
      stores.value.find(store => store.code === form.value.website_type)
        ?.status === 'Success'
  )

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
          to: '/link-ad-accounts/',
        },
      ])
    },
    { immediate: true }
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
        :disabled="isStoreConnected"
        flat
        form="add-store-form"
        height="40px"
        :loading="loadingAuthentication"
        rounded
        type="submit"
      >
        {{ t("connect_store_btn") }}
      </v-btn>
    </div>
    <v-divider class="divider" />
    <VForm
      id="add-store-form"
      ref="refVForm"
      class="selects-container"
      @submit.prevent="onSubmit"
    >
      <v-select
        v-model="form.website_type"
        density="comfortable"
        flat
        height="3em"
        hide-details="auto"
        :items="storeTypesItems"
        :label="t('store_type')"
        prepend-inner-icon="mdi:shopping-outline"
        rounded="lg"
        :rules="rules.website_type"
        variant="solo-filled"
      />
      <v-text-field
        v-model="form.website_url"
        density="comfortable"
        dir="ltr"
        flat
        hide-details="auto"
        :label="t('store_link')"
        prepend-inner-icon="ph:link-bold"
        rounded="lg"
        :rules="rules.website_url"
        variant="solo-filled"
      />
      <v-btn
        block
        class="paste-btn"
        color="info"
        flat
        height="3em"
        prepend-icon="ic:baseline-content-paste"
        rounded
      >
        {{ t("paste") }}
      </v-btn>
    </VForm>
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

.selects-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr 0.5fr;
  align-items: start;
  gap: 12px;
  height: 3em;
}
</style>

<style lang="scss">
.main {
  .v-field__overlay {
    display: none;
  }
}
</style>
