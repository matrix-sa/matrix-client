<script setup>
  import i18n from '@/i18n'
  import VueApexCharts from 'vue3-apexcharts'
  import { isRtl } from './index'

  const props = defineProps({
    performance: Object,
  })

  const { t } = i18n.global

  const series = ref([])

  const setSeries = selected => {
    series.value = []
    for (const item in props.performance) {
      series.value.push({
        name: t(`platforms.${item.toLowerCase()}.title`),
        data: props.performance[item].map(x => x[selected]),
      })
    }
  }

  const chartOptions = computed(() => {
    return {
      chart: {
        type: 'line',
        parentHeightOffset: 0,
        toolbar: { show: false },
        zoom: {
          enabled: true,
        },
      },
      grid: {
        xaxis: { lines: { show: true } },
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '12px',
        fontWeight: 500,
        fontFamily: 'Tajawal',
        labels: {
          colors: ['#706D79'],
        },
        markers: {
          size: 8,
          offsetX: 4,
          offsetY: 2,
        },
      },
      colors: [
        '#FFEE58',
        '#1FE1DB',
        '#1877F2',
        '#1778F2',
        '#DD2A7B',
        '#6C40B9',
        '#FF0808',
        '#000000',
      ],
      yaxis: {
        opposite: isRtl.value,
        labels: {
          offsetX: -40,
        },
      },
    }
  })
</script>

<template>
  <VCard
    :subtitle="$t('last-30-days')"
    :title="$t('platforms-performance')"
  >
    <template #append>
      <HomeGraphFilter
        v-if="props.performance !== null"
        @selected="setSeries($event)"
      />
    </template>

    <VCardText>
      <VueApexCharts
        v-if="props.performance !== null"
        class="home-platform-performance"
        :height="250"
        :options="chartOptions"
        :series="series"
      />

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.home-platform-performance {
  .apexcharts-tooltip-series-group {
    justify-content: flex-start;
  }

  .apexcharts-tooltip-text {
    padding-inline-start: 5px;
  }
}
</style>
