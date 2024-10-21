<script setup>
  import i18n from '@/i18n'
  import { computed } from 'vue'
  import VueApexCharts from 'vue3-apexcharts'

  const props = defineProps({
    operatingSystems: Object,
  })

  const { t } = i18n.global

  const labels = computed(() => {
    const arr = []
    for (const property in props.operatingSystems) {
      arr.push(t(property))
    }

    return arr
  })

  const series = computed(() => {
    const arr = []
    for (const property in props.operatingSystems) {
      arr.push(props.operatingSystems[property])
    }

    return arr
  })

  const chartOptions = computed(() => {
    return {
      chart: {
        parentHeightOffset: 0,
        type: 'donut',
      },

      labels: labels?.value,
      colors: [
        '#787878',
        '#43DC8A',
        '#2199FD',
      ],
      stroke: { width: 0 },
      dataLabels: {
        enabled: false,
        formatter (val) {
          return `${parseInt(val)}%`
        },
      },
      legend: {
        position: 'bottom',
        fontSize: '12px',
        fontFamily: 'Tajawal',
        fontWeight: 500,
        markers: {
          size: 8,
          offsetX: 4,
        },
      },
      tooltip: { theme: false },
      states: { hover: { filter: { type: 'none' } } },
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: true,
              value: {
                fontSize: '24px',
                fontWeight: 'Tajawal',
                fontWeight: 700,
                offsetY: -15,
                formatter (val) {
                  return val
                },
              },

              name: {
                offsetY: 20,
              },
            },
          },
        },
      },
    }
  })
</script>

<template>
  <VCard
    :subtitle="$t('clients-os')"
    :title="$t('operating-systems')"
  >
    <VCardText>
      <VueApexCharts
        v-if="props.operatingSystems !== null"
        :options="chartOptions"
        :series="series"
      />
      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
