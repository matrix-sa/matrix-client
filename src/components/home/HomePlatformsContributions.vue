<script setup>
  import i18n from '@/i18n'
  import VueApexCharts from 'vue3-apexcharts'

  const props = defineProps({
    contributions: Object,
  })

  const series = ref([])
  const selectedName = ref('')

  const setSeries = selected => {
    selectedName.value = selected
    series.value = [{
      data: props.contributions?.map(item => item[selected]),
    }]
  }

  const { t } = i18n.global

  const colors = ref(
    [
      '#FFEE58',
      '#1FE1DB',
      '#1877F2',
      '#1778F2',
      '#DD2A7B',
      '#6C40B9',
      '#FF0808',
      '#000000',
    ],
  )

  const categories = computed(() => {
    const arr = []
    for (let i = 0; i < props.contributions?.length; i++) {
      const element = props.contributions[i]

      arr.push(i + 1 + t(`platforms.${element.platform.toLowerCase()}.title`))
    }

    return arr
  })

  const mappedData = computed(() => {
    let count = -1

    return props.contributions.map(element => {
      count++

      return {
        name: element.platform.toLowerCase(),
        data: element[selectedName.value],
        color: colors.value[count],
      }
    })
  })

  const chartOptions = computed(() => {
    return {
      chart: {
        type: 'bar',
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          barHeight: '16px',
          borderRadius: 7,
          borderRadiusApplication: 'end',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        textAnchor: 'start',
        formatter (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex].substring(1)
        },

        offsetX: 5,
        style: {
          fontSize: '10px',
          fontFamily: 'Tajawal',
          fontWeight: 400,
          colors: [
            '#000',
            '#000',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
            '#fff',
          ],
        },
      },
      grid: {
        strokeDashArray: 6,
        xaxis: { lines: { show: true } },
        yaxis: {
          lines: { show: false },
        },
        padding: {
          top: -35,
          bottom: 0,
          right: 5,
        },
      },
      yaxis: {
        reversed: true,
        labels: {
          formatter: val => { return val.toString().substring(0, 1) },
        },
      },
      xaxis: {
        axisBorder: { show: false },
        categories: categories.value,
      },

      colors: colors.value,
      legend: {
        show: false,
      },

      tooltip: { enabled: false },
    }
  })
</script>

<template>
  <VCard :subtitle="$t('last-month')" :title="$t('platforms-contributions')">
    <template #append>
      <HomeGraphFilter v-if="props.contributions !== null" @selected="setSeries($event)" />
    </template>

    <VCardText>
      <VRow v-if="props.contributions !== null">
        <VCol cols="12" md="8">
          <VueApexCharts height="280" :options="chartOptions" :series="series" />
        </VCol>
        <VCol cols="12" md="4">
          <VRow>
            <VCol v-for="platform in mappedData" :key="platform.color" class="text-sm pa-3 text-truncate" cols="6">
              <div class="d-flex flex-column">
                <div class="d-flex align-center">
                  <VIcon class="me-1" :color="platform.color" icon="tabler-circle-filled" size="6" />
                  {{ $t(`platforms.${platform.name}.title`) }}
                </div>
                {{ Math.round(platform.data) }}
              </div>
            </VCol>
          </VRow>
        </VCol>
      </VRow>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
