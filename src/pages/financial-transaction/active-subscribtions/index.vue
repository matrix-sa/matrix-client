<script setup>
  import { localeTitle, paginationMeta } from '@/composable/utils'
  import { DateFormat } from '@/composable/useFormat'
  import TablesIcon from '@/assets/table.svg'

  import { useI18n } from 'vue-i18n'
  import { useRequest } from 'vue-request'

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
      id: t('digital_writer'),
      slogan: t('digital_writer'),
      product_name: 'First',
      reference_number: '1234567890',
      status: 'Pending',
      order_date: '2024-12-02T16:25:21Z',
      renewale_date: '2024-12-02T16:25:21Z',
      amount: 100,
    },
  ])

  const headers = [
    {
      title: t('product_name'),
      key: 'product_name',
    },
    {
      title: t('reference_number'),
      key: 'reference_number',
    },
    {
      title: t('status'),
      key: 'status',
    },
    {
      title: t('order_date'),
      key: 'order_date',
    },
    {
      title: t('renewale_date'),
      key: 'renewale_date',
    },
    {
      title: t('amount'),
      key: 'amount',
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
      <template #item.product_name="{ item }">

        <div class="product-name-container d-flex ga-3 align-center">
          <div class="img-container d-flex align-center justify-center"><img alt="title" :src="TablesIcon"></div>
          <div>
            <p class="product-name">{{ item.id }}</p>
            <p class="product-name-slogan">{{ item.id }}</p>

          </div>
        </div>

      </template>

      <template #item.order_date="{ item }">
        {{ DateFormat(item.order_date) }}
      </template>
      <template #item.renewale_date="{ item }">
        {{ DateFormat(item.renewale_date) }}
      </template>

      <template #item.status="{ item }">
        <div>
          <AppSwitchWithoutIcons v-model="switch1" :base-color="'#F54A41'">
            <div>
              <p v-if="switch1" style="color: #22c55e"> {{ t('on') }}</p>
              <p v-else style="color: #ef4444"> {{ t('off') }}</p>
            </div>
          </AppSwitchWithoutIcons>

        </div>
      </template>

      <template #item.amount="{ item }">
        {{ item.amount }}
        <span> {{ $t('sar') }}</span>
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

.product-name {
  font-size: 18px;
  font-weight: 400;
  line-height: 16.8px;
  text-align: right;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  color: #1F1625
}

.product-name-slogan {
  font-size: 12px;
  margin-top: 4px;

}

.product-name-container {
  margin: 12px 0
}

.product-name-container .img-container {
  width: 48px;
  height: 48px;
  background: red;
  display: flex;
  background: #F4F4F4;
  border-radius: 16px;
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
