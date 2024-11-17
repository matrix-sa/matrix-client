<template>
  <div>
    <ReportsNavBar />
    <Statistics
      :campaigns="campaigns"
      :communication-rules-summary="communicationRulesSummary"
      :consultations-smmary="consultationsSmmary"
      :control-rules-summary="controlRulesSummary"
      :digital-designer-conversation-summary="digitalDesignerConversationSummary"
      :digital-writer-conversation-summary="digitalWriterConversationSummary"
    />
    <OrderedPlatformsByPerformance :platforms-data="platformsData" />
    <TopAndLeastCampaigns :least-campaigns="leastCampaigns" :top-campaigns="topCampaigns" />
    <ReportCharts :statistics="statistics" />
    <v-overlay v-model="loading" class="align-center justify-center" persistent>
      <v-progress-circular color="primary" indeterminate size="50" :width="7" />
    </v-overlay>
  </div>
</template>

<script setup>
  import ReportsService from '@/services/reports-service'
  import { ref } from 'vue'
  import { useRequest } from 'vue-request'
  import { useI18n } from 'vue-i18n'
  import { watch } from 'vue'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  const { update } = useBreadcrumbsStore()
  const { t, locale } = useI18n()

  const platformsData = ref([])
  const topCampaigns = ref([])
  const leastCampaigns = ref([])
  const statistics = ref([])
  const campaigns = ref({})
  const digitalWriterConversationSummary = ref({})
  const digitalDesignerConversationSummary = ref({})
  const controlRulesSummary = ref({})
  const communicationRulesSummary = ref({})
  const consultationsSmmary = ref({})

  const { loading } = useRequest(() => ReportsService.get(), {
    onSuccess: res => {
      campaigns.value = res.data.data.campaigns
      digitalWriterConversationSummary.value = res.data.data.digital_writer_conversations_summary
      digitalDesignerConversationSummary.value = res.data.data.digital_dsigner_conversations_summary
      controlRulesSummary.value = res.data.data.control_rules_summary
      communicationRulesSummary.value = res.data.data.communication_rules_smmary
      consultationsSmmary.value = res.data.data.consultations_smmary

      statistics.value = res.data.data
      platformsData.value = res.data.data.platforms_performance_records
      topCampaigns.value = res.data.data.top_performing_campaigns
      leastCampaigns.value = res.data.data.least_performing_campaigns
    },
  })

  watch(
    locale,
    () => {
      update([
        {
          title: t('reports'),
          active: true,
          to: '/reports',
        },
      ])
    },
    { immediate: true }
  )

</script>
