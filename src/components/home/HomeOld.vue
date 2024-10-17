<script setup>
import i18n from '@/i18n';
import AnalyticsEarningReportsWeeklyOverview from '@/views/dashboards/analytics/AnalyticsEarningReportsWeeklyOverview.vue';
import AnalyticsMonthlyCampaignState from '@/views/dashboards/analytics/AnalyticsMonthlyCampaignState.vue';
import { useTheme } from 'vuetify';

const { t } = i18n.global
const vuetifyTheme = useTheme()
const currentTheme = vuetifyTheme.current.value.colors

const lastPayments = [
  {
    date: '2023 / 3 /16',
    amount: '1.800 ر.س',
    payment_method: 'paypal',
  },
  {
    date: '2023 / 3 /16',
    amount: '1.800 ر.س',
    payment_method: 'paypal',
  },
  {
    date: '2023 / 3 /16',
    amount: '1.800 ر.س',
    payment_method: 'paypal',
  },
  {
    date: '2023 / 3 /16',
    amount: '1.800 ر.س',
    payment_method: 'paypal',
  },
  {
    date: '2023 / 3 /16',
    amount: '1.800 ر.س',
    payment_method: 'paypal',
  },
  {
    date: '2023 / 3 /16',
    amount: '1.800 ر.س',
    payment_method: 'paypal',
  },
  {
    date: '2023 / 3 /16',
    amount: '1.800 ر.س',
    payment_method: 'paypal',
  },

]

const statisticsHorizontal = [
  {
    title: t('ads_spending'),
    color: 'primary',
    icon: 'tabler-cpu',
    stats: '86%',
  },
  {
    title: t('revenue'),
    color: 'success',
    icon: 'tabler-server',
    stats: ' 2000 ر.س',
  },
  {
    title: t('return_on_spending'),
    color: 'error',
    icon: 'tabler-chart-pie-2',
    stats: '0.2%',
  },
  {
    title: t('sales_count'),
    color: 'warning',
    icon: 'tabler-alert-octagon',
    stats: '128',
  },
]

const statisticsVertical = {
  title: 'Revenue Generated',
  color: 'success',
  icon: 'tabler-credit-card',
  stats: '97.5k',
  height: 97,
  series: [{
    data: [
      300,
      350,
      330,
      380,
      340,
      400,
      380,
    ],
  }],
  chartOptions: {
    chart: {
      height: 110,
      type: 'area',
      parentHeightOffset: 0,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    tooltip: { enabled: false },
    markers: {
      colors: 'transparent',
      strokeColors: 'transparent',
    },
    grid: { show: false },
    colors: [currentTheme.success],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.8,
        opacityFrom: 0.6,
        opacityTo: 0.1,
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      width: 2,
      curve: 'smooth',
    },
    xaxis: {
      show: true,
      lines: { show: false },
      labels: { show: false },
      stroke: { width: 0 },
      axisBorder: { show: false },
    },
    yaxis: {
      stroke: { width: 0 },
      show: false,
    },
  },
}
</script>

<template>
  <VRow>

  <VCol cols="12">
      <VRow>
        <VCol
          v-for="statistics in statisticsHorizontal"
          :key="statistics.title"
          cols="12"
          sm="6"
          md="3"
        >
          <CardStatisticsHorizontal v-bind="statistics" />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12">
      <div class="table-title pa-8 d-flex justify-center align-center bg-primary">
        <span>المستحق الآن : 3,650 ريال</span>
      </div>
      <VTable
        height="400"
        class="text-no-wrap"
      >
        <thead class="table-header-bg-color">
          <tr>
            <th class="text-center">
              {{ t('date') }}
            </th>
            <th class="text-center">
              {{ t('amount') }}
            </th>
            <th class="text-center">
              {{ t('payment_method') }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in lastPayments"
            :key="item.dessert"
          >
            <td>
              {{ item.date }}
            </td>
            <td class="text-center">
              {{ item.amount }}
            </td>
            <td class="text-center">
              {{ item.payment_method }}
            </td>
          </tr>
        </tbody>
      </VTable>
    </VCol>
    <!-- 👉 Monthly Campaign State -->
    <VCol cols="6">
      <AnalyticsMonthlyCampaignState />
    </VCol>


    <!-- 👉 Earning Reports Weekly Overview -->
    <VCol
      cols="12"
      md="6"
    >
      <AnalyticsEarningReportsWeeklyOverview />
    </VCol>

  </VRow>

</template>



<style lang="scss">
@use "@core/scss/template/libs/apex-chart.scss";

.table-header-bg-color {
  background-color: rgb(var(--v-theme-surface));
}
</style>
