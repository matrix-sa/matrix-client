<script  setup>
  import { watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  watch(
    locale,
    () => {
      update([
        {
          title: t('ads_library'),
          active: true,
          to: '/ads-library',
        },
      ])
    },
    { immediate: true }
  )
</script>

<template>
  <div>
    Ads library
  </div>
</template>
