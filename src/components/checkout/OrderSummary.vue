<script setup>

  import { useI18n } from 'vue-i18n'

  defineProps({
    orderSummaryData: {
      type: Object,
    },
  })
  const { t } = useI18n()
</script>

<template>
  <div>
    <div class="text-wrapper d-flex flex-column mt-6">
      <span>{{ t("order_summary") }}</span>
    </div>

    <hr class="separator mt-4">
    <OrderStats :order-summary-data="orderSummaryData" />

  </div>
</template>

<style lang="scss" scoped>
$borderColor: rgba(31, 22, 37, 0.1);

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

.separator {
  border-color: $borderColor;
}
</style>
