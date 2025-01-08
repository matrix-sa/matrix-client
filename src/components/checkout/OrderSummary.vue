<script setup>

  import { useI18n } from 'vue-i18n'

  defineProps({
    orderSummaryData: {
      type: Object,
    },

  })

  const emit = defineEmits(['update-package'])

  const { t } = useI18n()
  const handleUpdatePackage = value => {
    emit('update-package', value)
  }

</script>

<template>
  <div>
    <div class="text-wrapper d-flex flex-column mt-6">
      <span>{{ t("order_summary") }}</span>
    </div>

    <hr class="separator mt-4">

    <OrderStats :order-summary-data="orderSummaryData" @update-package="handleUpdatePackage" />

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
