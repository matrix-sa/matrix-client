<template>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
  <p>Fine</p>
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
          disabled: false,
          active: true,
          to: '/',
        },
      ])
    },
    { immediate: true }
  )
</script>
