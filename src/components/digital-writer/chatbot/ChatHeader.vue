<script setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

</script>

<template>
  <div class="title-container d-flex justify-space-between ">
    <div class="d-flex flex-column text-container">
      <h2>{{ t('a_conversation_about_advertising_texts') }}</h2>
      <p>{{ t('result_text') }}</p>
    </div>

    <div class="btn-container">
      <VBtn block class="rounded-pill btn h-100" color="primary">
        <span class="me-2">{{ t('finish_chat') }}</span>
        <VIcon icon="tabler-check" />

      </VBtn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title-container {
  .text-container {
    gap: 8px;

    h2 {
      font-size: 16px;
      color: #000
    }

    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 16.8px;
      color: #41324C
    }
  }

  .btn-container {
    .btn {
      font-size: 16px;
      font-weight: 700;
      line-height: 19.2px;
      padding: 8px 16px;
    }
  }
}
</style>
