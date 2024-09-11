<template>
  <h1>Dashboard Goes Here</h1>
</template>

<script setup>
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()

  watch(
    locale,
    () => {
      update([
        {
          title: t('dashboard'),
          disabled: true,
          active: true,
          to: '/',
        },
      ])
    },
    { immediate: true }
  )
</script>
