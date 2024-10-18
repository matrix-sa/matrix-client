<script setup>
  import i18n from '@/i18n'
  import VueApexCharts from 'vue3-apexcharts'
  import { useTheme } from 'vuetify'
  import { isRtl } from './index'

  const props = defineProps({
    performance: Object,
  })

  const { t } = i18n.global

  const platforms = computed(() => {
    const arr = []
    for (const item in props.performance) {
      arr.push({
        id: item,
        name: t(`platforms.${item.toLowerCase()}.title`),
      })
    }

    return arr
  })

  const platform = ref('')

  const setSelectedPlatform = name => {
    platform.value = name
  }

  const getData = selected => {
    const currentMonth = new Date().getMonth() + 1

    const result = unref(props.performance[platform.value]?.map((item, index) => ({
      x: t(`month.${item.month}`),
      y: item[selected],
      fillColor:
        index + 1 === currentMonth
          ? currentTheme.warning
          : currentTheme.primary,
      color: index + 1 === currentMonth
        ? currentTheme.warning
        : currentTheme.primary,
    })))

    if (isRtl.value) { result.reverse() }

    return [
      {
        data: result,
      },
    ]
  }

  const vuetifyTheme = useTheme()
  const currentTheme = vuetifyTheme.current.value.colors

  const colors = computed(() => {
    const result = props.performance[platform.value]?.map(item =>
      item.month === new Date().getMonth() + 1
        ? currentTheme.warning
        : currentTheme.primary,
    )

    if (isRtl.value) { result.reverse() }

    return result
  })

  const currentTab = ref(0)
  const refVueApexChart = ref()

  const chartConfigs = computed(() => {
    const sharedOptions = {
      chartOptions: {
        chart: {
          type: 'bar',
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            columnWidth: 24,
            borderRadiusApplication: 'end',
            borderRadius: 4,
            dataLabels: { position: 'top' },
          },
        },
        grid: {
          show: false,
        },
        colors: [...colors.value],
        tooltip: {
          enabled: false,
        },
        dataLabels: {
          offsetY: -25,
          distributed: true,
          formatter (val) {
            return `${Math.round(val)}K`
          },
          style: {
            colors: [...colors.value],
          },
        },
        xaxis: {
          axisBorder: {
            show: true,
          },
          axisTicks: { show: false },
          labels: {
            style: {
              color: '#00000',
              fontSize: '13px',
              FontFamily: 'Tajawal',
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -30,
            formatter (val) {
              return `${parseInt(val / 1)}k`
            },
            style: {
              fontSize: '13px',
              fontFamily: 'Tajawal',
              color: '#00000',
            },
            min: 0,
            max: 60000,
            tickAmount: 6,
          },
          opposite: isRtl.value,
        },
      },
    }

    return [
      {
        title: t('orders_count'),
        icon: 'tabler-shopping-cart',
        ...sharedOptions,
        series: getData('orders_count'),
      },
      {
        title: t('sales'),
        icon: 'tabler-chart-bar',
        ...sharedOptions,
        series: getData('sales'),
      },
      {
        title: t('average_order_amount'),
        icon: 'tabler-shopping-cart-star',
        ...sharedOptions,
        series: getData('average_order_amount'),
      },
      {
        title: t('spending'),
        icon: 'tabler-chart-pie-2',
        ...sharedOptions,
        series: getData('spendings'),
      },
      {
        title: t('spendings_per_customer'),
        icon: 'tabler-user-dollar',
        ...sharedOptions,
        series: getData('spendings_per_customer'),
      },
      {
        title: t('average_cost_per1_k_customers'),
        icon: 'tabler-graph',
        ...sharedOptions,
        series: getData('average_cost_per1_k_customers'),
      },
      {
        title: t('targeting_quality'),
        icon: 'tabler-diamond',
        ...sharedOptions,
        series: getData('targeting_quality'),
      },
      {
        title: t('roas'),
        icon: 'tabler-ad-2',
        ...sharedOptions,
        series: getData('roas'),
      },
    ]
  })
</script>

<template>
  <VCard :subtitle="$t('last-year')" :title="$t('performance-indicator')">
    <template #append>
      <HomeGraphFilter v-if="props.performance !== null" :options="platforms" @selected="setSelectedPlatform($event)" />
    </template>

    <VCardText>
      <template v-if="props.performance !== null">
        <VSlideGroup v-model="currentTab" class="mb-6" mandatory show-arrows>
          <VSlideGroupItem
            v-for="(report, index) in chartConfigs"
            :key="report.title"
            v-slot="{ isSelected, toggle }"
            :value="index"
          >
            <VResponsive
              class="cursor-pointer flex-grow-0 rounded me-6"
              :class="isSelected ? 'border border-primary' : 'border border-dashed'
              "
              width="96px"
              @click="toggle"
            >
              <div class="text-center text-xs h-100 px-1 py-2" style="display: grid; place-items: center;">
                <VAvatar
                  class="mb-3"
                  :color="isSelected ? 'primary' : 'black'"
                  rounded
                  size="32"
                  variant="tonal"
                >
                  <VIcon :icon="report.icon" />
                </VAvatar>
                {{ report.title }}
              </div>
            </VResponsive>
          </VSlideGroupItem>
        </VSlideGroup>

        <VueApexCharts
          :key="currentTab"
          ref="refVueApexChart"
          height="240"
          :options="chartConfigs[Number(currentTab)].chartOptions"
          :series="chartConfigs[Number(currentTab)].series"
        />
      </template>

      <HomeEmptyState v-else />
    </VCardText>
  </VCard>
</template>
