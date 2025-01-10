<script setup>
  import { paginationMeta } from '@/composable/utils'
  import { DateOnlyFormat } from '@/composable/useFormat'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

  import { useI18n } from 'vue-i18n'
  import Wallet from '@images/Wallet.png'
  import { usePagination } from 'vue-request'
  import PaymentService from '@/services/payment-service'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { storeToRefs } from 'pinia'
  import ChargeWalletModal from '@/components/dialogs/ChargeWalletModal.vue'
  const { t, locale } = useI18n()

  const options = ref({
    page: 1,
    itemsPerPage: 10,
    sortBy: [],
    groupBy: [],
    search: undefined,
  })
  const authStore = useAuthStore()
  const { update } = useBreadcrumbsStore()
  const { user } = storeToRefs(authStore)
  /* const switch1 = ref(false) */
  const totalCount = ref(0)
  const pageSize = ref()
  const openChargeWalletDialog = ref(false)

  const chargeWalletHandler = () => {
    openChargeWalletDialog.value = true
  }

  const operations = ref([
  /*   {
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

    }, */
  ])

  const headers = [
    {
      title: t('transaction'),
      key: 'transaction',
    },
    {
      title: t('date'),
      key: 'creation_time',
    },
    {
      title: t('amount_after_transaction'),
      key: 'new_balnace',
    },
    {
      title: t('amount'),
      key: 'amount',
    },
    {
      title: t('payment_method'),
      key: 'credit_card_type',
    },
    {
      title: t('card_name'),
      key: 'credit_card_name',
    },

  ]

  const getQuery = params => {
    const query = new URLSearchParams()

    query.append('PageSize', options.value.itemsPerPage)
    query.append('Page', options.value.page)

    return query
  }

  const { run, loading: loadingTransactions } = usePagination(
    params => PaymentService.getWalletTransactions(getQuery(params)),
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
        authStore.fetchUser(true)
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
          title: t('wallet'),
          active: true,
          to: '/financial_transaction/wallet',
        },
      ])
    },
    { immediate: true }
  )
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
              <p> {{ user?.walltet_balance }} {{ t('saudi_sar') }} </p>
            </div>
          </div>
        </div>
        <div class="d-flex align-center">
          <div class="d-flex align-center ga-6">

            <!--          <div class="d-flex align-center ga-2">
              <AppSwitchWithoutIcons v-model="switch1" :base-color="'#F54A41'" />

              <span class="use-amount">{{ t('use_amount_msg') }}</span>
            </div> -->

            <VBtn class="charge-amount-btn" @click="chargeWalletHandler"> {{ t('charge_amount') }}</VBtn>

            <v-dialog v-model="openChargeWalletDialog" max-width="500">
              <ChargeWalletModal v-model:is-dialog-visible="openChargeWalletDialog" @refetch-transactions="run" />
            </v-dialog>
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
        :loading="loadingTransactions"
        :no-data-text="$t('no_data_text')"
        @update:options="options = $event"
      >
        <!-- Created At -->
        <template #item.transaction="{ item }">

          <div class="d-flex ga-2 align-center">

            <div
              :class="{
                'icon-container d-flex align-center justify-center': true,
                'add-transaction': item.amount > 0,
                'sub-transaction': item.amount < 0,

              }"
            >

              <VIcon icon="tabler-plus" size="15" />
            </div>

            <div :class="item.amount > 0 ? 'text-success' : 'text-error'">
              {{ item.amount > 0 ? t('charge_wallet') : t('charge_wallet') }}
            </div>

          </div>
        </template>

        <template #item.creation_time="{ item }">
          {{ DateOnlyFormat(item.creation_time) }}
        </template>

        <template #item.new_balnace="{ item }">
          {{ item.new_balnace }}
          <span> {{ $t('sar') }}</span>
        </template>

        <template #item.amount="{ item }">
          {{ item.amount }}
          <span> {{ $t('sar') }}</span>
        </template>

        <template #item.credit_card_type="{ item }">
          {{ item.credit_card_type }}

        </template>

        <template #item.credit_card_name="{ item }">
          {{ item.credit_card_name }}

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
