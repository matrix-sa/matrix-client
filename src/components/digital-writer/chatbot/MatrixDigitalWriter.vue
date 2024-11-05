<script setup>
  import { useI18n } from 'vue-i18n'
  import matrixBot from '@/assets/digital-writer/Matrux_bot.svg'

  defineProps({
    message: {
      type: String,
      default: '',
    },
  })

  const { t } = useI18n()

</script>

<template>
  <div class="title-container d-flex flex-column">
    <div class="d-flex align-center title-wrapper">
      <img alt="chatbot" :src="matrixBot">
      <span>
        {{ t('matrix_digital_writer') }}</span>
    </div>
    <div class="content-wrapper" v-html="message.replace(/\n/g, '<br>')" />
  </div>
</template>

<style scoped lang="scss">
.title-container {
  background-color: #EFECF6 !important;
  border: 1px solid #CFCFCF !important;
  padding: 16px;
  border-radius: 12px;
  gap: 16px;

  .title-wrapper {
    gap: 8px;

    span {
      color: #000
    }
  }

  .content-wrapper {
    background-color: #F8F7FA;
    padding: 16px;
    border-radius: 8px;
    color: #1F1625
  }

}
</style>
