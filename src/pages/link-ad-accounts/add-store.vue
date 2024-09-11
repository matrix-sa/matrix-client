<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'
  import { requiredValidator } from '@/utilities/validators'
  import { useStoresStore } from '@/stores/useStoresStore'
  import { storeToRefs } from 'pinia'

  const storesStore = useStoresStore()
  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()

  const { assignChosenStoreFromAddStoreForm } = storesStore
  const { stores } = storeToRefs(storesStore)
  const storeTypesItems = ref([])
  const refVForm = ref()
  const rules = ref({
    website_type: [requiredValidator],
  })
  const form = ref({
    website_type: null,
  })

  const handleChange = newValue => {
    assignChosenStoreFromAddStoreForm(newValue)
  }

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

  <VForm
    id="add-store-form"
    ref="refVForm"
    class="selects-container"
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
      @update:model-value="handleChange"
    />
  </VForm>
</template>
<style lang="scss" scoped>
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
