<script setup>
  import VueApexCharts from 'vue3-apexcharts'
  import { useTheme } from 'vuetify'
  import { isRtl } from '.'

  const props = defineProps({
    frequency: Array,
  })

  const vuetifyTheme = useTheme()

  const series = [{
    data: props.frequency?.map(item => item.value),
  }]

  const chartOptions = computed(() => {
    const currentTheme = vuetifyTheme.current.value.colors

    return {
      chart: {
        type: 'line',
        parentHeightOffset: 0,
        toolbar: { show: false },
        zoom: {
          enabled: false,
        },
      },
      grid: {
        xaxis: { lines: { show: true } },
      },
      xaxis: {
        type: 'datetime',
        categories: props.frequency?.map(item => item.date),
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
      colors: [currentTheme.warning],
      stroke: { width: 2 },
      tooltip: {
        enabled: false,
        shared: false,
        intersect: true,
        x: { show: false },
      },
    }
  })
</script>

<template>
  <VCard
    :subtitle="$t('last-90-days')"
    :title="$t('reach-rate')"
  >
    <VCardText>
      <VueApexCharts
        v-if="props.frequency !== null"
        :options="chartOptions"
        :series="series"
      />

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
