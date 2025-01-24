<script setup>
  import { paginationMeta } from '@/composable/utils'
  import { DateOnlyFormat, NumberFormat } from '@/composable/useFormat'
  import { usePagination } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

  import { useI18n } from 'vue-i18n'
  import PaymentService from '@/services/payment-service'
  const { t, locale } = useI18n()
  const { show } = useSnackbarStore()

  const { update } = useBreadcrumbsStore()

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  })
  const pageSize = ref()
  // const switch1 = ref(false)
  const totalCount = ref(0)

  const operations = ref([
  /*   {
      id: 1,
      product_name: 'First',
      reference_number: '1234567890',
      status: 'Pending',
      order_date: '2024-12-02T16:25:21Z',
      amount: 100,
      download_invoice: 'invoice1.pdf',
    }, */
  ])

  const headers = [
    {
      title: t('product_name'),
      key: `service_name_${locale.value}`,
    },
    {
      title: t('reference_number'),
      key: 'merchant_reference',
    },
    {
      title: t('status'),
      key: 'is_successful',
    },
    {
      title: t('order_date'),
      key: 'creation_time',
    },
    {
      title: t('amount'),
      key: 'amount',
    },
    {
      title: t('download_invoice'),
      key: 'download_invoice',
    },

  ]

  const getQuery = params => {
    const query = new URLSearchParams()

    query.append('PageSize', options.value.itemsPerPage)
    query.append('Page', options.value.page)

    return query
  }

  const { run, loading: loadingTransactions } = usePagination(
    params => PaymentService.getFinancialTransactions(getQuery(params)),
    {
      manual: true,
      onSuccess: res => {
        const { data, error, messages } = res.data
        if (error) {
          show(messages[0], 'error')
          return
        }
        operations.value = data.items
        options.value.page = data.current_page
        pageSize.value = data.page_size
        totalCount.value = data.total_count
      },
      onError: err => {
        console.error(err)
      },
    }
  )
  run()

  watch(
    locale,
    () => {
      update([
        {
          title: t('financial_transaction'),
          active: true,
          to: '/financial-transaction/operations-table',
        },
        {
          title: t('operations_table'),
          active: true,
          to: '/financial_transaction/operations-table',
        },
      ])
    },
    { immediate: true }
  )
</script>
<template>
  <div class="main">

    <VDataTableServer
      v-model:items-per-page="options.itemsPerPage"
      v-model:page="options.page"
      class="text-no-wrap"
      :headers="headers"
      :items="operations"
      :items-length="totalCount"
      :loading="loadingTransactions"
      :no-data-text="$t('no_data_text')"
      @update:options="options = $event"
    >
      <!-- Created At -->

      <template #item.creation_time="{ item }">
        {{ DateOnlyFormat(item.creation_time) }}
      </template>

      <!--       <template #item.status="{ item }">
        <div>
          <AppSwitchWithoutIcons :base-color="'#F54A41'">
            <div>
              <p v-if="switch1" style="color: #22c55e"> {{ t('on') }}</p>
              <p v-else style="color: #ef4444"> {{ t('off') }}</p>
            </div>
          </AppSwitchWithoutIcons>

        </div>
      </template> -->

      <template #item.is_successful="{ item }">
        <div>
          <p v-if="item.is_successful" style="color: #22c55e"> {{ t('success') }}</p>
          <p v-else style="color: #ef4444"> {{ t('fail') }}</p>

        </div>
      </template>

      <template #item.amount="{ item }">
        {{ NumberFormat(item.amount) }}
        <span> {{ $t(item.currency) }}</span>
      </template>

      <template #item.download_invoice="{ item }">
        <VBtn class="download-btn">
          <v-icon icon="mdi-cloud-download" />

        </VBtn>
      </template>

      <!-- pagination -->
      <template #bottom>
        <VDivider />
        <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
          <p class="text-sm text-disabled mb-0">
            {{ paginationMeta(options, totalCount) }}
          </p>

          <VPagination
            v-model="options.page"
            :length="Math.ceil(totalCount / options.itemsPerPage)"
            total-visible="6"
          />
        </div>
      </template>
    </VDataTableServer>
  </div>
</template>

<style scoped>
.main {
  padding: 20px;
  background-color: white;
  border-radius: 1rem;
  margin-top: 24px;
}

.download-btn {
  background-color: rgb(var(--v-theme-primary)) !important;
  color: rgb(var(--v-theme-surface)) !important;
  min-width: 24px !important;
  width: 24px !important;
  min-height: 24px !important;
  height: 24px !important;
  border-radius: 100px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center
}
</style>
