<script setup>
  import VueApexCharts from 'vue3-apexcharts'
  import { useTheme } from 'vuetify'
  import { isRtl } from '.'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps({
    frequency: Array,
  })

  const vuetifyTheme = useTheme()

  const series = [{
    name: t('action_value'),
    data: props.frequency?.map(item => item.value),
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
      dataLabels: {
        enabled: false,
      },
      colors: [currentTheme.warning],
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
