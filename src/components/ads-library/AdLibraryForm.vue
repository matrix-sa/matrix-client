<script setup>
  import { useI18n } from 'vue-i18n'
  import CampaignsService from '@/services/campaigns-service'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { requiredValidator } from '@/utilities/validators'
  import { watch } from 'vue'
  import { useRequest } from 'vue-request'
  import { useRouter } from 'vue-router'

  const props = defineProps({
    campaign: {
      type: Object,
      default: null,
    },
    isEditMode: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: null,
    },
  })

  const { t, locale } = useI18n()

  const campaign = ref(props.campaign)

  const languages = ref([
    {
      code: 'ar',
      name: t('arabic'),
    },
    {
      code: 'en',
      name: t('english'),
    },
  ])

  const form = ref({
    id: null,
    ad_url: '',
    product: '',
    season: '',
    marketing_method: '',
    type: '',
    notes: '',
    writer: '',
    editor_designer: '',
    target_cpa: '',
    target_roas: '',
    city: '',
    location: '',
    selectedBiddingStrategy: '',
    language_code: '',
  })
  const locations = ref([])

  const router = useRouter()

  const { show } = useSnackbarStore()

  const biddingStrategies = [
    {
      title: t('MaximizeConversions'),
      code: 'MaximizeConversions',
    },
    {
      title: t('MaximizeConversionValue'),
      code: 'MaximizeConversionValue',
    },
  ]

  watch(props, () => { }, { deep: true })

  const initializeFormValues = () => {
    campaign.value = props?.data?.campaign

    form.value.id = campaign.value?.id

    if (props?.data?.campaign) {
      const {
        bidding_strategy_type,
        target_cpa,
        target_roas,
        language,
        locations: receivedLocations,
      } = props.data.campaign

      form.value.selectedBiddingStrategy = bidding_strategy_type
      form.value.language_code = language

      if (target_cpa) form.value.target_cpa = target_cpa
      if (target_roas) form.value.target_roas = target_roas

      locations.value = receivedLocations.map(locations => ({
        id: locations.id,
        name: locale.value === 'ar' ? locations.name_ar : locations.name_en,
      }))
    }
  }

  const loading = computed(() => loadingAdd.value || loadingUpdate.value)

  initializeFormValues()
</script>

<template>
  <VCol class="px-0 mt-2 pb-0" cols="12">
    <VRow>
      <VCol cols="12">
        <div class="position-relative">

          <AppTextInput
            v-model="form.ad_url"
            autofocus
            :label="$t('ad_url')"
            :placeholder="$t('add_url')"
            :rules="[requiredValidator]"
            type="text"
          />
          <VBtn class="paste-btn flex g-4" color="primary" size="small">
            <v-icon>mdi-content-paste</v-icon>
            {{ $t('paste') }}
          </VBtn>

        </div>
      </VCol>

      <VCol cols="6">
        <AppSelect
          v-if="!props.isEditMode"
          v-model="form.product"
          hide-no-data
          :item-title="(item) => item.title"
          :item-value="(item) => item.code"
          :items="biddingStrategies"
          :label="$t('product')"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol cols="6">
        <AppSelect
          v-if="!props.isEditMode"
          v-model="form.season"
          hide-no-data
          :item-title="(item) => item.title"
          :item-value="(item) => item.code"
          :items="biddingStrategies"
          :label="$t('season')"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol cols="6">
        <AppSelect
          v-if="!props.isEditMode"
          v-model="form.marketing_method"
          hide-no-data
          :item-title="(item) => item.title"
          :item-value="(item) => item.code"
          :items="biddingStrategies"
          :label="$t('marketing_method')"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol cols="6">
        <AppSelect
          v-if="!props.isEditMode"
          v-model="form.type"
          hide-no-data
          :item-title="(item) => item.title"
          :item-value="(item) => item.code"
          :items="biddingStrategies"
          :label="$t('type')"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol cols="12">
        <AppTextInput
          v-model="form.notes"
          autofocus
          :label="$t('op_notes')"
          :placeholder="$t('enter_notes')"
          type="text"
        />
      </VCol>

      <VCol cols="12">
        <TitleBadge :title="$t('team_work')" />

      </VCol>

      <VCol cols="6">
        <AppSelect
          v-model="form.writer"
          hide-no-data
          :item-title="(item) => item.name"
          :item-value="(item) => item.code"
          :items="languages"
          :label="$t('writer')"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol cols="6">
        <AppSelect
          v-model="form.editor_designer"
          hide-no-data
          :item-title="(item) => item.name"
          :item-value="(item) => item.code"
          :items="languages"
          :label="$t('editor_designer')"
          :rules="[requiredValidator]"
        />
      </VCol>

    </VRow>
  </VCol>
</template>
<style scoped>
.paste-btn {
  position: absolute;
  top: 40%;
  left: 2%;
  border-radius: 8px !important;
  display: flex !important;
  gap: 20px !important;
  font-size: 14px;
  padding: 0 12px
}
</style>
