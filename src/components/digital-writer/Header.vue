<script setup>
import ChatbotLogo from '@/assets/digital-writer/Chatbot.png'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
<template>
  <div class="d-flex gap-4 title-container">
    <img :src="ChatbotLogo" class="chatbot-img" />

    <div class="text-wrapper d-flex flex-column">
      <span>{{ t('let_the_digital_writer_make_your_work_easier') }}</span>
      <p>{{ t('writer_title_desc') }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-container {
  gap: 16px;

  .chatbot-img {
    min-width: 74px;
  }

  .text-wrapper {
    gap: 8px;

    span {
      font-size: 20px;
      font-weight: 700;
      color: rgb(var(--v-theme-on-code));
    }

    p {
      color: rgb(var(--v-dark-1));
    }
  }
}
</style>
