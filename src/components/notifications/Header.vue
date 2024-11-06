<script setup>
  import Notify from '@/assets/images/notifications/notify.svg'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()
</script>
<template>
  <div class="d-flex gap-4 title-container align-center">
    <img class="chatbot-img" :src="Notify">

    <div class="text-wrapper d-flex flex-column">
      <span>{{ t("my_notifications") }}</span>
      <p>{{ t("my_notifications_desc") }} <a class="not-settings text-primary" href="#">{{ t('not_settings') }}</a></p>
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

      .not-settings {
        color: red;
        text-decoration: none
      }
    }
  }

}
</style>
