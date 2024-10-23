<script setup>
  import { useI18n } from 'vue-i18n'
  import { useSnackbarStore } from '@/stores/useSnackBarStore'
  import { useAuthStore } from '@/stores/useAuthStore'

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

  const form = ref({
    id: null,
    name: null,
    start_time: '',
    end_time: '',
    daily_budget: null,
  })

  const dateTimes = ref({
    startDate: '',
    startTime: '00:00',
    endDate: '',
    endTime: '00:00',
  })

  const rules = reactive({
    name: [requiredValidator],
    start_time: [requiredValidator],
    end_time: [requiredValidator],
    daily_budget: computed(() => {
      const baseRules = [integerValidator, requiredValidator]
      if (selectedPlatform.value === 'Snapchat') {
        baseRules.push(minIntValidator(form.value.daily_budget, 80))
      }

      if (selectedPlatform.value === 'Tiktok') {
        baseRules.push(minIntValidator(form.value.daily_budget, 50))
      }

      return baseRules
    }),
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
        const { error, data, messages, code } = res.data

        if (error) {
          show(messages[0], 'error')
        } else {
          show(t('created_message'), 'success')
          router.push({ name: 'campaigns' })
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
          platform: selectedPlatform.value,
          name: form.value.name,
          start_time: new Date(form.value.start_time).toISOString(),
          end_time: new Date(form.value.end_time).toISOString(),
          daily_budget: form.value.daily_budget,
        })
      } else {
        runUpdate({
          platform: selectedPlatform.value,
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
    campaign.value = props.campaign

    selectedPlatform.value = campaign.value?.ad_platform

    form.value.id = campaign.value?.id
    form.value.name = campaign.value?.name
    form.value.start_time = campaign.value?.start_time
      ? new Date(campaign.value?.start_time)
      : ''
    form.value.end_time = campaign.value?.end_time
      ? new Date(campaign.value?.end_time)
      : ''
    form.value.daily_budget = campaign.value?.daily_budget

    const startMoment = moment(campaign.value?.start_time).locale('en')

    dateTimes.value.startDate = campaign.value?.start_time
      ? startMoment.format('YYYY-MM-DD')
      : ''
    dateTimes.value.startTime = campaign.value?.start_time
      ? startMoment.format('HH:mm')
      : ''

    const endMoment = moment(campaign.value?.end_time).locale('en')

    dateTimes.value.endDate = campaign.value?.end_time
      ? endMoment.format('YYYY-MM-DD')
      : ''
    dateTimes.value.endTime = campaign.value?.end_time
      ? endMoment.format('HH:mm')
      : ''
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
        dateTimes.value.startTime,
      )
      form.value.end_time = generateDateTime(
        dateTimes.value.endDate,
        dateTimes.value.endTime,
      )
    },
    { deep: true },
  )

  const loading = computed(() => loadingAdd.value || loadingUpdate.value)
</script>
<template>
  <VForm
    ref="refVForm"
    @submit.prevent="onSubmit"
  >
    <VCol cols="12">
      <AppTextField
        v-model="form.name"
        autofocus
        :label="$t('campaign_name')"
        :rules="rules.name"
      />
    </VCol>
    <VCol cols="12">
      <AppTextField
        v-model="form.name"
        autofocus
        :label="$t('campaign_name')"
        :rules="rules.name"
      />
    </VCol>
    <VCol cols="12">
      <VDateInput
        v-model="dateTimes.startDate"
        :config="{ enableTime: false }"
        :label="$t('campaign_start_date')"
        :rules="rules.start_time"
      />
    </VCol>
    <VCol cols="12">
      <VDateInput
        v-model="dateTimes.startTime"
        :config="{ enableTime: true, noCalendar: true }"
        :label="$t('campaign_start_time')"
        :rules="rules.end_time"
      />
    </VCol>
  </VForm>
</template>
<style lang="scss"></style>
