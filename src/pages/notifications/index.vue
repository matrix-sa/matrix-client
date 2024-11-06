<script setup>
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import Header from '@/components/notifications/Header.vue'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  watch(
    locale,
    () => {
      update([
        {
          title: t('notifications'),
          active: false,
          to: '/notifications/',
        },
      ])
    },
    { immediate: true }
  )

</script>

<template>
  <div class="d-flex flex-column wrapper mb-8">

    <Header />
    <hr class="separator">
    <Notifications />
  </div>
</template>

<style lang="scss" scoped>
$borderColor: rgba(31, 22, 37, 0.1);

.wrapper {
  gap: 16px;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;

  .separator {
    border-color: $borderColor;
  }
}
</style>
