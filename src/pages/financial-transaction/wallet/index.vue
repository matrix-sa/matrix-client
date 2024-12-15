<script setup>
  import { paginationMeta } from '@/composable/utils'
  import { DateOnlyFormat } from '@/composable/useFormat'

  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'
  import Wallet from '@images/Wallet.png'

  const { t, locale } = useI18n()

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  })

  const switch1 = ref(false)
  const totalCount = ref(0)

  const operations = ref([
    {
      id: 1,
      transaction: 1,
      order_date: '2024-12-02T16:25:21Z',
      amount: 100,
      amount_after_transaction: 100,
      payment_method: 'wallet',
      card_name: 'card_name',
    },
    {
      id: 2,
      transaction: 0,
      order_date: '2024-12-02T16:25:21Z',
      amount: 100,
      amount_after_transaction: 100,
      payment_method: 'wallet',
      card_name: 'card_name',

    },
  ])

  const headers = [
    {
      title: t('transaction'),
      key: 'transaction',
    },
    {
      title: t('date'),
      key: 'date',
    },
    {
      title: t('amount_after_transaction'),
      key: 'amount_after_transaction',
    },
    {
      title: t('amount'),
      key: 'amount',
    },
    {
      title: t('payment_method'),
      key: 'payment_method',
    },
    {
      title: t('card_name'),
      key: 'card_name',
    },

  ]

/*     watch(
    options,
    () => {
      fetchOrders({
        PageSize: options.value.itemsPerPage,
        Page: options.value.page,
      })
    },
    { deep: true },
) */

</script>
<template>
  <div>
    <div class="main pa-6">
      <div class="d-flex justify-space-between">
        <div class="d-flex ga-3 align-center">
          <img :src="Wallet">

          <div>
            <p class="title"> {{ t('a_wallet') }} <span class="text-warning">{{ t('matrix') }}</span> {{
              t('outstanding') }}</p>
            <div class="current-amount-container mt-3">
              <span> {{ t('current_credit') }}</span>
              <p>1200 {{ t('saudi_sar') }} </p>
            </div>
          </div>
        </div>
        <div class="d-flex align-center">
          <div class="d-flex align-center ga-6">

            <div class="d-flex align-center ga-2">
              <AppSwitchWithoutIcons v-model="switch1" :base-color="'#F54A41'" />

              <span class="use-amount">{{ t('use_amount_msg') }}</span>
            </div>

            <VBtn class="charge-amount-btn"> {{ t('charge_amount') }}</VBtn>
          </div>

        </div>
      </div>
    </div>
    <div class="main">

      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        class="text-no-wrap"
        :headers="headers"
        :items="operations"
        :items-length="totalCount"
        :loading="loading"
        :no-data-text="$t('no_data_text')"
        @update:options="options = $event"
      >
        <!-- Created At -->
        <template #item.transaction="{ item }">

          <div class="d-flex ga-2 align-center">

            <div
              :class="{
                'icon-container d-flex align-center justify-center': true,
                'add-transaction': item.transaction == 1,
                'sub-transaction': item.transaction == 0,

              }"
            >

              <VIcon icon="tabler-plus" size="15" />
            </div>

            <div :class="item.transaction == 1 ? 'text-success' : 'text-error'">
              {{ item.transaction == 1 ? t('charge_wallet') : t('charge_wallet') }}
            </div>

          </div>
        </template>

        <template #item.date="{ item }">
          {{ DateOnlyFormat(item.date) }}
        </template>

        <template #item.amount_after_transaction="{ item }">
          {{ item.amount_after_transaction }}
          <span> {{ $t('sar') }}</span>
        </template>

        <template #item.amount="{ item }">
          {{ item.amount }}
          <span> {{ $t('sar') }}</span>
        </template>

        <template #item.payment_method="{ item }">
          {{ t(item.payment_method) }}

        </template>

        <template #item.card_name="{ item }">
          {{ t(item.card_name) }}

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

  </div>
</template>

<style scoped>
.main {
  padding: 20px;
  background-color: white;
  border-radius: 1rem;
  margin-top: 24px;
}

.title {
  font-size: 16px !important;
  color: rgb(var(--v-dark-2));
}

.title span {
  font-weight: 700
}

.current-amount-container {
  background: #F4F4F4;
  padding: 12px 24px;
  border-radius: 12px;

}

.current-amount-container span {
  font-size: 12px;
}

.current-amount-container p {
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  color: rgb(var(--v-dark-2));
}

.use-amount {
  font-family: Tajawal;
  font-size: 14px;
  font-weight: 400;
  line-height: 16.8px;
  color: rgb(var(--v-theme-theme-on-background));
}

.charge-amount-btn {
  background: linear-gradient(258.68deg, #FC6C1D 4.79%, #FFA675 105.21%);
  color: #FFF;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 700
}

.icon-container {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #FFF;
}

.add-transaction {
  background-color: green
}

.sub-transaction {
  background-color: red
}
</style>
