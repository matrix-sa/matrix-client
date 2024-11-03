<script setup>
  import { useI18n } from 'vue-i18n'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useAuthStore } from '@/stores/useAuthStore'
  import { storeToRefs } from 'pinia'
  import {
    integerValidator,
    minIntValidator,
    requiredValidator,
  } from '@/utilities/validators'
  import { useRequest } from 'vue-request'
  import moment from 'moment'
  import CampaignsService from '@/services/campaigns-service'
  import { usePlatformsStore } from '@/stores/usePlatformsStore'
  import campaignHeaderLogo from '@/assets/images/campaign-header.svg'
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
  })

  const { show } = useSnackbarStore()
  const { t } = useI18n()
  const { user } = storeToRefs(useAuthStore())
  const router = useRouter()

  const refVForm = ref('')
  const campaign = ref(props.campaign)
  const selectedPlatform = ref(null)

  const platformsStore = usePlatformsStore()

  const platforms = ref([])
  const { loading: loadingPlatforms } = useRequest(
    platformsStore.getActivePlatforms,
    {
      onSuccess: res => {
        platforms.value = res
      },
    }
  )

  const form = ref({
    id: null,
    name: null,
    start_time: '',
    end_time: '',
    daily_budget: null,
  })

  const dateTimes = ref({
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
  })

  const rules = reactive({
    name: [requiredValidator],
    start_time: [requiredValidator],
    end_time: [requiredValidator],
    daily_budget: [
      integerValidator,
      requiredValidator,
      () => minIntValidator(form.value.daily_budget, 50),
    ],
  })

  const generateDateTime = (date, time) => {
    const dateTime = new Date(date)
    if (time?.includes(':')) {
      const splitTime = time.split(':')
      const hours = splitTime[0]
      const minutes = splitTime[1]

      dateTime.setHours(hours, minutes)
    }

    return dateTime
  }

  const { run: runAdd, loading: loadingAdd } = useRequest(
    data => CampaignsService.create(data),
    {
      manual: true,
      onSuccess: res => {
        const { error, messages } = res.data

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
        const { error, messages } = res.data

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('updated_message'), 'success')
          router.push({ name: '/campaigns/' })
        }
      },
    }
  )

  const checkFormValid = () => {
    let isValid = false
    refVForm.value?.validate().then(({ valid }) => {
      isValid = valid
    })

    return isValid
  }

  const onSubmit = () => {
    refVForm.value?.validate().then(({ valid: isValid }) => {
      if (!isValid) return
      if (!campaign.value) {
        runAdd({
          platform: 'tiktok',
          name: form.value.name,
          start_time: new Date(form.value.start_time).toISOString(),
          end_time: new Date(form.value.end_time).toISOString(),
          daily_budget: form.value.daily_budget,
        })
      } else {
        runUpdate({
          platform: 'tiktok',
          id: form.value.id,
          name: form.value.name,
          start_time: new Date(form.value.start_time).toISOString(),
          end_time: new Date(form.value.end_time).toISOString(),
          daily_budget: form.value.daily_budget,
        })
      }
    })
  }

  const initializeFormValues = () => {
    if (!props.isEditMode) return

    campaign.value = props.campaign
    selectedPlatform.value = props?.campaign?.ad_platform

    form.value.id = campaign.value?.id
    form.value.name = campaign.value?.name
    form.value.start_time = campaign.value?.start_time
      ? new Date(campaign.value?.start_time)
      : null
    form.value.end_time = campaign.value?.end_time
      ? new Date(campaign.value?.end_time)
      : null
    form.value.daily_budget = campaign.value?.daily_budget

    const startMoment = moment(campaign.value?.start_time).locale('en')

    dateTimes.value.startDate = campaign.value?.start_time
      ? new Date(campaign.value?.start_time)
      : null
    dateTimes.value.startTime = campaign.value?.start_time
      ? startMoment.format('HH:mm')
      : null

    const endMoment = moment(campaign.value?.end_time).locale('en')

    dateTimes.value.endDate = campaign.value?.end_time
      ? new Date(campaign.value?.end_time)
      : null
    dateTimes.value.endTime = campaign.value?.end_time
      ? endMoment.format('HH:mm')
      : null
  }

  watch(
    props,
    () => {
      initializeFormValues()
    },
    {
      deep: true,
      immediate: true,
    }
  )

  watch(
    dateTimes,
    () => {
      form.value.start_time = generateDateTime(
        dateTimes.value.startDate,
        dateTimes.value.startTime
      )
      form.value.end_time = generateDateTime(
        dateTimes.value.endDate,
        dateTimes.value.endTime
      )
    },
    { deep: true }
  )

  const loading = computed(() => loadingAdd.value || loadingUpdate.value)

  const campaignTitle = computed(() => {
    return selectedPlatform.value
      ? '(' + t(`platforms.${selectedPlatform.value.toLowerCase()}.title`) + ')'
      : ''
  })

</script>
<template>

  <div class="campaign-form-container">
    <header class="campaign-form-header">
      <img alt="" :src="campaignHeaderLogo">
      <div class="deascription">
        <h3 class="text-black">{{ t("campaign_settings") }} {{ campaignTitle }}</h3>
        <p>{{ t("how_to_edit_campaign") }} </p>
      </div>
    </header>
    <v-divider class="mb-4 mt-6" />
    <VForm ref="refVForm" @submit.prevent="onSubmit">
      <VCol cols="12">
        <AppSelect
          v-model="selectedPlatform"
          hide-no-data
          :item-title="(item) => item.title"
          :item-value="(item) => item.code"
          :items="platforms"
          :label="t('platform')"
          :loading="loadingPlatforms"
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol cols="12">
        <AppTextInput v-model="form.name" :label="$t('campaign_name')" :rules="rules.name" />
      </VCol>
      <VCol cols="12">
        <AppTextInput
          v-model="form.daily_budget"
          :append-text="t(user.currency)"
          :label="$t('campaign_daily_budget')"
          :rules="rules.daily_budget"
        />
      </VCol>

      <VCol cols="12">
        <AppDateField
          v-model="dateTimes.startDate"
          :label="$t('campaign_start_date')"
          :min="new Date()"
          :placeholder="null"
        />
      </VCol>
      <VCol cols="12">
        <AppTimeField v-model="dateTimes.startTime" :label="$t('campaign_start_time')" :placeholder="null" />
      </VCol>
      <VCol cols="12">
        <AppDateField
          v-model="dateTimes.endDate"
          :label="$t('campaign_end_date')"
          :min="new Date()"
          :placeholder="null"
        />
      </VCol>
      <VCol cols="12">
        <AppTimeField v-model="dateTimes.endTime" :label="$t('campaign_end_time')" :placeholder="null" />
      </VCol>
      <!-- Google Ads Slot Form -->
      <slot
        v-if="selectedPlatform == 'googleads'"
        :data="{
          ...form,
          checkFormValid: checkFormValid,
          refVForm: $refs.refVForm,
          campaign,
        }"
      />
      <!-- Google Ads Slot Form -->

      <VCol v-if="selectedPlatform != 'googleads'" cols="12">
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
    </VForm>
  </div>

</template>
<style lang="scss"></style>
