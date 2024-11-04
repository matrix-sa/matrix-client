<template>
  <ReportsNavBar />
  <OrderedPlatformsByPerformance :platforms-data="platformsData" />
  <TopAndLeastCampaigns :least-campaigns="leastCampaigns" :top-campaigns="topCampaigns" />
  <ReportCharts :statistics="statistics" />
  <v-overlay v-model="loading" class="align-center justify-center" persistent>
    <v-progress-circular color="primary" indeterminate size="50" :width="7" />
  </v-overlay>
</template>

<script setup>
  import ReportsService from '@/services/reports-service'
  import { ref } from 'vue'
  import { useRequest } from 'vue-request'

  const platformsData = ref([])
  const topCampaigns = ref([])
  const leastCampaigns = ref([])
  const statistics = ref([])

  const { loading } = useRequest(() => ReportsService.get(), {
    onSuccess: res => {
      statistics.value = res.data.data
      platformsData.value = res.data.data.platforms_performance_records
      topCampaigns.value = res.data.data.top_performing_campaigns
      leastCampaigns.value = res.data.data.least_performing_campaigns
    },
  })

</script>
