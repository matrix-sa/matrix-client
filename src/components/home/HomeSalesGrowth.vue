<script setup>
  import i18n from '@/i18n'
  import VueApexCharts from 'vue3-apexcharts'

  const props = defineProps({
    sales: Object,
  })

  const { t } = i18n.global

  const series = [{
    data: props.sales?.details?.map(item => item.value),
  }]

  const chartOptions = computed(() => {
    return {
      chart: {
        parentHeightOffset: 0,
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          barHeight: '60%',
          columnWidth: '12px',
          borderRadius: 6,
          distributed: true,
        },
      },
      grid: {
        show: false,
        padding: {
          top: -30,
          bottom: 0,
          left: -10,
          right: -10,
        },
      },
      colors: ['#FFDCC9'],

      dataLabels: { enabled: false },
      tooltip: {
        enabled: true,
        custom ({ series, seriesIndex, dataPointIndex, w }) {
          return `
          <h4 class="text-h4 font-weight-bold bar_tooltip">
            ${series[seriesIndex][dataPointIndex]}%
          </h4>
        `
        },
        fixed: {
          enabled: true,
          position: 'bottomRight',
          offsetY: 80,
        },
      },
      legend: { show: false },
      xaxis: {
        categories: [
          t('weekday.0'),
          t('weekday.1'),
          t('weekday.2'),
          t('weekday.3'),
          t('weekday.4'),
          t('weekday.5'),
          t('weekday.6'),
        ],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Tajawal',
          },
        },
      },
      yaxis: { labels: { show: false } },
      responsive: [{
        breakpoint: 1025,
        options: { chart: { height: 199 } },
      }],
      states: { hover: { filter: { type: 'none' } } },

    }
  })
</script>

<template>
  <VCard :subtitle="$t('weekly')" :title="$t('sales-growth')">
    <VCardText>
      <template v-if="props.sales !== null">
        <VueApexCharts :height="200" :options="chartOptions" :series="series" />

        <HomeCardFooter chip-bg class="mt-auto" :current="false" :rate="props.sales?.total_growth" />
      </template>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>

<style scoped>
:deep(.vue-apexcharts .apexcharts-tooltip) {
  border: none;
  border-radius: 0;
  background: none;
  box-shadow: none;
  transition: none;
}
</style>
