<script setup>
  import i18n from '@/i18n'

  const { t } = i18n.global

  const props = defineProps({
    digitalDesignerConversationSummary: {
      type: Object,
      required: true,
    },
    campaigns: {
      type: Object,
      required: true,
    },
    digitalWriterConversationSummary: {
      type: Object,
      required: true,
    },
    controlRulesSummary: {
      type: Object,
      required: true,
    },
    communicationRulesSummary: {
      type: Object,
      required: true,
    },
    consultationsSmmary: {
      type: Object,
      required: true,
    },
  })
</script>

<template>

  <v-container class="px-0">
    <v-row>

      <v-col cols="4">
        <StatisticsCard :title="t('camps_nums')" :value1="campaigns.this_month" :value2="campaigns.total" />
      </v-col>

      <v-col cols="4">
        <StatisticsCard
          :title="t('number_of_advertising_texts')"
          :value1="digitalWriterConversationSummary.this_month"
          :value2="digitalWriterConversationSummary.total"
        />
      </v-col>

      <v-col cols="4">
        <StatisticsCard
          :title="t('num_of_designs')"
          :value1="digitalDesignerConversationSummary.this_month"
          :value2="digitalDesignerConversationSummary.total"
        />
      </v-col>

      <v-col cols="4">
        <StatisticsCard
          :subtitle="t('which_has_been_implemented_to_improve_performance')"
          :title="t('num_of_control_rules')"
          :value1="controlRulesSummary.this_month"
          :value2="controlRulesSummary.total"
        />
      </v-col>

      <v-col cols="4">
        <StatisticsCard
          :subtitle="t('through_which_alerts_were_sent_to_monitor_performance')"
          :title="t('num_of_communication_rules')"
          :value1="communicationRulesSummary.this_month"
          :value2="communicationRulesSummary.total"
        />
      </v-col>

      <v-col cols="4">
        <StatisticsCard
          :title="t('consultations')"
          :value1="consultationsSmmary.this_month"
          :value2="consultationsSmmary.total"
        />
      </v-col>

    </v-row>
  </v-container>

</template>
