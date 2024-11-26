<script setup>
  import trackIcon from '@/assets/trackingLink.svg'
  import AppTextInput from '@/components/core/AppTextInput.vue'
  import { requiredValidator } from '@/utilities/validators'
  import { computed, ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { usePlatformsStore } from '@/stores/usePlatformsStore'
  import { useRequest } from 'vue-request'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import TrackingService from '@/services/tracking-service'
  import { useBreadcrumbsStore } from '@/stores/useBreadcrumbsStore'
  import CampaignRuleService from '@/services/campaign-rule-service'
  import ConnectionRuleService from '@/services/connection-rule-service'

  const { update } = useBreadcrumbsStore()
  const { locale, t } = useI18n()
  const { show } = useSnackbarStore()

  const form = ref({
    platform: null,
    campaign_id: null,
    ad_group_id: null,
    ad_id: null,
    control_rule_id: null,
    communication_rules_ids: [],

  })
  const formRef = ref(null)

  const link = ref(null)

  const rules = reactive({
    platform: [requiredValidator],
    campaign_id: [requiredValidator],
    ad_group_id: [requiredValidator],
    ad_id: [requiredValidator],
    control_rule_id: [requiredValidator],
    communication_rules_ids: [requiredValidator],
  })

  const platformsStore = usePlatformsStore()
  const platforms = ref([])
  const controlRules = ref([])
  const communicationRules = ref([])

  const { loading: loadingPlatforms } = useRequest(
    platformsStore.getActivePlatforms,
    {
      onSuccess: res => {
        platforms.value = res
      },
    }
  )

  // create tracking link
  const { run: CreateTrackingLink, loading: loadingCreate } = useRequest(
    (platform, data) => TrackingService.createTrackingAd(platform, data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data
        if (error) {
          show(messages[0], 'error')
        } else {
          link.value = res.data.data.target_url
          show(t('created_message'), 'success')
        }
      },
    }
  )

  // control and communication rules
  const { loading: loadingControlRules } = useRequest(
    CampaignRuleService.getAll,
    {
      onSuccess: res => {
        const { error, messages, data } = res.data

        if (error) {
          show(messages[0], 'error')
        } else {
          controlRules.value = data
        }
      },
    }
  )

  const { loading: loadingCommunicationRules } = useRequest(
    ConnectionRuleService.getAll,
    {
      onSuccess: res => {
        const { error, messages, data } = res.data

        if (error) {
          show(messages[0], 'error')
        } else {
          communicationRules.value = data
        }
      },
    }
  )

  const handleChange = async () => {
    const { valid } = await formRef.value.validate()
    if (valid) {
      CreateTrackingLink(form.value.platform, form.value)
    }
  }

  const handleCopy = () => {
    const copyText = link.value
    navigator.clipboard.writeText(copyText).then(() => {
    }).catch(err => {
      console.error('Failed to copy text: ', err)
    })
  }

  const loading = computed(() => loadingCreate.value)

  watch(
    locale,
    () => {
      update([
        {
          title: t('tracking.name'),
          active: true,
          to: '/tracking',
        },
      ])
    },
    { immediate: true }
  )

</script>

<template>

  <v-card class="form_container">
    <div class="head_container">
      <img alt="track-link-icon" :src="trackIcon">
      <div>
        <p class="title">{{ t('tracking.create_tracking_link_title') }}</p>
        <p class="sub_title">{{ t('tracking.create_tracking_link_subtitle') }}</p>
      </div>
    </div>
    <hr>
    <v-form ref="formRef">
      <v-row>
        <v-col cols="12" md="3">
          <AppSelect
            v-model="form.platform"
            hide-details
            hide-no-data
            :item-title="(item) => item.title"
            :item-value="(item) => item.code"
            :items="platforms"
            :label="t('tracking.platform')"
            :loading="loadingPlatforms"
            :rules="rules.platform"
          />
        </v-col>

        <v-col cols="12" md="3">
          <AppTextInput
            v-model="form.campaign_id"
            hide-details
            :label="$t('tracking.campaignId')"
            :placeholder="t('tracking.enter_name')"
            :rules="rules.campaign_id"
            @update:model-value="handleChange"
          />
        </v-col>

        <v-col cols="12" md="3">
          <AppTextInput
            v-model="form.ad_group_id"
            hide-details
            :label="t('tracking.ad_group_id')"
            :placeholder="t('tracking.enter_name')"
            :rules="rules.ad_group_id"
            @update:model-value="handleChange"
          />
        </v-col>
        <v-col cols="12" md="3">
          <AppTextInput
            v-model="form.ad_id"
            hide-details
            :label="t('tracking.ad_id')"
            :placeholder="t('tracking.enter_name')"
            :rules="rules.ad_group_id"
            @update:model-value="handleChange"
          />
        </v-col>
        <!-- control and communications rules -->
        <VCol cols="12">
          <AppSelect
            v-model="form.communication_rules_ids"
            item-title="name"
            item-value="id"
            :items="communicationRules"
            :label="$t('connection_rule')"
            :loading="loadingCommunicationRules"
            multiple
            :rules="rules.communication_rules_ids"
            @update:model-value="handleChange"
          />
        </VCol>

        <VCol cols="12">
          <AppSelect
            v-model="form.control_rule_id"
            item-title="name"
            item-value="id"
            :items="controlRules"
            :label="$t('control_rule')"
            :loading="loadingControlRules"
            :rules="rules.control_rule_id"
            @update:model-value="handleChange"
          />
        </VCol>

        <!--  -->
      </v-row>

      <v-row>
        <v-col cols="12">
          <AppTextInput
            v-model="link"
            bordered
            :disabled="link===null"
            :label="t('tracking.the_link')"
            :loading="loading"
            :placeholder="t('tracking.link_appear')"
            :value="link"
          >
            <template #append-inner>
              <v-btn class="copy_button" prepend-icon="mdi-content-copy" @click="handleCopy">
                {{ t('tracking.copy') }}
              </v-btn>
            </template>
          </AppTextInput>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<style lang='scss' scoped>
.form_container{
background-color: #FFFFFF;
padding: 16px;
margin-bottom: 24px;
.head_container{
display: flex;
align-items: center;
gap: 16px;
margin-bottom: 16px;

}
.title{
color: #000000;
font-size: 20px;
font-weight: 700;
line-height: 24px;
margin-bottom: 8px;
}
.sub_title{
color:#1F1625 ;
font-size: 14px;
line-height: 16.8px;
font-weight: 400;
}
hr {
  border: 1px solid #1F16251A;
  margin-bottom: 24px;
}
:deep(.v-label){
color: #1F1625;
font-size: 14px;
line-height: 16.8px;
font-weight: 400;
margin: 0 5px 0 5px;
}
:deep(.bg-background){
background-color: #F8F7FA;
}
:deep(.v-text-field .v-field--no-label input){
color: #706D79;
}
:deep(.v-select__selection-text){
color: #706D79;
}
.copy_button{
color: #FFFFFF;
background-color:rgb(var(--v-theme-primary));
border-radius: .75rem;
}
:deep( .v-input__control .v-field--focused){
outline: none;
border-color: #1F1625;
}
:deep( .v-field.v-field) {
  background-color: red;
  color: red;
  margin-top: 8px;
}
}
</style>
