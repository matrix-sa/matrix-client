<script setup>
  import { useI18n } from 'vue-i18n'
  const { t, locale } = useI18n()
  const isEnglish = ref(false)

  watch(
    locale,
    newValue => {
      isEnglish.value = newValue === 'en'
    },
    { immediate: true }
  )
</script>

<template>
  <Auth />
</template>
<route lang="yaml">
  meta:
    layout: empty
  </route>
