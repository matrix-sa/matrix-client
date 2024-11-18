<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

</script>

<template>
  <h1>{{ t('not_found') }}</h1>
</template>
