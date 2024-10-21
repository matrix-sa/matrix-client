<script setup>
  import i18n from '@/i18n'
  import VueApexCharts from 'vue3-apexcharts'
  import { useTheme } from 'vuetify'

  const props = defineProps({
    orders: Object,
  })

  const { t } = i18n.global

  const vuetifyTheme = useTheme()
  const currentTheme = vuetifyTheme.current.value.colors

  const series = [
    {
      data: props.orders?.current_details?.map((item, i) => {
        return {
          x: t(`weekday.${item.day}`),
          y: item.value,
          fillColor: i % 2 === 0 ? currentTheme.primary : currentTheme.warning,
        }
      }),
    },
  ]

  const chartOptions = computed(() => {
    return {
      chart: {
        type: 'bar',
        toolbar: { show: false },
      },
      tooltip: { enabled: false },
      plotOptions: {
        bar: {
          barHeight: '100%',
          columnWidth: '25%',
          borderRadius: 4,
          borderRadiusApplication: 'around',

          colors: {
            backgroundBarColors: ['#EEE', '#EEE', '#EEE', '#EEE', '#EEE', '#EEE', '#EEE'],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 4,
          },
        },
      },
      fill: {
        opacity: 1,
      },
      grid: {
        show: false,
        padding: {
          top: -20,
          bottom: 0,
          right: -5,
          left: -5,
        },
      },

      dataLabels: { enabled: false },

      legend: { show: false },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            fontSize: '8px',
            fontFamily: 'Tajawal',
          },
        },
      },
      yaxis: { labels: { show: false } },
    }
  })
</script>

<template>
  <VCard class="home-orders" :subtitle="$t('last-week')" :title="$t('orders')">
    <VCardText>
      <template v-if="props.orders !== null">
        <VueApexCharts :options="chartOptions" :series="series" />

        <HomeCardFooter class="mt-auto" :rate="props.orders?.rate">
          <template #current>
            {{ props.orders?.total_current }}
          </template>
        </HomeCardFooter>
      </template>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.home-orders {
  .apexcharts-bar-series.apexcharts-plot-series {
    .apexcharts-series {
      path {
        clip-path: inset(0% 0% -11% 0% round 10px);
      }
    }
  }
}
</style>
