<script setup>
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import { useI18n } from 'vue-i18n'

  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()

  watch(
    locale,
    () => {
      update([
        {
          title: t('payment_method'),
          active: false,
          to: '/account-settings/payment-methods/',
        },
      ])
    },
    { immediate: true }
  )
</script>

<template>
  <CardList />
</template>
