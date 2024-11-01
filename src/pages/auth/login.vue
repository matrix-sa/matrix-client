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
  <LoginEn v-if="isEnglish" />
  <LoginAr v-else />
</template>
