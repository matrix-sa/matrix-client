<script setup>
import i18n from "@/i18n"
import VueApexCharts from "vue3-apexcharts"
import { useTheme } from "vuetify"
import { isRtl } from './'

const props = defineProps({
  customersStatistics: Object,
})

const dates = computed(() => {
  const result = props.customersStatistics.map(item => {
    const dateObj = new Date(item.date)

    const day = dateObj.getDate()
    const month = dateObj.getMonth() + 1

    return isRtl.value ? `${month}/${day}` : `${day}/${month}`
  })

  if (!isRtl.value) result.reverse()

  return result
})

const { t } = i18n.global

const vuetifyTheme = useTheme()

const series = [
  {
    name: t("new-clients"),
    data: props.customersStatistics?.map(item => item.new_customers),
  },
  {
    name: t("old-clients"),
    data: props.customersStatistics?.map(item => item.old_customers),
  },
]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors

  return {
    chart: {
      parentHeightOffset: 0,
      stacked: true,
      type: "bar",
      toolbar: { show: false },
      stackType: "100%",
      zoom: {
        enabled: false,
      },
    },

    fill: {
      opacity: 1,
    },

    legend: {
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      fontWeight: 500,
      fontFamily: "Tajawal",
      labels: {
        colors: ["#706D79"],
      },
      markers: {
        shape: 'circle',
        size: 8,
        offsetX: 4,
        offsetY: 2,
      },
    },

    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: 16,
        borderRadius: 7,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
        colors: {
          backgroundBarColors: [
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
            currentTheme.warning,
          ],
          backgroundBarRadius: 7,
        },
      },
    },

    dataLabels: {
      enabled: false,
      style: {
        fontSize: '10px',
        fontFamily: 'Tajawal',
        fontWeight: 700,
      },
    },
    colors: [currentTheme.primary, currentTheme.warning],
    grid: {
      padding: {
        right: 35,
      },
    },
    xaxis: {
      type: "datetime",
      categories: dates?.value,
      labels: {
        format: 'd/M',
        style: {
          fontSize: '10px',
          fontWeight: 400,
          fontFamily: "Tajawal",
        },
      },
      offsetX: -8,
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      tickAmount: 4,
      offsetX: -8,
      opposite: isRtl.value,
    },
    states: {
      hover: { filter: { type: "none" } },
      active: { filter: { type: "none" } },
    },
  }
})
</script>

<template>
  <VCard :title="$t('clients')" :subtitle="$t('last-14-days')" class="home-clients">
    <VCardText>
      <VueApexCharts v-if="props.customersStatistics !== null" :options="chartOptions" :series="series" :height="300" />
      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>

<style lang="scss">
.home-clients {
  .apexcharts-bar-series.apexcharts-plot-series {
    .apexcharts-series:nth-of-type(2) {
      path {
        clip-path: inset(0% 0% -11% 0% round 10px);
      }
    }
  }

  // .apexcharts-xaxis-texts-g tspan {
  //   font-weight: 400;
  // }

  .apexcharts-legend-marker {
    clip-path: circle(50%);
  }
}
</style>
