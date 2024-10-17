<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const props = defineProps({
  roas: Object,
})

const vuetifyTheme = useTheme()

const series = [{
  data: props.roas?.current_details?.map(item => item.value),
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  
  return {
    chart: {
      type: 'line',
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    grid: {
      strokeDashArray: 6,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      
    },
    colors: [currentTheme.warning],
    stroke: { width: 2 },
    tooltip: {
      enabled: false,
      shared: false,
      intersect: true,
      x: { show: false },
    },
    xaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: { labels: { show: false } },
    markers: {
      size: 3.5,
      colors: [currentTheme.primary],
      fillColor: currentTheme.info,
      strokeColors: 'transparent',
      strokeWidth: 3.2,
      discrete: [{
        seriesIndex: 0,
        dataPointIndex: 3.2,
        fillColor: currentTheme.primary,
        strokeColor: currentTheme.primary,
        size: 3.2,
        shape: 'circle',
      }],
      hover: { size: 5.5 },
    },
  }
})
</script>

<template>
  <VCard
    :title="$t('return_on_spending')"
    :subtitle="$t('last-week')"
  >
    <VCardText>
      <template v-if="props.roas !== null">
        <VueApexCharts
          :options="chartOptions"
          :series="series"
        />
  
        <HomeCardFooter
          class="mt-auto"
          :rate="props.roas?.rate"
        >
          <template #current> 
            {{ props.roas?.total_current }}
          </template>
        </HomeCardFooter>
      </template>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
