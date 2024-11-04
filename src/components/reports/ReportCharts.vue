<script setup>
  import SharedChart from '@/components/home/SharedChart.vue'

  const props = defineProps({
    statistics: {
      type: Object,
      default: {},
    },
  })

</script>

<template>
  <VRow class="mb-4">
    <template v-if="statistics.length != 0">

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.spendings"
          sub-title="for_the_last_30_days"
          title="ads_spending"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart :rate="statistics.reaches" sub-title="for_the_last_30_days" title="reach" variant="primary" />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart :rate="statistics.views" sub-title="for_the_last_30_days" title="views" variant="warning" />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.frequencies"
          sub-title="for_the_last_30_days"
          title="frequency"
          variant="primary"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.reach_costs"
          sub-title="for_the_last_30_days"
          title="average_access_cost"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.click_costs"
          sub-title="for_the_last_30_days"
          title="click-cost"
          variant="primary"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart :rate="statistics.ctr" sub-title="for_the_last_30_days" title="click-rate" variant="primary" />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.targeting_quality"
          sub-title="for_the_last_30_days"
          title="targeting_quality"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.customer_costs"
          sub-title="for_the_last_30_days"
          title="average_cost_per_customer"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.general_ads_performance"
          sub-title="for_the_last_30_days"
          title="overall_performance"
          variant="primary"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.snapchat_performance"
          sub-title="for_the_last_30_days"
          title="snap_platform_performance"
          variant="primary"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.tik_tok_performance"
          sub-title="for_the_last_30_days"
          title="tiktok_platform_performance"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.google_ads_performance"
          sub-title="for_the_last_30_days"
          title="google_platform_performance"
          variant="primary"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.youtube_performance"
          sub-title="for_the_last_30_days"
          title="youtube_platform_performance"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.instagram_performance"
          sub-title="for_the_last_30_days"
          title="instagram_platform_performance"
          variant="primary"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.facebook_performance"
          sub-title="for_the_last_30_days"
          title="facebook_platform_performance"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.twitter_performance"
          sub-title="for_the_last_30_days"
          title="twitter_platform_performance"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart :rate="statistics.sales" sub-title="for_the_last_30_days" title="total_sales" variant="primary" />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.orders_count"
          sub-title="for_the_last_30_days"
          title="orders_count"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.average_order_value"
          sub-title="for_the_last_30_days"
          title="average_basket_value"
          variant="primary"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.order_frequency_rate"
          sub-title="for_the_last_30_days"
          title="request_frequency"
          variant="warning"
        />
      </VCol>

      <VCol cols="12" md="6">
        <SharedChart
          :rate="statistics.new_customers_rates"
          sub-title="for_the_last_30_days"
          title="percentage_of_new_customers"
          variant="primary"
        />
      </VCol>

    </template>
  </VRow>
</template>

<style>
.vue-apexcharts .apexcharts-canvas {
  direction: rtl !important;
}
</style>
