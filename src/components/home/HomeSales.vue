<script setup>
  import i18n from '@/i18n'
  import VueApexCharts from 'vue3-apexcharts'
  import { useTheme } from 'vuetify'

  const props = defineProps({
    sales: Object,
  })

  const vuetifyTheme = useTheme()
  const currentTheme = vuetifyTheme.current.value.colors
  const { t } = i18n.global

  const series = [{
    name: t('sales'),
    data: props.sales?.current_details?.map(item => item.value),
  }]

  const chartOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
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
  }
</script>

<template>
  <VCard
    :subtitle="$t('last-week')"
    :title="$t('sales')"
  >
    <VCardText>
      <template v-if="props.sales !== null">
        <div class="mx-n6">
          <VueApexCharts
            :options="chartOptions"
            :series="series"
          />
        </div>

        <HomeCardFooter :rate="props.sales?.rate">
          <template #current>
            {{ props.sales?.total_current }}
          </template>
        </HomeCardFooter>
      </template>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
