<script setup>
  import i18n from '@/i18n'
  import VueApexCharts from 'vue3-apexcharts'
  import { useTheme } from 'vuetify'

  const props = defineProps({
    roas: Object,
  })

  const { t } = i18n.global
  const vuetifyTheme = useTheme()
  const currentTheme = vuetifyTheme.current.value.colors

  const series = [{
    name: t('roas'),
    data: props.roas?.current_details?.map(item => item.value),
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
    colors: [currentTheme.primary],
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
    :title="$t('spending_reports_tab_title')"
  >
    <VCardText>
      <template v-if="props.roas !== null">
        <div class="mx-n6">
          <VueApexCharts
            :options="chartOptions"
            :series="series"
          />
        </div>

        <HomeCardFooter :rate="props.roas?.rate">
          <template #current>
            {{ props.roas?.total_current }}
          </template>
        </HomeCardFooter>
      </template>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
