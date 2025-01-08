<script setup>
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import PaymentService from '@/services/payment-service'
  import { useRequest } from 'vue-request'

  const { t, locale } = useI18n()
  const { update } = useBreadcrumbsStore()

  const orderSummaryData = ref({})
  const loading = ref(true)
  const selectedPackage = ref(null)

  const handleUpdatePackage = value => {
    selectedPackage.value = value
  }
  const { run, loading: loadData } = useRequest(
    () => PaymentService.get(),
    {

      onSuccess: res => {
        const { data, error, messages } = res.data
        if (error) {
          show(messages[0], 'error')
          return
        }

        orderSummaryData.value = data
        loading.value = false
      },
      onError: err => {
        console.error(err)
      },
    }
  )

  run()
  // Watch locale for breadcrumbs update
  watch(
    locale,
    () => {
      update([
        {
          title: t('checkout'),
          active: false,
          to: '/checkout',
        },
      ])
    },
    { immediate: true }
  )

</script>

<template>
  <div class="d-flex flex-column writer-wrapper">
    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
    <CheckoutHeader />
    <hr class="separator">
    <v-container class="pt-2 px-0 mx-0 main-container">
      <v-row>
        <v-col cols="7">
          <OrderSummary :order-summary-data="orderSummaryData" @update-package="handleUpdatePackage" />
        </v-col>
        <v-col cols="5">
          <PaymentMethod :order-summary-data="orderSummaryData" :selected-package="selectedPackage" />
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<style lang="scss" scoped>
$borderColor: rgba(31, 22, 37, 0.1);

.writer-wrapper {
  gap: 16px;
  background-color: #fff;
  padding: 24px;
  border-radius: 16px;

  .separator {
    border-color: $borderColor;
  }
}

.main-container {
  min-width: 100%;
}
</style>
