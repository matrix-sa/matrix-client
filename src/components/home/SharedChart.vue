<script setup>
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { isRtl } from '.'

const props = defineProps({
  rate: Array,
  title: String,
  subTitle: String,
  variant: String
})

const vuetifyTheme = useTheme()

const series = [{
  data: props.rate?.map(item => item.value),
}]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors

  return {
    chart: {
      type: 'area',
      parentHeightOffset: 0,
      toolbar: { show: false },
      zoom: {
        enabled: true,
      },
    },
    grid: {
      xaxis: { lines: { show: true } },
    },
    xaxis: {
      type: 'datetime',
      categories: props.rate?.map(item => item.date),
      labels: {
        format: 'd/M',
      },
    },
    yaxis: {
      opposite: isRtl.value,
      labels: {
        offsetX: -15,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: [currentTheme[props.variant]],
    stroke: { width: 2 },
    tooltip: {
      enabled: true,
      x: {
        format: 'd/M',
      },
    },
  }
})
</script>

<template>
  <VCard :subtitle="$t(props?.subTitle)" :title="$t(props?.title)">
    <VCardText>
      <VueApexCharts v-if="props.rate !== null" :options="chartOptions" :series="series" />
      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
