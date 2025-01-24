<script setup>
import snapchat from '@/assets/images/logos/reports/snap.svg'
/* import tiktok from '@/assets/images/logos/reports/tiktok.svg'
import facebook from '@/assets/images/logos/reports/meta.svg'
import instagram from '@/assets/images/logos/reports/instagram.svg'
import googleads from '@/assets/images/logos/reports/google.svg'
import youtube from '@/assets/images/logos/reports/youtube.svg'
import twitter from '@/assets/images/logos/reports/x.svg' */
import { paginationMeta } from '@/composable/utils'
import { DateOnlyFormat, NumberFormat } from '@/composable/useFormat'
/* import TablesIcon from '@/assets/table.svg' */
import { useI18n } from 'vue-i18n'
import { useRequest } from 'vue-request'
import PaymentService from '@/services/payment-service'
import { useSnackbarStore } from '@/stores/useSnackBarStore'
import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'

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

const switch1 = ref(false)
const totalCount = ref(0)

const operations = ref([
  /* {
    id: t('digital_writer'),
    platform: t('digital_writer'),
    status: 'Pending',
    total_count: 10,
    consumed_balance: 10,
    rest_amount: 10,
    order_date: '2024-12-02T16:25:21Z',
    renewale_date: '2024-12-02T16:25:21Z',
  }, */
])

const headers = [
  {
    title: t('ad_platform'),
    key: 'platform',
  },

  /*   {
    title: t('status'),
    key: 'status',
  }, */
  {
    title: t('total_count'),
    key: 'total_units',
  },

  {
    title: t('consumed_balance'),
    key: 'consumed_balance',
  },

  {
    title: t('rest_amount'),
    key: 'remaining_units',
  },

  {
    title: t('order_date'),
    key: 'start_date',
  },
  /*   {
      title: t('renewale_date'),
      key: 'renewale_date',
    }, */

]

const { run, loading: loadingLimits } = useRequest(
  params => PaymentService.getLimitServicesQuotas(),
  {
    manual: true,
    onSuccess: res => {
      const { data, error, messages } = res.data
      if (error) {
        show(messages[0], 'error')
        return
      }
      operations.value = data
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
        title: t('services_balance'),
        active: true,
        to: '/financial_transaction/services-stock',
      },
    ])
  },
  { immediate: true }
)
</script>
<template>
  <div class="main">

    <VDataTableServer class="text-no-wrap" :headers="headers" :items="operations" :items-length="totalCount"
      :loading="loadingLimits" :no-data-text="$t('no_data_text')">
      <template #item.platform="{ item }">

        <div class="d-flex ga-3 align-center">
          <!-- <img :src="snapchat"> -->
          {{ item[`service_name_${locale}`] || '' }}

        </div>

      </template>

      <!--       <template #item.status="{ item }">
        <div>
          <AppSwitchWithoutIcons v-model="switch1" :base-color="'#F54A41'">
            <div>
              <p v-if="switch1" style="color: #22c55e"> {{ t('on') }}</p>
              <p v-else style="color: #ef4444"> {{ t('off') }}</p>
            </div>
          </AppSwitchWithoutIcons>

        </div>
      </template> -->

      <template #item.total_units="{ item }">
        {{ NumberFormat(item.total_units) }}

        {{ t('SMS') }}
      </template>

      <template #item.consumed_balance="{ item }">


        {{ NumberFormat(item?.total_units - item?.remaining_units) }}

        {{ t('SMS') }}
      </template>

      <template #item.remaining_units="{ item }">

        {{ NumberFormat(item.remaining_units) }}

        {{ t('SMS') }}
      </template>

      <template #item.start_date="{ item }">
        {{ DateOnlyFormat(item.start_date) }}
      </template>

      <!--       <template #item.renewale_date="{ item }">
        <div class="d-flex align-center ga-4">
          <span>{{ DateFormat(item.renewale_date) }}</span>

          <VBtn class="subscribe-btn" color="primary">{{ t('subscribe') }}</VBtn>
        </div>
      </template> -->

      <!-- pagination -->
      <template #bottom>
        <VDivider />
        <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
          <p class="text-sm text-disabled mb-0">
            {{ paginationMeta(options, totalCount) }}
          </p>

          <VPagination v-model="options.page" :length="Math.ceil(totalCount / options.itemsPerPage)"
            total-visible="6" />
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

.subscribe-btn {
  border-radius: 100px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16.8px;

}
</style>
