<script setup>
  import VueApexCharts from 'vue3-apexcharts'
  import { useTheme } from 'vuetify'
  import { isRtl } from '.'

  const props = defineProps({
    reach: Array,
  })

  const vuetifyTheme = useTheme()

  const series = [{
    data: props.reach?.map(item => item.value),
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
        categories: props.reach?.map(item => item.date),
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
      colors: [currentTheme.primary],
      stroke: { width: 2 },
      dataLabels: {
        enabled: false,
      },
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
  <VCard
    :subtitle="$t('last-90-days')"
    :title="$t('reach')"
  >
    <VCardText>
      <VueApexCharts
        v-if="props.reach !== null"
        :options="chartOptions"
        :series="series"
      />

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
