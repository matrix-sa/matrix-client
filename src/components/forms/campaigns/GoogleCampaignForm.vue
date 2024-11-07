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
    target_cpa: '',
    target_roas: '',
    city: '',
    location: '',
    selectedBiddingStrategy: '',
    language_code: '',
  })
  const locations = ref([])

  const router = useRouter()

  const userData = JSON.parse(localStorage.getItem('userData') || 'null')
  const userDefaultCurrency = userData?.currency ?? 'SAR'

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

  const onSubmit = () => {
    props.data.refVForm?.validate().then(({ valid }) => {
      if (!valid) return

      const { name, start_time, end_time, daily_budget } = props.data

      const {
        selectedBiddingStrategy,
        target_cpa,
        target_roas,
        location,
        language_code,
      } = form.value

      const payload = {
        platform: 'GoogleAds',
        name,
        start_time: new Date(start_time).toISOString(),
        end_time: new Date(end_time).toISOString(),
        daily_budget,
        bidding_strategy_type: selectedBiddingStrategy,
        ...(selectedBiddingStrategy == 'MaximizeConversions' && { target_cpa }),
        ...(selectedBiddingStrategy == 'MaximizeConversionValue' && {
          target_roas,
        }),
        locations: locations.value.map(({ id }) => id),
        language_code,
      }

      if (!campaign.value) {
        runAdd(payload)
      } else {
        runUpdate({
          id: form.value.id,
          ...payload,
        })
      }
    })
  }

  const { run: runAdd, loading: loadingAdd } = useRequest(
    data => CampaignsService.create(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data
        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('created_message'), 'success')
          router.push({ name: '/campaigns/' })
        }
      },
    }
  )

  const { run: runUpdate, loading: loadingUpdate } = useRequest(
    data => CampaignsService.update(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, data, messages, code } = res.data

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('updated_message'), 'success')
          router.push({ name: 'campaigns' })
        }
      },
    }
  )

  watch(props, () => {}, { deep: true })

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
  <VCol cols="12">
    <VRow>
      <VCol cols="12">
        <AppSelect
          v-if="!props.isEditMode"
          v-model="form.selectedBiddingStrategy"
          hide-no-data
          :item-title="(item) => item.title"
          :item-value="(item) => item.code"
          :items="biddingStrategies"
          :label="$t('bidding_strategy')"
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol
        v-if="form.selectedBiddingStrategy == 'MaximizeConversions'"
        cols="12"
      >
        <AppTextInput
          v-model="form.target_cpa"
          autofocus
          :label="$t('target_cpa')"
          :prefix="userDefaultCurrency"
          :rules="[requiredValidator]"
          type="number"
        />
      </VCol>

      <VCol
        v-if="form.selectedBiddingStrategy == 'MaximizeConversionValue'"
        cols="12"
      >
        <AppTextInput
          v-model="form.target_roas"
          autofocus
          :label="$t('target_roas')"
          :prefix="userDefaultCurrency"
          :rules="[requiredValidator]"
          type="number"
        />
      </VCol>

      <VCol cols="12">
        <LocationControl
          :locations="locations"
          platform="googleads"
          @update:locations="locations = $event"
        />
      </VCol>

      <VCol cols="12">
        <AppSelect
          v-model="form.language_code"
          hide-no-data
          :item-title="(item) => item.name"
          :item-value="(item) => item.code"
          :items="languages"
          :label="$t('language')"
          :rules="[requiredValidator]"
        />
      </VCol>

      <VCol cols="12">
        <VBtn
          color="primary"
          :disabled="loading"
          :loading="loading"
          :loading-text="$t('loading')"
          :text="$t('save')"
          type="submit"
          @click="onSubmit"
        />
      </VCol>
    </VRow>
  </VCol>
</template>
