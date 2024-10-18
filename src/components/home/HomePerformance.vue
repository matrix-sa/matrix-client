<script setup>
  import i18n from '@/i18n'
  import VueApexCharts from 'vue3-apexcharts'
  import { useTheme } from 'vuetify'

  const props = defineProps({
    performance: Object,
  })

  const vuetifyTheme = useTheme()
  const currentTheme = vuetifyTheme.current.value.colors

  const months = computed(() => {
    return props.performance?.map(item => t(`month.${item.month}`))
  })

  const { t } = i18n.global

  const series = [{
                    name: t('sales'),
                    data: props.performance?.map(item => item.sales),
                  },
                  {
                    name: t('return_on_spending'),
                    data: props.performance?.map(item => item.spendings),
                  }]

  const chartOptions = {
    chart: {
      type: 'radar',
      toolbar: false,
    },
    colors: [currentTheme.warning, currentTheme.primary],
    fill: {
      opacity: 1,
    },
    legend: {
      fontSize: '12px',
      fontWeight: 500,
      fontFamily: 'Tajawal',
      labels: {
        colors: ['#706D79'],
      },
      markers: {
        size: 8,
        offsetX: 4,
        fillColors: [currentTheme.warning, currentTheme.primary],
      },
    },
    markers: {
      size: 0,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      categories: months.value,
      labels: {
        style: {
          fontFamily: 'Tajawal',
        },
      },
    },
  }
</script>

<template>
  <VCard :subtitle="$t('last-6-months')" :title="$t('performance')">
    <VCardText class="pa-md-0">
      <VueApexCharts v-if="props.performance !== null" :options="chartOptions" :series="series" />

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
